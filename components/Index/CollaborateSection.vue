<script setup lang="ts">
import { CONTACT_EMAIL, COLLAB_VALUE, topics } from "~/utils/site";

// The homepage section for people who want to work on something together:
// who Amiw is beyond client work (what she cares about, what she writes), and
// an invitation to say hello. Employers and clients are in "Work with me".

// "Latest on the blog": always the newest post in content/blog, so it updates
// itself when posts change.
const { data: posts } = await useBlogPosts();
const latest = computed(() => posts.value[0] ?? null);
const latestMeta = computed(() => {
  if (!latest.value) return "";
  const when = latest.value.draft ? "coming soon" : formatPostDate(latest.value.date);
  // Tags are written like "web-development"; show them as words.
  const tags = (latest.value.tags ?? []).map((tag) => tag.replace(/-/g, " "));
  return [when, ...tags].join(" · ");
});

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
</script>

<template>
  <section id="collaborate" class="w-full border-t border-border bg-background py-16 md:py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div
        class="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-0"
        data-reveal-group
      >
        <div data-reveal class="md:pr-12">
          <p class="eyebrow">Collaborators</p>
          <h2
            class="heading-marker mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Work on something together
          </h2>
          <p class="mt-4 max-w-[44ch] text-base leading-relaxed text-foreground md:text-lg">
            Community, non-profit and open projects. Tell me what you're working on.
          </p>
          <p
            v-if="COLLAB_VALUE"
            class="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground"
          >
            {{ COLLAB_VALUE }}
          </p>
          <a
            :href="`mailto:${CONTACT_EMAIL}`"
            class="btn-outline mt-6 px-6 py-3 text-base focus-visible:ring-offset-background"
          >
            Say hello
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </a>
        </div>

        <div data-reveal class="md:border-l md:border-border md:pl-12">
          <p class="eyebrow">I care about</p>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li
              v-for="topic in topics"
              :key="topic"
              class="rounded-full border border-border bg-[hsl(var(--alternate-background))] px-3.5 py-1.5 text-sm text-foreground"
            >
              {{ topic }}
            </li>
          </ul>

          <template v-if="latest">
            <p class="eyebrow mt-7">Latest on the blog</p>
            <NuxtLink
              :to="latest._path"
              class="group mt-3 block rounded-xl border border-border bg-[hsl(var(--alternate-background))] px-5 py-4"
              :class="focusClass"
            >
              <span class="block text-[17px] font-semibold leading-snug text-foreground">
                <span class="link-grow">{{ latest.title }}</span>
              </span>
              <span class="mt-1 block text-sm text-muted-foreground">{{ latestMeta }}</span>
            </NuxtLink>
          </template>

          <NuxtLink
            to="/newsletter"
            class="group mt-4 inline-flex items-baseline gap-1.5 rounded text-[15px] font-semibold text-foreground"
            :class="focusClass"
          >
            <span
              class="underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none"
              >Get new posts by email</span
            >
            <span
              aria-hidden="true"
              class="text-amiw transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >→</span
            >
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
