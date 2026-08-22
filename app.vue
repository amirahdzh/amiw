<template>
  <Html :class="mode">
    <div class="min-h-screen flex flex-col text-foreground">
      <!-- Header -->
      <Header />

      <!-- Content -->
      <main class="flex-grow">
        <NuxtPage />
      </main>

      <Footer /></div
  ></Html>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

const mode = useColorMode({
  modes: {
    dark: "dark",
    light: "light",
  },
  storageKey: "vueuse-color-scheme", // prefer localStorage
  initialValue: "light", // theme toggle is disabled right now, so always default to light
});
</script>
