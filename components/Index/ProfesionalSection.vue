<script setup lang="ts">
import { RESUME_URL, RESUME_UPDATED, formatMonth } from "~/utils/site";

interface Offer {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  // Where the button goes (leave out when `dialog` is set)
  href?: string;
  // The button opens the "Book a call" box instead of leaving the site
  dialog?: boolean;
  // "YYYY-MM-DD": shown under the button as "updated Oct 2026"
  updated?: string;
  // Or a small link under the button, to a page on this site
  note?: { label: string; to: string };
}

// Organized by who is reading, not by skill, and about hiring Amiw: an
// employer or a client. (People who want to collaborate have their own section,
// Index/CollaborateSection.vue.) One button each, all the same size and style,
// with an optional small line underneath.
const offers: Offer[] = [
  {
    eyebrow: "Employers",
    title: "Join your team",
    description:
      "Software engineer for teams that use C#/.NET and TypeScript. I also bring Linux and cloud experience.",
    cta: "Resume",
    href: RESUME_URL,
    updated: RESUME_UPDATED,
  },
  {
    eyebrow: "Freelance clients",
    title: "Build something for you",
    description: "I start by understanding what you need, then make it happen. First call is free.",
    cta: "Book a call",
    dialog: true,
    note: { label: "How I work", to: "/work-with-me" },
  },
];

const buttonClass =
  "btn-outline w-full px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]";
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

      <ul class="mt-9 border-b border-[hsl(var(--border))]" data-reveal-group>
        <li
          v-for="offer in offers"
          :key="offer.title"
          data-reveal
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

          <div class="grid w-44 justify-items-center gap-1.5 justify-self-start md:justify-self-end">
            <BookCallDialog v-if="offer.dialog">
              <button type="button" :class="buttonClass">
                {{ offer.cta }}
                <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
              </button>
            </BookCallDialog>
            <a
              v-else
              :href="offer.href"
              target="_blank"
              rel="noopener noreferrer"
              :class="buttonClass"
            >
              {{ offer.cta }}
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </a>

            <span v-if="offer.updated" class="font-mono text-[12.5px] text-muted-foreground">
              updated <time :datetime="offer.updated">{{ formatMonth(offer.updated) }}</time>
            </span>
            <NuxtLink
              v-else-if="offer.note"
              :to="offer.note.to"
              class="rounded font-mono text-[12.5px] font-bold text-foreground underline decoration-pink decoration-2 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--blush-band))] motion-reduce:transition-none"
            >
              {{ offer.note.label }} →
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
