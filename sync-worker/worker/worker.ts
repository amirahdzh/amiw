import { handleUnfurlRequest } from "cloudflare-workers-unfurl";
import { AutoRouter, cors, error, IRequest } from "itty-router";
import { handleAssetDownload, handleAssetUpload } from "./assetUploads";

// make sure our sync durable object is made available to cloudflare
export { TldrawDurableObject } from "./TldrawDurableObject";

// The Nuxt app and this worker are on different origins, so unlike
// tldraw's official sync-cloudflare template (which serves both from one
// origin), we need real CORS handling: a preflight responder for OPTIONS
// and a corsify pass on every response.
//
// Restricted to the actual site (adjust the domain below if amiw.dev isn't
// right) plus localhost for dev. NOTE: this only stops *browser* JS on other
// origins from calling these endpoints — it does nothing against a script or
// curl hitting the worker's URL directly. The upload size cap in
// assetUploads.ts, the per-IP rate limiter below, and the per-room upload
// cap in TldrawDurableObject.ts are what actually guard against that.
const ALLOWED_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*amiw\.dev$|^http:\/\/localhost:\d+$/;
const { preflight, corsify } = cors({ origin: ALLOWED_ORIGIN });

const router = AutoRouter<IRequest, [env: Env, ctx: ExecutionContext]>({
  before: [preflight],
  finally: [corsify],
  catch: (e) => {
    console.error(e);
    return error(e);
  },
})
  // requests to /connect are routed to the Durable Object, and handle realtime websocket syncing
  .get("/api/connect/:roomId", (request, env) => {
    const id = env.TLDRAW_DURABLE_OBJECT.idFromName(request.params.roomId);
    const room = env.TLDRAW_DURABLE_OBJECT.get(id);
    return room.fetch(request.url, { headers: request.headers, body: request.body });
  })

  // assets can be uploaded to the bucket under /uploads. Gated by a per-IP
  // rate limit and (when the client tells us which room it's for) a
  // per-room upload cap, both checked before the upload itself runs.
  .post("/api/uploads/:uploadId", async (request, env) => {
    const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await env.UPLOAD_RATE_LIMITER.limit({ key: clientIp });
    if (!success) {
      return error(429, "Too many uploads from this connection — try again in a minute.");
    }

    const roomId = request.query.roomId as string | undefined;
    if (roomId) {
      const id = env.TLDRAW_DURABLE_OBJECT.idFromName(roomId);
      const room = env.TLDRAW_DURABLE_OBJECT.get(id);
      const roomCheck = await room.fetch("https://do/api/upload-check", { method: "POST" });
      if (!roomCheck.ok) return roomCheck;
    }

    return handleAssetUpload(request, env);
  })

  // they can be retrieved from the bucket too:
  .get("/api/uploads/:uploadId", handleAssetDownload)

  // bookmarks need to extract metadata from pasted URLs:
  .get("/api/unfurl", handleUnfurlRequest)
  .all("*", () => {
    return new Response("Not found", { status: 404 });
  });

export default {
  fetch: router.fetch,
};
