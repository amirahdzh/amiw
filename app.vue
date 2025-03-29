<template>
  <Html :class="{ dark: isDark }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ref, onMounted } from "vue";

const mode = useColorMode();
const isDark = ref(false);

// Ensure dark mode applies **before hydration**
onMounted(() => {
  isDark.value = mode.value === "dark";
});
</script>
