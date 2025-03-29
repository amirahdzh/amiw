<template>
  <header
    class="fixed top-4 left-0 w-full z-50 flex justify-center items-center"
  >
    <div
      class="w-[90%] max-w-[1200px] flex items-center justify-between px-4 py-2 bg-[hsl(var(--header-background))] shadow-lg rounded-md"
    >
      <!-- Logo -->
      <div
        class="flex items-center gap-x-4 text-[hsl(var(--header-foreground))]"
      >
        <img src="/img/maple_circle.png" alt="Amiw Logo" class="w-10 h-10" />
        <NuxtLink to="/" class="text-3xl font-semibold">amiw</NuxtLink>
      </div>

      <!-- Typewriting -->
      <div
        class="flex items-center justify-center space-x-4 text-[hsl(var(--header-foreground))]/60 min-h-[40px] ml-4 flex-shrink-0"
      >
        <p class="text-sm font-medium font-mono leading-none">
          < {{ currentText }}
          <span class="inline-block w-1 bg-current animate-blink">&nbsp;</span>
          />
        </p>
      </div>

      <!-- Navigation -->
      <nav class="ml-auto mr-4">
        <ul
          class="flex space-x-4 font-medium text-lg text-[hsl(var(--header-foreground))]"
        >
          <li>
            <NuxtLink
              to="/about"
              class="px-3 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/blog"
              class="px-3 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
              >Blog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/portfolio"
              class="px-3 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
              >Portfolio</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Icons -->
      <div
        class="flex items-center space-x-4 text-[hsl(var(--header-foreground))]"
      >
        <!-- GitHub Icon -->
        <NuxtLink
          to="https://github.com/amiw"
          target="_blank"
          class="flex items-center justify-center px-1 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
        >
          <Icon name="fa:github" class="w-6 h-6" />
        </NuxtLink>

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="flex items-center justify-center px-1 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
        >
          <Icon
            :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ref, onMounted } from "vue";
// import { Button } from "@/components/ui/button";

const messages: string[] = [
  "Hello, visitor!",
  "Welcome to my site!",
  "Enjoy your stay!",
];

const currentText = ref<string>("");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = (): void => {
  const currentMessage = messages[textIndex];

  currentText.value = isDeleting
    ? currentMessage.slice(0, charIndex--)
    : currentMessage.slice(0, charIndex++);

  if (!isDeleting && charIndex === currentMessage.length) {
    setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % messages.length; // Cycle messages
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing/deleting speed
};

onMounted(() => typeEffect());
// onMounted(typeEffect);

const mode = useColorMode();
const isDark = ref(mode.value === "dark");

const toggleDarkMode = () => {
  mode.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
};
</script>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.animate-blink {
  animation: blink 0.8s infinite;
}
</style>
