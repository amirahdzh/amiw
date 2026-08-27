import seed from "../../assets/canvas-seed.json";

// Bundled at build time (static import, not a filesystem read) so this works
// unchanged on Cloudflare Pages, which has no fs access at runtime.
// Replace server/assets/canvas-seed.json with a real exported tldraw
// snapshot (File > Save a copy in the app, or getSnapshot(editor.store))
// to seed the solo canvas for first-time visitors.
export default defineEventHandler(() => {
  return seed;
});
