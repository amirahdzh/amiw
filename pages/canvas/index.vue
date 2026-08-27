<template>
  <div class="w-full h-screen relative">
    <ClientOnly>
      <CanvasTldrawBoard
        mode="solo"
        persistence-key="amiw-canvas-solo"
        :snapshot="seed ?? undefined"
      />
      <template #fallback>
        <div class="w-full h-screen flex items-center justify-center text-muted-foreground">
          Loading canvas…
        </div>
      </template>
    </ClientOnly>

    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-r-4 border-b-4 border-primary text-primary font-medium shadow-lg transition hover:scale-105"
      @click="startSharedSession"
    >
      🔗 Start a shared session
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TLStoreSnapshot } from "tldraw";

useHead({ title: "Canvas — Amiw" });

const { data: seed } = await useFetch<TLStoreSnapshot | null>("/api/canvas/seed");

const startSharedSession = () => {
  const roomId = crypto.randomUUID();
  navigateTo(`/canvas/${roomId}`);
};
</script>
