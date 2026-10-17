<script setup lang="ts">
import {
  siteLinks as links,
  workLink,
  socials,
  navWidthClass,
  navFocusClass as focusClass,
} from "~/utils/navLinks";

// A plain top bar, part of the page (not fixed), so it scrolls away with the
// content. It looks the same on every page, including the homepage hero.
// (The slim bar that comes back while scrolling is components/StickyNav.vue.)
const route = useRoute();
const widthClass = computed(() => navWidthClass(route.path));
</script>

<template>
  <header class="w-full bg-background">
    <div
      class="mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pb-1 pt-[18px]"
      :class="widthClass"
    >
      <NuxtLink
        to="/"
        aria-label="Amiw, home"
        class="rounded font-mono text-[21px] font-bold leading-tight text-foreground"
        :class="focusClass"
      >
        Amiw
      </NuxtLink>

      <nav
        aria-label="Primary"
        class="flex items-center gap-x-5 font-mono text-[13px] text-muted-foreground md:gap-x-[22px]"
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

        <NuxtLink
          :to="workLink.to"
          class="rounded-full border border-primary px-3.5 py-1 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground motion-reduce:transition-none"
          :class="focusClass"
        >
          {{ workLink.label }}
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
      </nav>
    </div>
  </header>
</template>
