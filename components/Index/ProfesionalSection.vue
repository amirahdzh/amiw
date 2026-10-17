<script setup lang="ts">
import { useBlogStore } from "@/stores/blog";

interface Offer {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external: boolean;
}

// Organized by who is reading, not by skill. All three actions share one
// button style on purpose: no one door is "the" primary action.
const offers: Offer[] = [
  {
    eyebrow: "Employers",
    title: "Join your team",
    description:
      "Software engineer for teams that use C#/.NET and TypeScript. I also bring Linux and delivery experience.",
    cta: "Resume",
    href: "https://docs.google.com/document/d/1JPOLI2oE2TByNBR7FCI7I6ZZaW7vDEOff67c0FaDrDA/edit?usp=drive_link",
    external: true,
  },
  {
    eyebrow: "Freelance clients",
    title: "Build something for you",
    description: "I start by understanding what you need, then make it happen.",
    cta: "Contact me",
    href: "https://wa.me/6282114643544",
    external: true,
  },
  {
    eyebrow: "Collaborators",
    title: "Work on something together",
    description:
      "Community, non-profit and open projects. Tell me what you're working on.",
    cta: "Say hello",
    href: "mailto:amirahdzh@gmail.com",
    external: false,
  },
];

// Interests, not services: plain text.
const passions = [
  "writing",
  "productivity",
  "frugal",
  "minimalism",
  "sustainability",
];

// "Latest on the blog" teaser: always the newest post in the blog store, so it
// updates itself when posts change. Posts without their own page (link: null)
// send the reader to the blog index instead.
const blogStore = useBlogStore();
if (!blogStore.posts.length) blogStore.loadPosts();

const latestPost = computed(
  () =>
    [...blogStore.posts].sort((a, b) => b.pubDate.localeCompare(a.pubDate))[0] ??
    null,
);

// UTC on purpose: "2026-08-27" is a calendar date, and formatting it in a
// negative-offset timezone would show the 26th.
const latestDate = computed(() =>
  latestPost.value
    ? new Date(latestPost.value.pubDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "",
);
</script>

<template>
  <section
    id="services"
    class="w-full py-16 md:py-20 bg-[hsl(var(--blush-band))] [--border:339_22%_85%]"
  >
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="heading-marker text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Work with me
      </h2>

      <ul class="mt-9 border-b border-[hsl(var(--border))]">
        <li
          v-for="offer in offers"
          :key="offer.title"
          class="grid gap-3 border-t border-[hsl(var(--border))] py-6 md:grid-cols-[15.5rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-7"
        >
          <div>
            <span
              class="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {{ offer.eyebrow }}
            </span>
            <h3 class="font-mono text-xl font-bold leading-tight text-foreground">
              {{ offer.title }}
            </h3>
          </div>

          <p class="max-w-[44ch] text-base leading-relaxed text-foreground md:text-lg">
            {{ offer.description }}
          </p>

          <a
            :href="offer.href"
            :target="offer.external ? '_blank' : undefined"
            :rel="offer.external ? 'noopener noreferrer' : undefined"
            class="btn-outline w-44 justify-self-start px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))] md:justify-self-end"
          >
            {{ offer.cta }}
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </a>
        </li>
      </ul>

      <div class="mt-6 space-y-2.5 font-mono text-[13px] text-muted-foreground md:text-sm">
        <p class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span
            class="mr-1 font-sans text-xs font-semibold uppercase tracking-widest"
            >Passionate in</span
          >
          <template v-for="(item, i) in passions" :key="item">
            <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
            <span>{{ item }}</span>
          </template>
        </p>

        <div
          v-if="latestPost"
          class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-dashed border-[hsl(var(--border))] pt-3.5 font-sans"
        >
          <span
            class="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Latest on the blog
          </span>
          <NuxtLink
            :to="latestPost.link ?? '/blog'"
            :external="!!latestPost.link"
            class="group inline-flex items-baseline gap-1.5 rounded text-[15px] font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--blush-band))] motion-reduce:transition-none"
          >
            <span
              class="underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none"
              >{{ latestPost.title }}</span
            >
            <span
              aria-hidden="true"
              class="text-amiw transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >→</span
            >
          </NuxtLink>
          <time class="text-[13px] text-muted-foreground" :datetime="latestPost.pubDate">
            {{ latestDate }}
          </time>
        </div>
      </div>
    </div>
  </section>
</template>
