<script setup lang="ts">
import { CONTACT_EMAIL } from "~/utils/site";

usePageSeo({
  title: "Newsletter | Amiw",
  description:
    "Get new posts from Amiw by email: writing, productivity, frugal living, minimalism and sustainability.",
});

// Same list as "Passionate in" on the homepage.
const topics = ["writing", "productivity", "frugal", "minimalism", "sustainability"];

const linkClass =
  "group rounded font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";
const underlineClass =
  "underline decoration-pink decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary motion-reduce:transition-none";
</script>

<template>
  <div class="w-full">
    <section class="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20">
      <div class="mx-auto max-w-6xl px-6">
        <p class="eyebrow">Newsletter</p>
        <h1
          class="heading-marker mt-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          New posts, by email.
        </h1>
        <p class="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
          I write about the things below. When there's a new post, you can get it in your
          inbox instead of checking back.
        </p>

        <p
          class="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[13px] text-muted-foreground md:text-sm"
        >
          <template v-for="(topic, i) in topics" :key="topic">
            <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
            <span>{{ topic }}</span>
          </template>
        </p>

        <NewsletterForm id="newsletter-page-email" class="mt-8 max-w-[28rem]">
          <template #disabled>
            <p class="mt-3 text-sm text-muted-foreground">
              Opening soon. Until then, everything I've written is on the
              <NuxtLink to="/blog" :class="linkClass">
                <span :class="underlineClass">blog</span>
                <span
                  aria-hidden="true"
                  class="ml-1 inline-block text-amiw transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  >→</span
                >
              </NuxtLink>
            </p>
          </template>
        </NewsletterForm>
      </div>
    </section>

    <section class="w-full bg-[hsl(var(--blush-band))] py-12 md:py-14">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="font-mono text-xl font-bold text-foreground">Prefer to say hello?</h2>
        <p class="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground">
          A newsletter is one-way. If you'd rather talk, send me an email.
        </p>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="btn-outline mt-5 px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
        >
          Say hello
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
      </div>
    </section>
  </div>
</template>
