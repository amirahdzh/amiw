<template>
  <div class="w-full">
    <section class="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20">
      <div class="mx-auto max-w-6xl px-6">
        <p class="eyebrow">Blog</p>
        <h1
          class="heading-marker mt-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          Notes from my corner
        </h1>
        <p class="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
          Notes on building this site, debugging at odd hours, and living with less.
        </p>

        <div
          v-if="filterTags.length > 1"
          class="mt-7 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter posts"
        >
          <button
            v-for="tag in ['All', ...filterTags]"
            :key="tag"
            type="button"
            :aria-pressed="selected === tag"
            class="rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            :class="
              selected === tag
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
            "
            @click="selected = tag"
          >
            {{ tag }}
          </button>
        </div>

        <ol v-if="posts.length" class="mt-8 border-b border-border">
          <li
            v-for="post in posts"
            :key="post._path"
            class="grid gap-3 border-t border-border py-6 md:gap-7"
            :class="
              post.image
                ? 'md:grid-cols-[9rem_minmax(0,1fr)_8.5rem]'
                : 'md:grid-cols-[9rem_minmax(0,1fr)]'
            "
          >
            <time
              class="font-mono text-[13.5px] font-bold text-foreground md:pt-1"
              :datetime="post.date"
            >
              {{ formatPostDate(post.date) }}
            </time>

            <div class="min-w-0">
              <h2 class="font-mono text-lg font-bold leading-snug text-foreground">
                <NuxtLink :to="post._path" :class="titleLinkClass">
                  {{ post.title }}
                </NuxtLink>
              </h2>
              <p class="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-foreground">
                {{ post.description }}
              </p>
              <p
                class="mt-2.5 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[12.5px] text-muted-foreground"
              >
                <template v-for="(tag, i) in post.tags ?? []" :key="tag">
                  <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
                  <span>{{ tag }}</span>
                </template>
                <template v-if="post.draft">
                  <span v-if="post.tags?.length" aria-hidden="true" class="text-pink">·</span>
                  <span class="text-amiw">coming soon</span>
                </template>
              </p>
            </div>

            <img
              v-if="post.image"
              :src="post.image"
              alt=""
              loading="lazy"
              class="aspect-[5/3] w-full max-w-[12rem] rounded-[10px] border border-border object-cover md:max-w-none"
            />
          </li>
        </ol>
        <p v-else class="mt-8 border-y border-border py-8 text-muted-foreground">
          Nothing here yet.
        </p>
      </div>
    </section>

    <section class="w-full bg-[hsl(var(--blush-band))] py-12 md:py-14">
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6"
      >
        <div>
          <h2 class="font-mono text-xl font-bold text-foreground">Get new posts by email</h2>
          <p class="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground">
            When I publish something new, you can have it in your inbox.
          </p>
        </div>
        <NuxtLink
          to="/newsletter"
          class="btn-outline px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--blush-band))]"
        >
          Newsletter
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { data: allPosts } = await useBlogPosts();

// A tag is only worth filtering by when it splits the posts: one on every
// post, or on just one post, would not narrow anything down.
const filterTags = computed(() => {
  const total = allPosts.value.length;
  const counts = new Map<string, number>();
  for (const post of allPosts.value) {
    for (const tag of new Set(post.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts].filter(([, n]) => n > 1 && n < total).map(([tag]) => tag);
});

const selected = ref("All");

const posts = computed(() =>
  selected.value === "All"
    ? allPosts.value
    : allPosts.value.filter((p) => p.tags?.includes(selected.value)),
);

usePageSeo({
  title: "Blog | Amiw",
  description:
    "Notes from Amiw on building websites, debugging, slow mornings and living with less.",
});

// Titles get a pink hover underline.
const titleLinkClass =
  "rounded hover:underline hover:decoration-pink hover:decoration-2 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
</script>
