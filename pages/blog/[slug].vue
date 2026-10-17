<script setup lang="ts">
import { SITE } from "~/utils/site";

const route = useRoute();
const path = `/blog/${String(route.params.slug)}`;

const { data: post } = await useAsyncData(`post-${path}`, async () => {
  const found = await queryContent(path).find();
  return found[0] ?? null;
});

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

// Drafts have a page (so the list can grow into it) but stay out of search
// results until `draft: true` is removed from the file.
const isDraft = !!post.value.draft;

usePageSeo({
  title: `${post.value.title} | Amiw`,
  description: post.value.description,
  noindex: isDraft,
});

if (!isDraft) {
  const config = useRuntimeConfig();
  const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.value.title,
          description: post.value.description,
          datePublished: post.value.date,
          mainEntityOfPage: `${base}${path}`,
          author: { "@id": `${base}/#person` },
        }),
      },
    ],
  });
}
</script>

<template>
  <article v-if="post" class="w-full bg-background pt-8 pb-16 md:pt-10 md:pb-24">
    <div class="mx-auto max-w-3xl px-6">
      <NuxtLink
        to="/blog"
        class="mb-6 inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        <span aria-hidden="true" class="text-amiw">←</span>
        Blog
      </NuxtLink>

      <p class="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <time :datetime="post.date">{{ formatPostDate(post.date) }}</time>
      </p>
      <h1
        class="heading-marker mt-1.5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
      >
        {{ post.title }}
      </h1>
      <p
        v-if="post.tags?.length"
        class="mt-3 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[12.5px] text-muted-foreground"
      >
        <template v-for="(tag, i) in post.tags" :key="tag">
          <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
          <span>{{ tag }}</span>
        </template>
      </p>

      <p
        v-if="isDraft"
        class="mt-6 rounded-[10px] border border-border bg-[hsl(var(--blush-band))] px-4 py-3 text-sm text-foreground"
      >
        This post is still a draft. The full write-up isn't ready yet.
      </p>

      <ContentRenderer
        :value="post"
        class="prose prose-neutral mt-8 max-w-[65ch] prose-headings:font-mono prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:decoration-pink prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-primary prose-code:font-mono prose-code:before:content-none prose-code:after:content-none"
      />
    </div>
  </article>
</template>
