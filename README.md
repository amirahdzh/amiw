# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Canvas (tldraw)

`/canvas` is a personal, local-only whiteboard (auto-saved to the browser's IndexedDB via
tldraw's `persistenceKey`). `/canvas/<roomId>` is a live multiplayer room — share the URL and
whoever opens it joins the same session. Both are React (tldraw) mounted inside Vue via
[`components/Canvas/TldrawBoard.client.vue`](components/Canvas/TldrawBoard.client.vue).

### Running locally

No setup needed — `npm run dev` and visit `/canvas` or `/canvas/<any-id>`. Multiplayer defaults to
tldraw's public demo sync server (`useSyncDemo`), which is fine for testing but **not** for real
use: demo rooms are public and data is dropped after 24h.

### Self-hosting the sync server

For real multiplayer (private rooms, data that doesn't expire), deploy [`sync-worker/`](sync-worker)
— a Cloudflare Worker adapted from tldraw's official
[`sync-cloudflare`](https://github.com/tldraw/tldraw/tree/main/templates/sync-cloudflare) template.
It's a separate deploy from the main Nuxt app (Durable Objects can't live inside a Cloudflare Pages
Worker), living in its own folder with its own `package.json`/`wrangler.toml`.

```bash
cd sync-worker
npm install

# One-time setup: create the R2 bucket used for uploaded images/videos
npx wrangler login
npx wrangler r2 bucket create amiw-tldraw-assets

# Local dev server for the worker itself (optional, for testing worker changes)
npm run dev

# Deploy to Cloudflare — prints a workers.dev URL
npm run deploy
```

Then point the Nuxt app at it by setting an env var (`.env` or your Cloudflare Pages project's
environment variables):

```
NUXT_PUBLIC_TLDRAW_SYNC_URL=https://amiw-tldraw-sync.<your-account>.workers.dev
```

Leaving it unset falls back to the demo server — no code changes needed either way.
