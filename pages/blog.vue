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
          Thoughts, insights and stories from my little corner of the internet.
        </p>

        <div class="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter posts">
          <button
            v-for="category in allCategories"
            :key="category"
            type="button"
            :aria-pressed="selectedCategory === category"
            class="rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            :class="
              selectedCategory === category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
            "
            @click="blogStore.setCategory(category)"
          >
            {{ category }}
          </button>
        </div>

        <ol v-if="posts.length" class="mt-8 border-b border-border">
          <li
            v-for="post in posts"
            :key="post.id"
            class="grid gap-3 border-t border-border py-6 md:grid-cols-[9rem_minmax(0,1fr)_8.5rem] md:items-start md:gap-7"
          >
            <time
              class="font-mono text-[13.5px] font-bold text-foreground md:pt-1"
              :datetime="post.pubDate"
            >
              {{ blogStore.formatDate(post.pubDate) }}
            </time>

            <div class="min-w-0">
              <h2 class="font-mono text-lg font-bold leading-snug text-foreground">
                <a
                  v-if="post.link"
                  :href="post.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="titleLinkClass"
                >
                  {{ post.title }}
                </a>
                <template v-else>{{ post.title }}</template>
              </h2>
              <p class="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-foreground">
                {{ blogStore.getExcerpt(post.description) }}
              </p>
              <p
                class="mt-2.5 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[12.5px] text-muted-foreground"
              >
                <template v-for="(tag, i) in post.categories" :key="tag">
                  <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
                  <span>{{ tag }}</span>
                </template>
              </p>
            </div>

            <img
              v-if="post.thumbnail"
              :src="post.thumbnail"
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
import { storeToRefs } from "pinia";

const blogStore = useBlogStore();
const { selectedCategory, allCategories, filteredPosts } =
  storeToRefs(blogStore);

// Loaded during setup, not in onMounted, so the posts are in the HTML the
// server sends (that is what search engines read).
if (!blogStore.posts.length) blogStore.loadPosts();

// Newest first, whatever order the store keeps them in.
const posts = computed(() =>
  [...filteredPosts.value].sort((a, b) => b.pubDate.localeCompare(a.pubDate)),
);

// Outside onMounted on purpose: the title and description have to be in the
// HTML the server sends, not added later in the browser.
usePageSeo({
  title: "Blog | Amiw",
  description:
    "Sharing thoughts, insights and stories from Amiw's corner of the internet.",
});

onMounted(() => {
  // Restore the category the reader chose last time.
  const storedCategory = localStorage.getItem("selectedCategory");
  if (storedCategory) {
    blogStore.setCategory(storedCategory);
  }
});

// Only titles that link somewhere get a hover underline.
const titleLinkClass =
  "rounded hover:underline hover:decoration-pink hover:decoration-2 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
</script>
