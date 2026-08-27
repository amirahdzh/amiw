<template>
  <div ref="host" :style="hostStyle" />
</template>

<script setup lang="ts">
// tldraw is a React library. Vue only owns the host <div> and its lifecycle;
// everything inside it is a hand-mounted React tree. Keep the two runtimes'
// imports separate so it's obvious which side owns what.
import { useTemplateRef, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { createElement, useCallback, useMemo } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Tldraw, type Editor, type TLStoreSnapshot } from "tldraw";
import { useSync, useSyncDemo } from "@tldraw/sync";
import { createWorkerAssetStore, getWorkerBookmarkPreview } from "./workerAssetStore";
import "tldraw/tldraw.css";

const props = withDefaults(
  defineProps<{
    /** "solo" = local-only board (persistenceKey/snapshot). "multiplayer" = live synced room. */
    mode: "solo" | "multiplayer";
    /** Required when mode is "multiplayer". Identifies the shared room. */
    roomId?: string;
    /** Local IndexedDB persistence key for solo mode (per-browser auto-restore). */
    persistenceKey?: string;
    /** Initial document to seed a solo board with, when nothing is persisted yet. */
    snapshot?: TLStoreSnapshot;
    /**
     * Base URL of a self-hosted sync worker (e.g. the sync-worker/ deploy),
     * e.g. https://amiw-tldraw-sync.<account>.workers.dev — no trailing
     * slash, no /api suffix. When omitted, multiplayer mode falls back to
     * tldraw's public demo sync server for testing.
     */
    syncUri?: string;
    /** Whether the host div covers the full viewport (position: fixed; inset: 0). */
    fullscreen?: boolean;
  }>(),
  { fullscreen: true },
);

const hostEl = useTemplateRef<HTMLDivElement>("host");
let root: Root | null = null;

const hostStyle = computed(() =>
  props.fullscreen
    ? { position: "fixed" as const, inset: 0 }
    : { position: "relative" as const, width: "100%", height: "100%" },
);

function SoloBoard() {
  return createElement(Tldraw, {
    persistenceKey: props.persistenceKey,
    snapshot: props.snapshot,
  });
}

// Captured once at mount time (see onMounted below) — these don't change for
// the lifetime of a mounted board, so it's safe for a hook further down to
// depend on them via a stable closure rather than needing to be reactive.
function MultiplayerBoard() {
  const roomId = props.roomId as string;
  const syncUri = props.syncUri;

  const assets = useMemo(
    () => (syncUri ? createWorkerAssetStore(syncUri, roomId) : undefined),
    [syncUri, roomId],
  );
  const onMount = useCallback(
    (editor: Editor) => {
      if (!syncUri) return;
      editor.registerExternalAssetHandler("url", ({ url }: { url: string }) =>
        getWorkerBookmarkPreview(syncUri, url),
      );
    },
    [syncUri],
  );

  // Self-hosted worker (see sync-worker/worker/worker.ts): routes are under
  // /api/connect/:roomId, /api/uploads/:id, /api/unfurl. tldraw's demo
  // server uses its own /connect/:roomId convention internally.
  const syncState = syncUri
    ? useSync({ uri: `${syncUri}/api/connect/${roomId}`, roomId, assets })
    : useSyncDemo({ roomId });

  // <Tldraw store={syncState}> accepts the whole {status,store,error} object
  // directly (it's exactly the TLStoreWithStatus shape) and renders its own
  // connecting/error UI — no need to branch on status ourselves here.
  return createElement(Tldraw, { store: syncState, onMount });
}

onMounted(async () => {
  // Nuxt loads .client.vue components as async components; onMounted here
  // fires one tick before the template ref is actually populated. Without
  // this, hostEl.value is null and the board silently never mounts.
  await nextTick();
  if (!hostEl.value) return;
  root = createRoot(hostEl.value);
  const App = props.mode === "multiplayer" ? MultiplayerBoard : SoloBoard;
  root.render(createElement(App));
});

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>
