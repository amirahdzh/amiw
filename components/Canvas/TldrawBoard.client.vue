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
import { Tldraw, type Editor } from "tldraw";
import { useSync, useSyncDemo } from "@tldraw/sync";
import { createWorkerAssetStore, getWorkerBookmarkPreview } from "./workerAssetStore";
import "tldraw/tldraw.css";

const props = withDefaults(
  defineProps<{
    /** Identifies the shared room everyone connecting sees the same document for. */
    roomId: string;
    /**
     * Base URL of a self-hosted sync worker (e.g. the sync-worker/ deploy),
     * e.g. https://amiw-tldraw-sync.<account>.workers.dev — no trailing
     * slash, no /api suffix. When omitted, falls back to tldraw's public
     * demo sync server for testing.
     */
    syncUri?: string;
    /** Whether the host div covers the full viewport (position: fixed; inset: 0). */
    fullscreen?: boolean;
  }>(),
  { fullscreen: true },
);

// Fires once the React root has actually rendered something (not once the
// sync connection is live — tldraw's own store={syncState} handling covers
// the "connecting" sub-state with its own UI). This exists because this
// component is a Nuxt .client.vue, loaded as its own async chunk bundling
// tldraw+React (~550KB) — the parent's <ClientOnly> fallback only covers
// the pre-hydration gap, not the time spent downloading *this* chunk, so
// without a signal like this a caller has no way to show a placeholder for
// that second gap and visitors can see a blank box while it loads.
const emit = defineEmits<{ ready: [] }>();

const hostEl = useTemplateRef<HTMLDivElement>("host");
let root: Root | null = null;

const hostStyle = computed(() =>
  props.fullscreen
    ? { position: "fixed" as const, inset: 0 }
    : { position: "relative" as const, width: "100%", height: "100%" },
);

// Captured once at mount time (see onMounted below) — these don't change for
// the lifetime of a mounted board, so it's safe for a hook further down to
// depend on them via a stable closure rather than needing to be reactive.
function Board() {
  const roomId = props.roomId;
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
  root.render(createElement(Board));
  emit("ready");
});

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>
