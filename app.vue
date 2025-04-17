<!-- <template>
  <Html :class="mode">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template> -->

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
  initialValue: "system", // default to system
});
</script>
