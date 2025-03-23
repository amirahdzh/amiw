<template>
  <header class="fixed top-4 left-0 w-full z-50 flex justify-center">
    <div
      class="w-[90%] max-w-[1200px] flex items-center justify-between px-6 py-3 bg-background shadow-lg rounded-full"
    >
      <!-- Logo -->
      <h1 class="text-lg font-bold">Amiw</h1>

      <!-- Navigation -->
      <nav>
        <ul class="flex space-x-6 text-sm">
          <li><NuxtLink to="/" class="hover:underline">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
          </li>
          <li><NuxtLink to="/blog" class="hover:underline">Blog</NuxtLink></li>
          <li>
            <NuxtLink to="/portfolio" class="hover:underline"
              >Portfolio</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Dark Mode Toggle -->
      <Button @click="toggleDarkMode">
        <Icon
          :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
          class="w-5 h-5"
        />
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ref } from "vue";
import { Button } from "@/components/ui/button";

const mode = useColorMode();
const isDark = ref(mode.value === "dark");

const toggleDarkMode = () => {
  mode.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
};
</script>

<style scoped>
/* Sticky header dengan efek mengambang */
</style>
