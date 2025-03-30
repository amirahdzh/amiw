<template>
  <!-- <header
    class="fixed top-4 left-0 w-full z-50 flex justify-center items-center"
  > -->
  <header class="fixed w-full z-50 flex justify-center items-center pt-4">
    <div
      class="w-[90%] max-w-[1200px] flex items-center justify-between px-4 py-2 bg-secondary shadow-lg rounded-md border border-r-8 border-b-8 border-primary"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-x-4">
        <img src="/img/maple_circle.png" alt="Amiw Logo" class="w-10 h-10" />
        <span class="text-2xl font-semibold hidden md:block">Amiw</span>
      </NuxtLink>

      <!-- Typewriting (Hidden on Mobile) -->
      <div
        class="hidden lg:flex items-center justify-center space-x-4 min-h-[40px] ml-6 flex-shrink-0"
      >
        <p class="text-md font-medium font-mono leading-none opacity-60">
          < {{ currentText }}
          <span class="inline-block w-1 bg-current animate-blink">&nbsp;</span>
          />
        </p>
      </div>

      <!-- Navigation & GitHub (Hidden on Mobile) -->
      <nav class="hidden md:flex ml-auto mr-4">
        <ul class="flex space-x-4 font-medium text-lg">
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
      <div class="flex items-center space-x-4">
        <!-- GitHub Icon -->
        <NuxtLink
          to="https://github.com/amiw"
          target="_blank"
          class="items-center hidden md:flex justify-center px-1 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
        >
          <Icon name="fa:github" class="w-6 h-6" />
        </NuxtLink>
        <!-- Dark Mode Toggle (Always Visible) -->
        <client-only>
          <button
            @click="toggleDarkMode"
            class="flex items-center justify-center px-1 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
          >
            <Icon
              :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
              class="w-6 h-6"
            />
          </button>
        </client-only>

        <!-- Hamburger Menu (Mobile) -->
        <button
          @click="toggleMenu"
          ref="buttonRef"
          class="md:hidden flex items-center justify-center px-1 py-1 rounded-md transition-colors duration-300 hover:bg-accent"
        >
          <Icon
            :name="
              isMenuOpen ? 'heroicons-outline:x' : 'heroicons-outline:menu'
            "
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      ref="menuRef"
      class="md:hidden fixed top-20 right-6 w-52 bg-[hsl(var(--header-background))] shadow-lg rounded-md p-4"
    >
      <ul class="flex flex-col space-y-2 text-lg font-medium">
        <li>
          <NuxtLink
            to="/about"
            class="block px-3 py-2 rounded-md transition-colors duration-300 hover:bg-accent"
            @click="toggleMenu"
            >About</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/blog"
            class="block px-3 py-2 rounded-md transition-colors duration-300 hover:bg-accent"
            @click="toggleMenu"
            >Blog</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/portfolio"
            class="block px-3 py-2 rounded-md transition-colors duration-300 hover:bg-accent"
            @click="toggleMenu"
            >Portfolio</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="https://github.com/amirahdzh"
            target="_blank"
            class="block px-3 py-2 rounded-md transition-colors duration-300 hover:bg-accent"
            @click="toggleMenu"
            >GitHub<Icon
              name="heroicons-outline:external-link"
              class="w-4 h-4 ml-2"
          /></NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
// import { Button } from "@/components/ui/button";

const messages: string[] = [
  "Hello, visitor!",
  "Welcome to my site!",
  "Enjoy your stay!",
];

const menuRef = ref(null);
const buttonRef = ref(null);

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
const isMenuOpen = ref(false);

const toggleDarkMode = () => {
  mode.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when clicking outside
onClickOutside(menuRef, (event) => {
  if ((buttonRef.value as HTMLElement | null)?.contains(event.target as Node))
    return;
  isMenuOpen.value = false;
});
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
