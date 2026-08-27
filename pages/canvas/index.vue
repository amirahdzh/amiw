<template>
  <section class="w-full min-h-screen pt-28 pb-16 bg-background">
    <div class="max-w-5xl mx-auto px-4 md:px-6">
      <div class="mb-6">
        <h1 class="text-4xl font-bold text-primary mb-2">Art & Leisure</h1>
        <!-- <p class="text-muted-foreground max-w-xl">
          A shared canvas everyone can draw on, plus a chatbot, gaming logs,
          and the other things I've built just because they were fun to make.
        </p> -->
      </div>

      <div
        class="relative h-[70vh] min-h-[420px] rounded-2xl overflow-hidden border border-r-4 border-b-4 border-primary"
      >
        <ClientOnly>
          <CanvasTldrawBoard
            :room-id="ROOM_ID"
            :sync-uri="syncUri"
            :fullscreen="false"
          />
          <template #fallback>
            <div
              class="w-full h-full flex items-center justify-center text-muted-foreground"
            >
              Loading canvas…
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>

  <MemoirPlaygroundSection />
</template>

<script setup lang="ts">
// Fixed forever — this is the one shared room, not a per-visitor or
// per-link room. Changing this string would split visitors onto a fresh,
// empty board.
const ROOM_ID = "amiw-public-canvas";

const config = useRuntimeConfig();
const syncUri = config.public.tldrawSyncUrl || undefined;

useHead({ title: "Art & Leisure — Amiw" });
</script>
