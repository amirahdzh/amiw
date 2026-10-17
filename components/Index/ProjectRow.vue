<script setup lang="ts">
import type { Project } from "~/utils/projects";

const props = defineProps<{
  project: Project;
}>();

// Hover/focus plays the original GIF (when there is one), unless the visitor
// has asked the OS for reduced motion, in which case the still frame stays.
const playing = ref(false);
const motionOk = ref(false);

onMounted(() => {
  motionOk.value = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

const play = () => {
  if (props.project.gif && motionOk.value) playing.value = true;
};
const stop = () => {
  playing.value = false;
};
const thumbSrc = computed(() =>
  playing.value && props.project.gif ? props.project.gif : props.project.still,
);
// Shown instead of an image when a project has none: its first two initials.
const initials = computed(() =>
  props.project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase(),
);

const buttonClass =
  "btn-outline min-w-[7.5rem] px-4 py-2.5 text-sm focus-visible:ring-offset-background";
</script>

<template>
  <article
    class="grid gap-5 py-7 md:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] md:items-center md:gap-11 md:py-9"
    @mouseenter="play"
    @mouseleave="stop"
    @focusin="play"
    @focusout="stop"
  >
    <div
      class="aspect-video overflow-hidden rounded-[14px] border border-border bg-muted"
      :style="project.thumbBg ? { backgroundColor: project.thumbBg } : undefined"
    >
      <div
        v-if="!project.still"
        aria-hidden="true"
        class="flex h-full w-full items-center justify-center bg-[hsl(var(--blush-band))] font-mono text-5xl font-bold tracking-tight text-foreground/25"
      >
        {{ initials }}
      </div>
      <img
        v-else
        :src="thumbSrc"
        :alt="project.alt"
        width="400"
        height="225"
        loading="lazy"
        decoding="async"
        class="h-full w-full"
        :class="
          project.pixelated
            ? '[image-rendering:pixelated] object-contain object-center'
            : 'object-cover object-top'
        "
      />
    </div>

    <div class="grid content-center gap-2.5">
      <h3 class="font-mono text-xl md:text-2xl font-bold leading-tight text-foreground">
        {{ project.title }}
      </h3>
      <p class="max-w-[48ch] text-base leading-relaxed text-foreground md:text-lg">
        {{ project.description }}
      </p>
      <p
        class="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[13px] text-muted-foreground"
      >
        <template v-for="(tech, i) in project.tech" :key="tech">
          <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
          <span>{{ tech }}</span>
        </template>
      </p>
      <div class="mt-2 flex flex-wrap gap-2.5">
        <NuxtLink
          v-if="project.details"
          :to="`/projects/${project.slug}`"
          :class="buttonClass"
          :aria-label="`${project.title}: details`"
        >
          Details
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </NuxtLink>
        <a
          v-if="project.website"
          :href="project.website"
          target="_blank"
          rel="noopener noreferrer"
          :class="buttonClass"
          :aria-label="`${project.title} website`"
        >
          Website
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
        <a
          v-if="project.source"
          :href="project.source"
          target="_blank"
          rel="noopener noreferrer"
          :class="buttonClass"
          :aria-label="`${project.title} source code`"
        >
          Source
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
</template>
