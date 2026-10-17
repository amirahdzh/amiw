<script setup lang="ts">
import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
  RESUME_URL,
  RESUME_UPDATED,
  formatMonth,
} from "~/utils/site";
interface Offer {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external: boolean;
  // A second, plain button before the main one (a page on this site)
  secondary?: { label: string; to: string };
  // "YYYY-MM-DD": shown under the button as "updated Oct 2026"
  updated?: string;
}

// Organized by who is reading, not by skill. The Freelance row has two buttons:
// "How I work" (the page) and "Book a call", which is filled because it is the
// action. The other rows have one outlined button.
const offers: Offer[] = [
  {
    eyebrow: "Employers",
    title: "Join your team",
    description:
      "Software engineer for teams that use C#/.NET and TypeScript. I also bring Linux and cloud experience.",
    cta: "Resume",
    href: RESUME_URL,
    external: true,
    updated: RESUME_UPDATED,
  },
  {
    eyebrow: "Freelance clients",
    title: "Build something for you",
    description: "I start by understanding what you need, then make it happen. First call is free.",
    cta: "Book a call",
    href: WHATSAPP_URL,
    external: true,
    secondary: { label: "How I work", to: "/work-with-me" },
  },
  {
    eyebrow: "Collaborators",
    title: "Work on something together",
    description:
      "Community, non-profit and open projects. Tell me what you're working on.",
    cta: "Say hello",
    href: `mailto:${CONTACT_EMAIL}`,
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

// "Latest on the blog" teaser: always the newest post in content/blog, so it
// updates itself when posts change.
const { data: posts } = await useBlogPosts();
const latestPost = computed(() => posts.value[0] ?? null);
const latestLink = computed(() => latestPost.value?._path ?? "/blog");
const latestDate = computed(() =>
  latestPost.value ? formatPostDate(latestPost.value.date) : "",
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
          class="border-t border-[hsl(var(--border))]"
        >
          <div
            class="grid gap-3 py-6 md:grid-cols-[15.5rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-7"
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

            <div class="flex flex-wrap items-start gap-3 justify-self-start md:justify-self-end">
              <NuxtLink
                v-if="offer.secondary"
                :to="offer.secondary.to"
                class="btn-outline px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
              >
                {{ offer.secondary.label }}
                <Icon name="lucide:arrow-right" class="h-4 w-4" />
              </NuxtLink>
              <div class="grid w-44 justify-items-center gap-1.5">
                <a
                  :href="offer.href"
                  :target="offer.external ? '_blank' : undefined"
                  :rel="offer.external ? 'noopener noreferrer' : undefined"
                  class="w-full px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
                  :class="offer.secondary ? 'btn-solid' : 'btn-outline'"
                >
                  {{ offer.cta }}
                  <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
                </a>
                <span v-if="offer.updated" class="font-mono text-[12.5px] text-muted-foreground">
                  updated <time :datetime="offer.updated">{{ formatMonth(offer.updated) }}</time>
                </span>
              </div>
            </div>
          </div>

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
            :to="latestLink"
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
          <time class="text-[13px] text-muted-foreground" :datetime="latestPost.date">
            {{ latestDate }}
          </time>
        </div>
      </div>
    </div>
  </section>
</template>
