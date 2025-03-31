<template>
  <section class="w-full flex flex-col justify-center relative">
    <div class="absolute inset-0 flex">
      <div class="w-1/2 bg-secondary"></div>
      <div class="w-1/2 bg-background"></div>
    </div>

    <!-- Blog and article section in the same row with ample space -->
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row relative bg-secondary"
    >
      <!-- Blog Header -->
      <div
        class="md:w-1/3 md:sticky pt-28 top-0 z-10 self-start md:max-w-[350px] md:min-w-[350px] px-8"
      >
        <div class="text-left space-y-4">
          <h2 class="text-5xl font-bold text-foreground">blog.</h2>
          <p class="text-muted-foreground text-base leading-relaxed">
            Sharing thoughts, insights, and stories. Let's connect on
            <a
              href="https://www.medium.com/@amiwdzh"
              target="_blank"
              class="text-[hsl(var(--pink))] font-medium hover:underline transition-colors"
            >
              Medium.
            </a>
          </p>
        </div>

        <!-- Author Info -->
        <NuxtLink
          to="https://medium.com/@amiwdzh"
          target="_blank"
          class="block mt-6 rounded-xl transition-all"
        >
          <Card class="px-6 py-4 bg-primary">
            <div class="flex items-center justify-between">
              <div class="flex gap-4">
                <img
                  class="w-12 h-12 rounded-full"
                  src="/img/maple_circle.png"
                  alt="Author Avatar"
                />
                <div>
                  <p class="text-lg font-medium text-secondary">Amiw Dzh</p>
                  <p class="text-sm text-secondary/80">@amiwdzh</p>
                </div>
              </div>
              <Icon name="fa:medium" class="text-secondary w-7 h-7" />
            </div>
          </Card>
        </NuxtLink>

        <!-- Filter Category -->
        <div class="flex flex-wrap mb-8 mt-8">
          <!-- Dropdown for small screens -->
          <div class="md:hidden w-full">
            <div class="mb-2">Read My Series:</div>

            <select
              v-model="selectedCategory"
              class="w-full px-6 py-3 text-base rounded-md bg-accent"
            >
              <option
                v-for="category in allCategories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Text items for larger screens -->
          <div class="hidden md:flex flex-col gap-2">
            Read My Series:
            <div
              v-for="category in allCategories"
              :key="category"
              :class="[
                'px-3 text-base cursor-pointer',
                selectedCategory === category
                  ? 'text-foreground hover:text-[hsl(var(--pink))] font-semibold'
                  : 'text-muted-foreground hover:text-[hsl(var(--pink))]',
              ]"
              @click="handleCategoryClick(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <!-- Articles Section -->
      <div
        class="flex-1 md:w-2/3 bg-background md:py-24 border-t-4 px-8 md:border-t-0 md:border-l-4 border-border"
      >
        <!-- Filter Category -->
        <!-- <div class="flex gap-4 mb-5 justify-center flex-wrap">
          <Button
            v-for="category in allCategories"
            :key="category"
            :class="[
              'px-6 py-3 text-base font-semibold rounded-full cursor-pointer',
              selectedCategory === category
                ? 'bg-pink-500 text-white hover:bg-primary'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
            ]"
            @click="handleCategoryClick(category)"
          >
            {{ category }}
          </Button>
        </div> -->

        <!-- <hr class="border-gray-300" /> -->

        <!-- Error or Loading States -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
          {{ error }}
        </div>
        <div v-else-if="isLoading" class="flex justify-center gap-3">
          <div
            v-for="n in 3"
            :key="n"
            class="w-full h-36 bg-gray-200 rounded-lg"
          ></div>
        </div>

        <!-- Display Posts -->
        <div v-else>
          <ul>
            <li
              v-for="post in filteredPosts"
              :key="post.link"
              class="border-b border-primary py-8 flex flex-col gap-4"
            >
              <div
                class="flex flex-col lg:flex-row md:items-center md:justify-between gap-6 md:gap-12"
              >
                <!-- Artikel Info -->
                <div class="flex-1">
                  <a
                    :href="post.link"
                    target="_blank"
                    class="text-2xl font-semibold text-primary hover:text-[hsl(var(--amiw))] transition-all"
                  >
                    {{ decodeHTMLEntities(post.title) }}
                  </a>
                  <p
                    class="mt-4 text-foreground text-base"
                    v-html="getExcerpt(post.description)"
                  ></p>
                  <p class="mt-4 text-xs text-muted-foreground">
                    {{ formatDate(post.pubDate) }}
                  </p>
                </div>

                <!-- Thumbnail -->
                <div class="w-full max-w-lg lg:max-w-[256px] lg:flex-shrink-0">
                  <img
                    :src="post.thumbnail"
                    alt="Thumbnail"
                    class="w-full h-auto aspect-[5/3] object-cover rounded-lg"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

// Interfaces
interface Post {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
}

// Refs and Constants
const posts = ref<Post[]>([]);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(true);
const selectedCategory = ref<string>("All");
// const MEDIUM_URL = "https://medium.com/@amiwdzh";
const RSS_API_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40amiwdzh";
const DEFAULT_THUMBNAIL = "/img/maple_circle.png";
const ALLOWED_CATEGORIES = [
  "", // Add new category
];

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Decode HTML entities
const decodeHTMLEntities = (text: string): string => {
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/html").body.textContent || "";
};

// Computed Category Filter
const allCategories = computed<string[]>(() => {
  const categories = new Set<string>();
  // posts.value.forEach((post) => {
  //   post.categories.forEach((category) => {
  //     if (ALLOWED_CATEGORIES.includes(category)) categories.add(category);
  //   });
  // });
  return [
    "All",
    "How I Built My Website",
    "Contemplating",
    "Web Development",
    ...Array.from(categories),
  ];
});

// Filtered Posts Based on Category
const filteredPosts = computed<Post[]>(() => {
  console.log("Selected Category:", selectedCategory.value);

  const allPosts = posts.value || [];

  if (selectedCategory.value === "All") {
    return allPosts;
  } else if (selectedCategory.value === "How I Built My Website") {
    return allPosts.filter((post) =>
      post.title.startsWith("How I Built My Website")
    );
  } else if (selectedCategory.value === "Contemplating") {
    const result = allPosts.filter(
      (post) =>
        !post.title.startsWith("How I Built My Website") &&
        !post.categories.includes("technology")
    );
    console.log("Filtered Posts:", result);
    return result;
  } else if (selectedCategory.value === "Web Development") {
    return allPosts.filter((post) =>
      post.categories.includes("web-development")
    );
  }

  return [];
});

// Get Excerpt (Remove HTML and Trim Text)
const getExcerpt = (text: string): string => {
  const clean = text.replace(/<[^>]+>/g, "");
  return clean.length > 100 ? clean.slice(0, 100) + "..." : clean;
};

// Handle Category Click
const handleCategoryClick = (category: string): void => {
  selectedCategory.value = category;
};

// Fetch Posts from RSS Feed
onMounted(async () => {
  try {
    const response = await fetch(RSS_API_URL);
    const data = await response.json();
    if (data.status === "ok") {
      posts.value = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        description: item.content,
        pubDate: item.pubDate,
        categories: item.categories,
        thumbnail: getMediumImage(item.content) || DEFAULT_THUMBNAIL,
      }));
    }
  } catch (e) {
    error.value = "Failed to load posts";
  } finally {
    isLoading.value = false;
  }
});

// Extract Image from Description (HTML Content)
const getMediumImage = (description: string): string => {
  if (!description) return DEFAULT_THUMBNAIL;
  const imageMatch = description.match(/<img.*?src=["'](.*?)["']/);
  return imageMatch ? imageMatch[1] : DEFAULT_THUMBNAIL;
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
