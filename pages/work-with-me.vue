<script setup lang="ts">
import { resolveComponent } from "vue";
import { CONTACT_EMAIL, formatMonth } from "~/utils/site";
import { projects } from "~/utils/projects";
import { facts, steps, faq, languageCodes, timezone, termsUpdated } from "~/utils/workWithMe";

usePageSeo({
  title: "How I work | Amiw",
  description:
    "How Amiw works with freelance clients: websites for small businesses and workflow automation. A free first call, a written proposal, a contract, a kickoff and a handover.",
});

// Which fact's "Why?" is open (-1 = none). One at a time.
const openFact = ref(-1);
const toggleFact = (i: number) => {
  openFact.value = openFact.value === i ? -1 : i;
};

// `:is="'NuxtLink'"` (a plain string) doesn't reliably resolve to the real
// component, so look it up properly.
const NuxtLinkComponent = resolveComponent("NuxtLink");

// A few real projects, as proof, under the process.
const recentWork = projects.slice(0, 3);

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
</script>

<template>
  <div class="w-full">
    <section class="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20">
      <div class="mx-auto max-w-6xl px-6">
        <p class="eyebrow flex flex-wrap items-center justify-between gap-x-4">
          <span>Work with me</span>
          <span class="flex items-center gap-x-2.5">
            {{ languageCodes }}
            <span aria-hidden="true" class="text-pink">·</span>
            {{ timezone }}
          </span>
        </p>
        <h1
          class="heading-marker mt-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          How I work
        </h1>
        <p class="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
          Websites for small businesses, and automation for repetitive work. I also have experience
          building software for GDPR compliance.
        </p>

        <!-- The first thing to do on this page, in plain sight. -->
        <div class="mt-7">
          <BookCallDialog>
            <button
              type="button"
              class="btn-solid px-7 py-3.5 text-base focus-visible:ring-offset-background"
            >
              Book a free call
              <Icon name="lucide:arrow-right" class="h-4 w-4" />
            </button>
          </BookCallDialog>
        </div>

        <!-- The things that reassure a client most, big and first. "Why?" opens
             the reason in a card under the band, pointing at its fact. -->
        <div class="mt-10">
          <ul
            class="grid grid-cols-2 overflow-hidden rounded-xl bg-[hsl(var(--alternate-background))] md:grid-cols-4"
            data-reveal-group
          >
            <li
              v-for="(fact, i) in facts"
              :key="fact.value"
              data-reveal
              class="flex flex-col items-start border-border px-5 pb-4 pt-5 transition-colors motion-reduce:transition-none md:px-6 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 md:[&:nth-child(n+2)]:border-l"
              :class="openFact === i ? 'bg-muted/60' : ''"
            >
              <p
                class="font-mono text-2xl font-bold leading-tight md:text-[1.75rem]"
                :class="i === 0 ? 'text-amiw' : 'text-foreground'"
              >
                {{ fact.value }}
              </p>
              <p class="mb-3 mt-1 text-sm leading-snug text-muted-foreground">{{ fact.note }}</p>
              <button
                type="button"
                class="group -ml-1 mt-auto inline-flex items-center gap-1.5 rounded px-1 py-0.5 font-mono text-[12.5px] font-bold text-foreground"
                :class="focusClass"
                :aria-expanded="openFact === i"
                aria-controls="fact-reason"
                @click="toggleFact(i)"
              >
                <span
                  class="underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none"
                  >Why?</span
                >
                <span
                  aria-hidden="true"
                  class="inline-block text-[15px] leading-none text-amiw transition-transform motion-reduce:transition-none"
                  :class="openFact === i ? 'rotate-45' : ''"
                  >+</span
                >
              </button>
            </li>
          </ul>

          <div
            id="fact-reason"
            role="region"
            aria-live="polite"
            :style="openFact >= 0 ? { '--d': openFact, '--m': openFact % 2 } : undefined"
          >
            <div
              v-if="openFact >= 0"
              class="relative mt-3 rounded-xl border border-pink bg-background px-5 py-4 md:px-6"
            >
              <span
                aria-hidden="true"
                class="absolute -top-[8px] left-[calc(var(--m)_*_50%_+_1.5rem)] h-3.5 w-3.5 rotate-45 border-l border-t border-pink bg-background md:left-[calc(var(--d)_*_25%_+_1.5rem)]"
              ></span>
              <h2 class="font-mono text-[15px] font-bold text-foreground">
                {{ facts[openFact].question }}
              </h2>
              <p class="mt-1 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">
                {{ facts[openFact].reason }}
              </p>
            </div>
          </div>

          <p class="mt-3 font-mono text-[12.5px] text-muted-foreground">
            Terms as of <time :datetime="termsUpdated">{{ formatMonth(termsUpdated) }}</time>
          </p>
        </div>

        <div class="mt-12 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <h2 class="font-mono text-lg font-bold text-foreground">The process</h2>
            <ol class="mt-5" data-reveal-group>
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                data-reveal
                class="relative pb-6 pl-[3.25rem] last:pb-0 after:absolute after:bottom-0 after:left-[16px] after:top-9 after:w-[2px] after:bg-pink last:after:hidden"
              >
                <span
                  aria-hidden="true"
                  class="absolute left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-bloom font-mono text-sm font-bold text-foreground"
                >
                  {{ i + 1 }}
                </span>
                <h3 class="font-mono text-base font-bold leading-[34px] text-foreground">
                  {{ step.title }}
                </h3>
                <p class="max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">
                  {{ step.description }}
                </p>
                <details class="group mt-1.5">
                  <summary
                    class="-ml-1 inline-flex cursor-pointer list-none items-center gap-1.5 rounded px-1 py-0.5 font-mono text-[12.5px] font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden"
                    :class="focusClass"
                  >
                    <span
                      class="underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none"
                      >How it works</span
                    >
                    <span
                      aria-hidden="true"
                      class="inline-block text-[15px] leading-none text-amiw transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      >+</span
                    >
                  </summary>
                  <dl class="mt-2.5 rounded-xl bg-[hsl(var(--alternate-background))] px-4 py-1.5">
                    <div
                      v-for="row in step.details"
                      :key="row.label"
                      class="grid gap-x-4 gap-y-0.5 border-t border-border py-3 first:border-t-0 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
                    >
                      <dt class="pt-px font-mono text-xs font-bold text-foreground">
                        {{ row.label }}
                      </dt>
                      <dd class="text-sm leading-relaxed text-muted-foreground">
                        {{ row.text }}
                        <a
                          v-if="row.link"
                          :href="row.link.href"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="ml-1 whitespace-nowrap font-semibold text-foreground underline decoration-pink decoration-2 underline-offset-4 hover:decoration-primary"
                          >{{ row.link.label }} ↗</a
                        >
                      </dd>
                    </div>
                  </dl>
                </details>
              </li>
            </ol>
          </div>

          <div>
            <h2 class="font-mono text-lg font-bold text-foreground">Good to know</h2>
            <div class="mt-3 border-b border-border" data-reveal-group>
              <details
                v-for="(item, i) in faq"
                :key="item.question"
                data-reveal
                :open="i === 0"
                class="group border-t border-border"
              >
                <summary
                  class="flex cursor-pointer list-none items-center justify-between gap-4 rounded py-4 font-mono text-[15px] font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden"
                  :class="focusClass"
                >
                  {{ item.question }}
                  <span
                    aria-hidden="true"
                    class="text-xl leading-none text-amiw transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    >+</span
                  >
                </summary>
                <p
                  class="max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground"
                  :class="item.links ? 'pb-2' : 'pb-5'"
                >
                  {{ item.answer }}
                </p>
                <ul v-if="item.links" class="flex flex-wrap gap-x-5 gap-y-1 pb-5 text-[15px]">
                  <li v-for="link in item.links" :key="link.label">
                    <a
                      :href="link.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-foreground underline decoration-pink decoration-2 underline-offset-4 hover:decoration-primary"
                      >{{ link.label }} ↗</a
                    >
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full bg-[hsl(var(--alternate-background))] py-12 md:py-14">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="font-mono text-lg font-bold text-foreground">Recent work</h2>
        <ul class="mt-4 grid gap-4 md:grid-cols-3" data-reveal-group>
          <li v-for="project in recentWork" :key="project.slug" data-reveal class="flex">
            <component
              :is="project.details ? NuxtLinkComponent : 'div'"
              v-bind="project.details ? { to: `/projects/${project.slug}` } : {}"
              class="group flex w-full flex-col rounded-xl border border-border bg-background px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--alternate-background))]"
            >
              <span
                class="font-mono text-[15px] font-bold text-foreground"
                :class="
                  project.details
                    ? 'link-grow'
                    : ''
                "
                >{{ project.title }}</span
              >
              <span class="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{{
                project.description
              }}</span>
              <span class="mt-auto pt-3 font-mono text-xs text-muted-foreground">{{
                project.tech.slice(0, 3).join(" · ")
              }}</span>
            </component>
          </li>
        </ul>
        <NuxtLink
          to="/#projects"
          class="group mt-5 inline-flex items-baseline gap-1.5 rounded text-[15px] font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--alternate-background))]"
        >
          <span
            class="underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none"
            >See all projects</span
          >
          <span aria-hidden="true" class="text-amiw">→</span>
        </NuxtLink>
      </div>
    </section>

    <section class="w-full bg-[hsl(var(--blush-band))] py-12 md:py-14">
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6"
      >
        <div>
          <h2 class="font-mono text-xl font-bold text-foreground">Ready to talk?</h2>
          <p class="mt-2 max-w-[52ch] text-base leading-relaxed text-foreground">
            The first call is free. Tell me what you want, any deadline and a rough budget. I
            reply within one working day.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <BookCallDialog>
            <button
              type="button"
              class="btn-outline px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
            >
              Book a call
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </button>
          </BookCallDialog>
          <a
            :href="`mailto:${CONTACT_EMAIL}`"
            class="btn-outline px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
          >
            Email me
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
