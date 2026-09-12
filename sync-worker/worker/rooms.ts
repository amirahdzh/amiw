// Directory of tldraw rooms shown in the Art & Leisure drawer. Durable
// Objects (see TldrawDurableObject.ts) have no built-in way to list the
// rooms that exist — they're addressed by name hash, not enumerable — so
// this KV-backed list is what makes "which rooms exist" a question anyone
// can ask. Room *content* still lives entirely in each room's own Durable
// Object; this only tracks { id, name, createdAt } metadata.
import { error, IRequest } from "itty-router";

export interface RoomEntry {
  id: string;
  name: string;
  createdAt: number;
}

const KEY_PREFIX = "room:";

// Public, unauthenticated site — without a cap, a script could spin up
// unbounded Durable Objects (each a small ongoing cost) by hitting POST
// /api/rooms in a loop. Same defensive shape as MAX_UPLOADS_PER_ROOM in
// TldrawDurableObject.ts.
const MAX_ROOMS = 50;
const MAX_NAME_LENGTH = 60;

// This id predates the room directory entirely — it was the one hardcoded
// ROOM_ID in pages/art-leisure/index.vue before rooms existed as a concept.
// Seeding it here keeps that original canvas reachable through the new UI
// instead of leaving it an orphaned, unlisted Durable Object.
const DEFAULT_ROOM: RoomEntry = {
  id: "amiw-public-canvas",
  name: "Public Canvas",
  createdAt: 0,
};

function roomKey(id: string) {
  return `${KEY_PREFIX}${id}`;
}

async function ensureSeeded(env: Env) {
  const existing = await env.ROOMS_KV.get(roomKey(DEFAULT_ROOM.id));
  if (existing) return;
  await env.ROOMS_KV.put(roomKey(DEFAULT_ROOM.id), JSON.stringify(DEFAULT_ROOM), {
    metadata: DEFAULT_ROOM,
  });
}

async function readName(request: IRequest): Promise<string | null> {
  const body = (await request.json().catch(() => null)) as { name?: unknown } | null;
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, MAX_NAME_LENGTH) : "";
  return name || null;
}

export async function listRooms(_request: IRequest, env: Env) {
  await ensureSeeded(env);
  // Metadata rides along with list() at no extra cost — no need to fetch
  // each room's value individually just to render the drawer.
  const { keys } = await env.ROOMS_KV.list<RoomEntry>({ prefix: KEY_PREFIX });
  return keys
    .map((key) => key.metadata)
    .filter((entry): entry is RoomEntry => !!entry)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function createRoom(request: IRequest, env: Env) {
  const name = await readName(request);
  if (!name) return error(400, "Room name is required");

  await ensureSeeded(env);
  const { keys } = await env.ROOMS_KV.list({ prefix: KEY_PREFIX });
  if (keys.length >= MAX_ROOMS) {
    return error(429, `This canvas has hit its room limit (${MAX_ROOMS} rooms).`);
  }

  const entry: RoomEntry = { id: crypto.randomUUID(), name, createdAt: Date.now() };
  await env.ROOMS_KV.put(roomKey(entry.id), JSON.stringify(entry), { metadata: entry });
  return entry;
}

export async function renameRoom(request: IRequest, env: Env) {
  const name = await readName(request);
  if (!name) return error(400, "Room name is required");

  const key = roomKey(request.params.id);
  const existing = await env.ROOMS_KV.get<RoomEntry>(key, "json");
  if (!existing) return error(404, "Room not found");

  const updated: RoomEntry = { ...existing, name };
  await env.ROOMS_KV.put(key, JSON.stringify(updated), { metadata: updated });
  return updated;
}

export async function deleteRoom(request: IRequest, env: Env) {
  const id = request.params.id;
  if (id === DEFAULT_ROOM.id) {
    return error(400, "The public canvas can't be deleted.");
  }

  const key = roomKey(id);
  const existing = await env.ROOMS_KV.get(key);
  if (!existing) return error(404, "Room not found");

  // Actually wipe the drawing, not just unlist it — see
  // TldrawDurableObject.ts's handlePurge.
  const doId = env.TLDRAW_DURABLE_OBJECT.idFromName(id);
  await env.TLDRAW_DURABLE_OBJECT.get(doId).fetch("https://do/api/purge", { method: "POST" });

  await env.ROOMS_KV.delete(key);
  return { ok: true };
}
