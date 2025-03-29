<template>
  <Html :class="mode">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
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
