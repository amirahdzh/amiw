<script setup lang="ts">
import { RESUME_URL, RESUME_UPDATED, formatMonth } from "~/utils/site";
import { languageCodes, city, timezone } from "~/utils/workWithMe";

// The diary side of this hero is archived in archive/diary/ (see its README).
const proLinks = [
  { href: "#services", label: "Work with me" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];
</script>

<template>
  <!-- Open layout (no container): the illustration is cut off at the hips, so
       it stands on the nav hairline below it. The top padding is small
       because the site's top bar sits right above this section. -->
  <section id="hero" class="w-full bg-background pt-5 md:pt-4">
    <div class="max-w-6xl mx-auto px-6">
      <div
        class="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_22rem] md:gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16"
      >
        <div class="min-w-0 self-center pb-8 md:pb-16 md:pt-8">
          <!-- Where I am and what I speak: the same quiet label as on every page. -->
          <p class="eyebrow mb-3 flex flex-wrap items-center gap-x-2.5">
            {{ languageCodes }}
            <span aria-hidden="true" class="text-pink">·</span>
            {{ city }}
            <span aria-hidden="true" class="text-pink">·</span>
            {{ timezone }}
          </p>
          <h1
            class="font-mono text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            I'm Amiw
          </h1>
          <!-- Two deliberate lines so the break lands between phrases, not
               inside "Linux Infrastructure". -->
          <p
            class="mt-4 font-mono text-[13px] leading-relaxed tracking-wide text-muted-foreground md:text-sm"
          >
            <span class="block">Software Engineer | C#/.NET, TypeScript,</span>
            <span class="block">Linux Infrastructure &amp; Software Delivery</span>
          </p>

          <!-- Two sizes on purpose: the approach is the statement, and the
               skills sit under it, smaller and muted, like the role line. -->
          <p
            class="mt-8 max-w-[34ch] text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed"
          >
            I rarely write code. I focus on understanding what you need and
            making it happen.
          </p>
          <p
            class="mt-3.5 max-w-[46ch] text-[15px] leading-[1.6] text-muted-foreground md:text-[17px]"
          >
            <span class="whitespace-nowrap">Stack-agnostic.</span> Good at
            <b
              class="font-semibold bg-[linear-gradient(transparent_58%,hsl(var(--bloom))_58%)]"
              >C#/.NET</b
            >
            and
            <b
              class="font-semibold bg-[linear-gradient(transparent_58%,hsl(var(--bloom))_58%)]"
              >TypeScript</b
            >, but happy with WordPress if that's what gets the job done.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <!-- Opens the "Book a call" box (components/BookCallDialog.vue). -->
            <BookCallDialog>
              <button
                type="button"
                class="btn-solid px-7 py-3.5 text-base focus-visible:ring-offset-background"
              >
                Book a free call
                <Icon name="lucide:arrow-right" class="h-4 w-4" />
              </button>
            </BookCallDialog>
            <!-- The date sits outside the link so it isn't underlined. -->
            <span class="inline-flex items-center gap-1.5">
              <a
                :href="RESUME_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded px-2 py-2.5 text-base font-medium text-primary underline decoration-pink decoration-2 underline-offset-[6px] transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Resume
                <Icon name="heroicons-outline:external-link" class="h-5 w-5" />
              </a>
              <span class="font-mono text-[13px] text-muted-foreground">
                updated <time :datetime="RESUME_UPDATED">{{ formatMonth(RESUME_UPDATED) }}</time>
              </span>
            </span>
          </div>
        </div>

        <!-- Cut-out illustration on soft shapes. The shapes are pale sage and
             honey, not pink, so the figure's own pink hijab and jacket keep
             their edges. -->
        <div
          class="relative mx-auto aspect-[368/529] w-[min(88%,19rem)] md:mx-0 md:w-full md:max-w-[22rem] md:justify-self-end lg:max-w-[26rem]"
        >
          <span
            aria-hidden="true"
            class="absolute left-[4%] top-[15%] aspect-square w-[90%] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] bg-accent"
          ></span>
          <span
            aria-hidden="true"
            class="absolute -left-[4%] bottom-[9%] aspect-square w-[30%] rounded-full bg-honey/35"
          ></span>
          <span
            aria-hidden="true"
            class="absolute right-[3%] top-[7%] aspect-square w-[10%] rounded-full bg-bloom"
          ></span>
          <img
            src="/img/amiw-figure.webp"
            alt="Illustration of Amiw from behind, wearing a pink hijab and a backpack"
            width="760"
            height="1093"
            fetchpriority="high"
            decoding="async"
            class="absolute inset-0 h-full w-full object-contain object-bottom"
          />
        </div>
      </div>

      <nav
        aria-label="Sections"
        class="flex flex-wrap gap-x-8 gap-y-1 border-t border-border pb-8 pt-4 text-base"
      >
        <a
          v-for="link in proLinks"
          :key="link.href"
          :href="link.href"
          class="group inline-flex items-center rounded py-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          <span aria-hidden="true" class="mr-2 text-amiw">→</span>
          <!-- Only the label is underlined, so the line is one straight line. -->
          <span
            class="link-grow"
            >{{ link.label }}</span
          >
        </a>
      </nav>
    </div>
  </section>
</template>
