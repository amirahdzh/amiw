<template>
  <section class="w-full min-h-screen pt-28 pb-16 bg-background">
    <div class="max-w-5xl mx-auto px-4 md:px-6">
      <div class="mb-6">
        <h1 class="text-4xl font-bold text-primary mb-2">Art & Leisure</h1>
        <p class="text-muted-foreground max-w-xl text-sm italic">
          You can do whatever you want here. I won't record or track anything
          you do. Leave a mark, draw a doddle, messing around (I'd rather you
          didn't xD), or just relax and enjoy this shared space! ^^
        </p>
        <p class="text-muted-foreground max-w-xl text-xs mt-2">
          Pro tip: add a new page to get your whole brand new canvas.
        </p>
      </div>

      <div
        class="relative h-[70vh] min-h-[420px] rounded-2xl overflow-hidden border border-r-4 border-b-4 border-primary"
      >
        <ClientOnly>
          <CanvasTldrawBoard
            :room-id="ROOM_ID"
            :sync-uri="syncUri"
            :license-key="licenseKey"
            :fullscreen="false"
            @ready="boardReady = true"
          />
        </ClientOnly>

        <!--
          Not inside <ClientOnly> — this is plain SSR'd markup, so it's
          already on screen before any JS runs. <ClientOnly>'s own
          mount/fallback swap only covers the pre-hydration gap; it doesn't
          cover the time spent downloading CanvasTldrawBoard's chunk
          (tldraw+React, ~550KB, loaded lazily as a .client.vue), which is
          exactly the gap that showed up as an empty box with nothing in it
          on a cold load. This single overlay covers both gaps and only
          goes away once the board actually confirms it rendered.
        -->
        <div
          v-if="!boardReady"
          class="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary"
        >
          Loading canvas…
        </div>
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
const licenseKey = config.public.tldrawLicenseKey || undefined;

const boardReady = ref(false);

useHead({ title: "Art & Leisure — Amiw" });
</script>
