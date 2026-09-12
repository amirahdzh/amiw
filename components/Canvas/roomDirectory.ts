// Talks to the sync-worker's /api/rooms endpoints (see
// sync-worker/worker/rooms.ts). Mirrors workerAssetStore.ts's pattern of
// absolute fetches against the worker's own base URL, since the Nuxt app
// and the worker are cross-origin.
export interface RoomEntry {
  id: string;
  name: string;
  createdAt: number;
}

async function parseOrThrow(response: Response) {
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || response.statusText);
  }
  return response.json();
}

export function fetchRooms(workerBaseUrl: string): Promise<RoomEntry[]> {
  return fetch(`${workerBaseUrl}/api/rooms`).then(parseOrThrow);
}

export function createRoom(workerBaseUrl: string, name: string): Promise<RoomEntry> {
  return fetch(`${workerBaseUrl}/api/rooms`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  }).then(parseOrThrow);
}

export function renameRoom(
  workerBaseUrl: string,
  id: string,
  name: string,
): Promise<RoomEntry> {
  return fetch(`${workerBaseUrl}/api/rooms/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  }).then(parseOrThrow);
}

export function deleteRoom(workerBaseUrl: string, id: string): Promise<{ ok: true }> {
  return fetch(`${workerBaseUrl}/api/rooms/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).then(parseOrThrow);
}
