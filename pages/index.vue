<template>
  <MemoirHeroSection />
  <template v-if="heroVibeStore.vibe === 'diary'">
    <MemoirEssenceSection />
    <MemoirJourneySection />
  </template>
  <template v-else>
    <IndexProfesionalSection />
    <IndexTrackSection />
  </template>
</template>

<script setup lang="ts">
import { useHeroVibeStore } from "@/stores/heroVibe";

const heroVibeStore = useHeroVibeStore();
</script>
