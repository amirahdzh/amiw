// Hand-written starting point for the two bindings this worker uses.
// Regenerate with `npm run types` (wrangler types) after your first
// `wrangler dev`/`wrangler deploy` once the R2 bucket and Durable Object
// migration exist — that produces a fuller, wrangler-verified version of
// this file. The rest of the Workers runtime's ambient types (Request,
// R2Bucket, DurableObjectState, etc.) come from @cloudflare/workers-types.
interface Env {
  TLDRAW_DURABLE_OBJECT: DurableObjectNamespace<
    import("./worker/TldrawDurableObject").TldrawDurableObject
  >;
  TLDRAW_BUCKET: R2Bucket;
  UPLOAD_RATE_LIMITER: RateLimit;
}
