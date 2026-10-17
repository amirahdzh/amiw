<script setup lang="ts">
import { findProject, projects } from "~/utils/projects";

const route = useRoute();
const project = findProject(String(route.params.slug));

// A project only has a page when it has `details` (see utils/projects.ts).
if (!project || !project.details) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
    fatal: true,
  });
}

const details = project.details;

useHead({
  title: `${project.title} — Amiw`,
  meta: [{ name: "description", content: details.tagline }],
});

// Key facts shown in the strip under the intro. Missing ones are left out.
const facts = [
  { label: "Role", value: details.role },
  { label: "Period", value: project.period },
  { label: "Stack", value: project.tech.join(" · ") },
  { label: "Status", value: details.status },
].filter((f) => f.value);

// Next project that also has a page (hidden when there is none).
const next = computed(() => {
  const withPages = projects.filter((p) => p.details);
  const i = withPages.findIndex((p) => p.slug === project.slug);
  const candidate = withPages[(i + 1) % withPages.length];
  return candidate && candidate.slug !== project.slug ? candidate : null;
});

const buttonClass =
  "btn-outline px-5 py-2.5 text-sm focus-visible:ring-offset-background";
const h2Class = "mb-3 font-mono text-xl font-bold text-foreground";
</script>

<template>
  <article class="w-full bg-background pt-8 pb-16 md:pt-10 md:pb-24">
    <div class="mx-auto max-w-3xl px-6">
      <NuxtLink
        to="/#projects"
        class="mb-6 inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        <span aria-hidden="true" class="text-amiw">←</span>
        Projects
      </NuxtLink>

      <p class="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {{ details.kind }}<template v-if="project.period"> · {{ project.period }}</template>
      </p>
      <h1
        class="heading-marker mt-1.5 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
      >
        {{ project.title }}
      </h1>
      <p class="mt-3 max-w-[40ch] text-lg text-muted-foreground md:text-xl">
        {{ details.tagline }}
      </p>

      <div v-if="project.website || project.source" class="mt-5 flex flex-wrap gap-2.5">
        <a
          v-if="project.website"
          :href="project.website"
          target="_blank"
          rel="noopener noreferrer"
          :class="buttonClass"
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
        >
          Source
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
      </div>

      <figure v-if="project.still" class="mt-8">
        <div
          class="overflow-hidden rounded-[14px] border border-border bg-muted"
          :style="project.thumbBg ? { backgroundColor: project.thumbBg } : undefined"
        >
          <img
            :src="project.still"
            :alt="project.alt"
            width="800"
            height="450"
            fetchpriority="high"
            decoding="async"
            class="aspect-video w-full"
            :class="
              project.pixelated
                ? '[image-rendering:pixelated] object-contain object-center'
                : 'object-cover object-top'
            "
          />
        </div>
        <figcaption
          v-if="details.imageCaption"
          class="mt-2 text-[13px] text-muted-foreground"
        >
          {{ details.imageCaption }}
        </figcaption>
      </figure>

      <dl
        v-if="facts.length"
        class="mt-8 grid grid-cols-2 gap-x-7 gap-y-4 border-y border-border py-5 md:grid-cols-4"
      >
        <div v-for="fact in facts" :key="fact.label" class="min-w-0">
          <dt class="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {{ fact.label }}
          </dt>
          <dd class="mt-1 text-sm text-foreground">{{ fact.value }}</dd>
        </div>
      </dl>

      <div class="mt-10 grid gap-10">
        <section v-if="details.problem">
          <h2 :class="h2Class">The problem</h2>
          <p class="max-w-[56ch] text-lg leading-relaxed text-foreground">
            {{ details.problem }}
          </p>
        </section>

        <section v-if="details.steps?.length">
          <h2 :class="h2Class">{{ details.stepsTitle ?? "How it works" }}</h2>
          <ol class="grid gap-4">
            <li
              v-for="(step, i) in details.steps"
              :key="step.title"
              class="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3.5 gap-y-0.5"
            >
              <span
                aria-hidden="true"
                class="row-span-2 flex h-7 w-7 items-center justify-center rounded-full border border-pink bg-[hsl(var(--blush-band))] font-mono text-[13px] font-bold text-foreground"
              >
                {{ i + 1 }}
              </span>
              <h3 class="font-semibold text-foreground">{{ step.title }}</h3>
              <p class="max-w-[60ch] text-muted-foreground">{{ step.text }}</p>
            </li>
          </ol>
        </section>

        <section v-if="details.built?.length">
          <h2 :class="h2Class">What I built</h2>
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="item in details.built" :key="item.title">
              <h3 class="mb-1 font-mono text-[15px] font-bold text-foreground">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ item.text }}</p>
            </div>
          </div>
        </section>

        <section v-if="details.decisions?.length">
          <h2 :class="h2Class">Decisions worth explaining</h2>
          <ul class="grid max-w-[66ch] gap-2.5">
            <li
              v-for="item in details.decisions"
              :key="item.title"
              class="relative pl-4 leading-relaxed text-foreground"
            >
              <span
                aria-hidden="true"
                class="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-pink"
              ></span>
              <b class="font-semibold">{{ item.title }}.</b> {{ item.text }}
            </li>
          </ul>
        </section>

        <section v-if="details.privacy">
          <h2 :class="h2Class">Privacy</h2>
          <p class="max-w-[60ch] leading-relaxed text-foreground">{{ details.privacy }}</p>
        </section>
      </div>

      <div
        v-if="next"
        class="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-5 text-sm"
      >
        <span class="text-muted-foreground">Next project</span>
        <NuxtLink
          :to="`/projects/${next.slug}`"
          class="font-semibold text-foreground underline decoration-pink decoration-2 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          {{ next.title }} →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
