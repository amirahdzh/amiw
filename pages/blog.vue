<template>
  <section
    class="w-full py-24 flex flex-col justify-center bg-secondary border-b-2 border-gray-200"
  >
    <!-- Blog and article section in the same row with ample space -->
    <div
      class="max-w-7xl mx-auto py-10 px-8 flex flex-col md:flex-row gap-12 relative"
    >
      <!-- Blog Header -->
      <div
        class="md:w-1/3 md:sticky top-24 z-10 self-start min-w-[280px] md:min-h-[calc(100vh-4rem)]"
      >
        <div class="text-left space-y-4">
          <h2
            class="text-3xl font-bold text-foreground sm:text-2xl md:text-4xl"
          >
            blog.
          </h2>
          <p
            class="text-muted-foreground text-base leading-relaxed sm:text-sm md:text-base"
          >
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
          class="block mt-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md hover:bg-gray-100"
        >
          <Card class="p-4">
            <div class="flex items-center gap-4">
              <img
                class="w-12 h-12 rounded-full"
                src="/img/maple_circle.png"
                alt="Author Avatar"
              />
              <div>
                <p class="text-lg font-medium text-foreground">Amiw Dzh</p>
                <p class="text-sm text-gray-500">@amiwdzh</p>
              </div>
            </div>
          </Card>
        </NuxtLink>
      </div>

      <!-- Articles Section -->
      <div class="flex-1 md:w-2/3 max-h-[calc(100vh-4rem)] overflow-auto">
        <!-- Filter Category -->
        <div class="flex gap-4 mb-5 justify-center flex-wrap">
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
        </div>

        <hr class="my-8 border-gray-300" />

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
              class="border-b border-gray-200 py-8 flex flex-col gap-4"
            >
              <a :href="post.link" class="w-full">
                <img
                  :src="post.thumbnail"
                  alt="Thumbnail"
                  class="object-cover w-full h-full rounded-lg"
                />
              </a>

              <div class="flex flex-col">
                <a
                  :href="post.link"
                  target="_blank"
                  class="text-2xl font-semibold text-foreground hover:text-[hsl(var(--amiw))] transition-all"
                >
                  {{ post.title }}
                </a>
                <p
                  class="mt-4 text-muted-foreground text-base"
                  v-html="getExcerpt(post.description)"
                ></p>

                <!-- Author and Date -->
                <div class="flex items-center space-x-3 mt-4">
                  <img
                    src="/img/maple_circle.png"
                    alt="Amiw"
                    class="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p>Amiw Dzh</p>
                    <p class="mt-1 text-xs text-gray-400">
                      {{ new Date(post.pubDate).toLocaleDateString() }}
                    </p>
                  </div>
                </div>

                <!-- Categories -->
                <div class="flex gap-3 mt-4 flex-wrap">
                  <span
                    v-for="(category, index) in post.categories"
                    :key="index"
                    class="bg-gray-200 px-4 py-1 rounded-full text-sm text-gray-600"
                  >
                    {{ category }}
                  </span>
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
const MEDIUM_URL = "https://medium.com/@amiwdzh";
const RSS_API_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40amiwdzh";
const DEFAULT_THUMBNAIL = "/img/maple_circle.png";
const ALLOWED_CATEGORIES = [
  "technology",
  "story",
  "poetry",
  "inspiration",
  "islam",
  "how-i-built-my-website", // Add new category
];

// Computed Category Filter
const allCategories = computed<string[]>(() => {
  const categories = new Set<string>();
  posts.value.forEach((post) => {
    post.categories.forEach((category) => {
      if (ALLOWED_CATEGORIES.includes(category)) categories.add(category);
    });
  });
  return ["All", "How I Built My Website", ...Array.from(categories)];
});

// Filtered Posts Based on Category
const filteredPosts = computed<Post[]>(() => {
  if (selectedCategory.value === "All") {
    return posts.value;
  } else if (selectedCategory.value === "How I Built My Website") {
    return posts.value.filter((post) =>
      post.title.startsWith("How I Built My Website")
    );
  } else {
    return posts.value.filter((post) =>
      post.categories.includes(selectedCategory.value)
    );
  }
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
