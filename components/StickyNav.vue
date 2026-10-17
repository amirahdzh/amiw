<script setup lang="ts">
import {
  siteLinks as links,
  socials,
  navWidthClass,
  navFocusClass as focusClass,
} from "~/utils/navLinks";

// A slim fixed bar that comes back while you scroll, so the links are never
// far away. It only reacts to a deliberate scroll (about one mouse-wheel notch
// in one direction), and it stays out of the way near the top of a page, where
// the normal top bar (Header.vue) is still in view.
const route = useRoute();
const isHome = computed(() => route.path === "/");
const widthClass = computed(() => navWidthClass(route.path));

const INTENT_PX = 80;
const visible = ref(false);
let lastY = 0;
let intent = 0; // signed px scrolled since the direction last changed

// Below this scroll position the bar stays hidden. On the homepage that is the
// end of the hero, so the hero keeps its own top bar to itself.
const hiddenAbove = () =>
  isHome.value
    ? Math.max(240, (document.getElementById("hero")?.offsetHeight ?? 700) - 120)
    : 240;

const onScroll = () => {
  const y = Math.max(0, window.scrollY);
  const delta = y - lastY;
  lastY = y;
  if (delta === 0) return;

  // Keep adding up while the direction stays the same; start over when it flips.
  intent = Math.sign(delta) === Math.sign(intent) ? intent + delta : delta;

  if (y <= hiddenAbove()) {
    visible.value = false;
    intent = 0;
    return;
  }
  if (intent <= -INTENT_PX) visible.value = true;
  else if (intent >= INTENT_PX) visible.value = false;
};

onMounted(() => {
  lastY = Math.max(0, window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));

watch(
  () => route.path,
  () => {
    visible.value = false;
    intent = 0;
    lastY = Math.max(0, window.scrollY);
  },
);
</script>

<template>
  <!-- `inert` while hidden: its links can't be tabbed to or read out while they
       are off-screen. Keyboard users have the top bar and the footer. -->
  <nav
    aria-label="Quick navigation"
    class="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur transition-transform duration-300 motion-reduce:transition-none"
    :class="visible ? 'translate-y-0' : '-translate-y-full'"
    :inert="visible ? undefined : ''"
  >
    <div
      class="mx-auto flex items-center justify-between gap-x-6 py-2"
      :class="widthClass"
    >
      <NuxtLink
        to="/"
        aria-label="Amiw, home"
        class="rounded font-mono text-[19px] font-bold leading-tight text-foreground"
        :class="focusClass"
      >
        Amiw
      </NuxtLink>

      <div
        class="flex items-center gap-x-5 font-mono text-[13px] text-muted-foreground md:gap-x-5"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded py-1.5 underline-offset-4 decoration-pink decoration-2 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline motion-reduce:transition-none"
          :class="focusClass"
        >
          {{ link.label }}
        </NuxtLink>

        <div
          class="hidden items-center gap-3.5 border-l border-border pl-[18px] text-foreground md:flex"
        >
          <a
            v-for="item in socials"
            :key="item.label"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            :aria-label="item.label"
            class="rounded p-0.5 transition-colors hover:text-amiw motion-reduce:transition-none"
            :class="focusClass"
          >
            <Icon :name="item.icon" class="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
