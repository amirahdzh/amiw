<template>
  <div class="w-full h-screen relative">
    <ClientOnly>
      <CanvasTldrawBoard mode="multiplayer" :room-id="roomId" :sync-uri="syncUri" />
      <template #fallback>
        <div class="w-full h-screen flex items-center justify-center text-muted-foreground">
          Loading canvas…
        </div>
      </template>
    </ClientOnly>

    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-r-4 border-b-4 border-primary text-primary font-medium shadow-lg transition hover:scale-105"
      @click="copyLink"
    >
      {{ copied ? "Copied!" : "🔗 Copy share link" }}
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const roomId = route.params.roomId as string;

const config = useRuntimeConfig();
const syncUri = config.public.tldrawSyncUrl || undefined;

useHead({ title: `Canvas (${roomId}) — Amiw` });

const copied = ref(false);
const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>
