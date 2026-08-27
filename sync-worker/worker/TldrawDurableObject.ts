// Copied verbatim from tldraw's official sync-cloudflare template
// (templates/sync-cloudflare/worker/TldrawDurableObject.ts in
// github.com/tldraw/tldraw) — this is battle-tested infrastructure code,
// not something to hand-modify without a good reason.
import {
  DurableObjectSqliteSyncWrapper,
  type SessionStateSnapshot,
  SQLiteSyncStorage,
  TLSocketRoom,
} from "@tldraw/sync-core";
import {
  createTLSchema,
  // defaultBindingSchemas,
  defaultShapeSchemas,
  TLRecord,
} from "@tldraw/tlschema";
import { DurableObject } from "cloudflare:workers";
import { AutoRouter, error, IRequest } from "itty-router";

// add custom shapes and bindings here if needed:
const schema = createTLSchema({
  shapes: { ...defaultShapeSchemas },
  // bindings: { ...defaultBindingSchemas },
});

// Caps total asset uploads for this room, independent of the per-IP rate
// limiter in worker.ts — that stops one IP from *bursting* uploads, this
// puts a ceiling on total accumulation over the room's lifetime. There's
// only one room (the site's public canvas, see pages/art-leisure/index.vue), so
// this is really a site-wide cap, not a per-link one — sized accordingly
// (at the 5MB size cap in assetUploads.ts, 300 files is ~1.5GB max, well
// under the R2 free tier's 10GB).
const MAX_UPLOADS_PER_ROOM = 300;
const UPLOAD_COUNT_KEY = "uploadCount";

interface SocketAttachment {
  sessionId: string;
  snapshot: SessionStateSnapshot | null;
}

function getAttachment(ws: WebSocket): SocketAttachment | null {
  const attachment = ws.deserializeAttachment() as SocketAttachment | null;
  return attachment?.sessionId ? attachment : null;
}

// Each whiteboard room is hosted in a Durable Object with WebSocket Hibernation.
// https://developers.cloudflare.com/durable-objects/
//
// There's only ever one durable object instance per room. Room state is
// persisted automatically to SQLite via ctx.storage. When all clients are
// idle, the DO hibernates (freeing memory) while WebSocket connections
// stay alive at the Cloudflare layer.
export class TldrawDurableObject extends DurableObject {
  private room: TLSocketRoom<TLRecord, void> | null = null;
  /** Map sessionId → ws so onSessionSnapshot can serialize to the right socket. */
  private readonly sessionIdToWs = new Map<string, WebSocket>();

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Respond to ping messages at the platform level without waking the DO.
    // The TLSyncClient sends {"type":"ping"} every 5s; without this, each
    // ping would wake the DO from hibernation.
    this.ctx.setWebSocketAutoResponse(
      new WebSocketRequestResponsePair('{"type":"ping"}', '{"type":"pong"}'),
    );
  }

  private getOrCreateRoom(): TLSocketRoom<TLRecord, void> {
    if (!this.room) {
      const sql = new DurableObjectSqliteSyncWrapper(this.ctx.storage);
      const storage = new SQLiteSyncStorage<TLRecord>({ sql });

      this.room = new TLSocketRoom<TLRecord, void>({
        schema,
        storage,
        // Disable idle timeout since Cloudflare handles keep-alive via auto-response.
        // Without this, sessions would be pruned after 20s of no "real" messages
        // even though the client is still connected and being auto-ponged.
        clientTimeout: Infinity,
        onSessionSnapshot: (sessionId, snapshot) => {
          const ws = this.sessionIdToWs.get(sessionId);
          if (ws) ws.serializeAttachment({ sessionId, snapshot });
        },
      });

      // Resume any sessions that survived hibernation
      for (const ws of this.ctx.getWebSockets()) {
        const attachment = getAttachment(ws);
        if (!attachment?.snapshot) continue;
        this.room.handleSocketResume({
          sessionId: attachment.sessionId,
          socket: ws,
          snapshot: attachment.snapshot,
        });
      }
    }
    return this.room;
  }

  private readonly router = AutoRouter({ catch: (e) => error(e) })
    .get("/api/connect/:roomId", (request) => this.handleConnect(request))
    .post("/api/upload-check", () => this.handleUploadCheck());

  // Entry point for all requests to the Durable Object
  fetch(request: Request): Response | Promise<Response> {
    return this.router.fetch(request);
  }

  // Handle new WebSocket connection requests
  async handleConnect(request: IRequest) {
    const sessionId = request.query.sessionId as string;
    if (!sessionId) return error(400, "Missing sessionId");

    // Create the websocket pair for the client
    const { 0: clientWebSocket, 1: serverWebSocket } = new WebSocketPair();
    // Use hibernation API instead of serverWebSocket.accept()
    this.ctx.acceptWebSocket(serverWebSocket);

    // Store sessionId in attachment immediately so we can identify this socket
    // after hibernation, before the connect handshake completes.
    const attachment: SocketAttachment = { sessionId, snapshot: null };
    serverWebSocket.serializeAttachment(attachment);

    // Connect to the room. The first webSocketMessage from the client will
    // complete the handshake and trigger debounced snapshot storage.
    this.getOrCreateRoom().handleSocketConnect({ sessionId, socket: serverWebSocket });

    return new Response(null, { status: 101, webSocket: clientWebSocket });
  }

  // Called by worker.ts before it accepts an asset upload for this room.
  // Durable Objects process requests one at a time, so this get-then-put is
  // safe from races without needing an explicit transaction.
  async handleUploadCheck() {
    const count = ((await this.ctx.storage.get<number>(UPLOAD_COUNT_KEY)) ?? 0) + 1;
    if (count > MAX_UPLOADS_PER_ROOM) {
      return error(429, `This room has hit its upload limit (${MAX_UPLOADS_PER_ROOM} files).`);
    }
    await this.ctx.storage.put(UPLOAD_COUNT_KEY, count);
    return { ok: true, count };
  }

  // --- WebSocket Hibernation API handlers ---

  override async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    const attachment = getAttachment(ws);
    if (!attachment) return;

    this.sessionIdToWs.set(attachment.sessionId, ws);
    this.getOrCreateRoom().handleSocketMessage(attachment.sessionId, message);
  }

  override async webSocketClose(ws: WebSocket) {
    this.handleWebSocketEnd(ws, "handleSocketClose");
  }

  override async webSocketError(ws: WebSocket) {
    this.handleWebSocketEnd(ws, "handleSocketError");
  }

  private handleWebSocketEnd(ws: WebSocket, method: "handleSocketClose" | "handleSocketError") {
    const attachment = getAttachment(ws);
    if (!attachment) return;

    this.sessionIdToWs.delete(attachment.sessionId);

    const room = this.getOrCreateRoom();

    // If the DO was hibernating, this session was never re-added to the room
    // (ctx.getWebSockets() doesn't include the disconnecting socket). Resume it
    // briefly so the room can broadcast presence removal to other clients.
    if (attachment.snapshot && !room.getSessionSnapshot(attachment.sessionId)) {
      room.handleSocketResume({
        sessionId: attachment.sessionId,
        socket: ws,
        snapshot: attachment.snapshot,
      });
    }

    room[method](attachment.sessionId);
  }
}
