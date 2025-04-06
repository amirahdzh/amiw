<template>
  <header
    :class="[
      'fixed w-full z-50 flex justify-center items-center pt-3 transition-transform duration-300',
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div
      class="flex items-center gap-1 px-3 py-1 bg-secondary rounded-md border border-r-4 border-b-4 border-primary"
    >
      <TooltipProvider :delayDuration="0">
        <!-- Loop sebelum separator -->
        <div
          v-for="(icon, index) in icons.slice(0, 3)"
          :key="icon.name"
          class="transition-[margin,transform] duration-300 ease-out hover:scale-110 hover:mx-2"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink
                :to="icon.link"
                :target="icon.external ? '_blank' : undefined"
                class="flex items-center justify-center p-2 rounded-full transition-colors duration-300 hover:bg-accent"
              >
                <Icon :name="icon.name" class="w-5 h-5" />
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              {{ icon.tooltip }}
            </TooltipContent>
          </Tooltip>
        </div>

        <!-- Separator -->
        <div class="w-[1px] h-6 bg-border"></div>

        <!-- Loop setelah separator -->
        <div
          v-for="(icon, index) in icons.slice(3)"
          :key="icon.name"
          class="transition-[margin,transform] duration-300 ease-out hover:scale-110 hover:mx-2"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink
                :to="icon.link"
                :target="icon.external ? '_blank' : undefined"
                class="flex items-center justify-center p-2 rounded-full transition-colors duration-300 hover:bg-accent"
              >
                <Icon :name="icon.name" class="w-5 h-5" />
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              {{ icon.tooltip }}
            </TooltipContent>
          </Tooltip>
        </div>
        <!-- Separator -->
        <div class="w-[1px] h-6 bg-border"></div>

        <!-- Theme Toggle (Disabled) -->
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              disabled
              class="flex items-center justify-center p-2 rounded-full opacity-50 cursor-not-allowed"
            >
              <Icon name="lucide:moon" class="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent> Theme toggle (coming soon) </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// ShadCN Vue Tooltip components
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const lastScrollY = ref(0);
const isHeaderVisible = ref(true);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isHeaderVisible.value =
    currentScrollY < lastScrollY.value || currentScrollY < 10;
  lastScrollY.value = currentScrollY;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const icons = [
  { name: "lucide:home", link: "/", tooltip: "Home" },
  { name: "fa:heart", link: "/memoir", tooltip: "Memoir" },
  { name: "lucide:book-text", link: "/blog", tooltip: "Blog" },
  {
    name: "simple-icons:github",
    link: "https://github.com/amirahdzh",
    external: true,
    tooltip: "GitHub",
  },
  {
    name: "simple-icons:medium",
    link: "https://medium.com/@amiwdzh",
    external: true,
    tooltip: "Medium",
  },
  {
    name: "simple-icons:facebook",
    link: "https://facebook.com/amiwdzh",
    external: true,
    tooltip: "Facebook",
  },
];
</script>
