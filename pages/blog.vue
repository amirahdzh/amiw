<template>
  <section class="w-full flex flex-col justify-center relative">
    <div class="absolute inset-0 flex">
      <div class="w-1/2 bg-[hsl(var(--alternate-background))]"></div>
      <div class="w-1/2 bg-background"></div>
    </div>

    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row relative bg-[hsl(var(--alternate-background))]"
    >
      <!-- Sidebar -->
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
              class="text-[hsl(var(--pink))] font-medium hover:underline"
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
                  src="/img/maple.png"
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

        <!-- Category Selection -->
        <div class="flex flex-wrap mb-8 mt-8">
          <div class="md:hidden w-full">
            <div class="mb-2">Read My Articles:</div>
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

          <div class="hidden md:flex flex-col gap-2">
            Read My Articles:
            <div
              v-for="category in allCategories"
              :key="category"
              :class="[
                'px-3 text-base cursor-pointer',
                selectedCategory === category
                  ? 'text-foreground hover:text-[hsl(var(--pink))] font-semibold'
                  : 'text-muted-foreground hover:text-[hsl(var(--pink))]',
              ]"
              @click="blogStore.setCategory(category)"
              v-motion-fade
            >
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div
        class="flex-1 py-8 md:w-2/3 bg-background md:py-28 border-t-4 px-8 md:border-t-0 md:border-l-2 border-primary"
      >
        <!-- Display selected category -->
        <div
          v-if="selectedCategory"
          class="text-2xl lg:text-3xl font-semibold mb-2"
        >
          {{ selectedCategory }}
        </div>

        <!-- Posts or Loading/Error -->
        <hr class="border-t border-primary" />
        <div v-if="error" class="text-center text-red-500 font-semibold">
          {{ error }}
        </div>
        <div v-else-if="isLoading" class="flex justify-center gap-3">
          Loading post... Click
          <a href="https://www.medium.com/@amiwdzh">here</a> to open post on
          Medium.
        </div>

        <div v-else>
          <ul>
            <li
              v-for="post in filteredPosts"
              :key="post.link"
              class="border-b border-primary py-8 flex flex-col gap-4"
              v-motion-pop-visible
            >
              <div
                class="flex flex-col lg:flex-row md:items-center md:justify-between gap-6 md:gap-12"
              >
                <div class="flex-1">
                  <a
                    :href="post.link"
                    target="_blank"
                    class="text-2xl font-semibold text-primary hover:text-primary/80"
                  >
                    {{ blogStore.decodeHTMLEntities(post.title) }}
                  </a>
                  <p
                    class="mt-4 text-foreground text-base"
                    v-html="blogStore.getExcerpt(post.description)"
                  ></p>
                  <p class="mt-4 text-xs text-muted-foreground">
                    {{ blogStore.formatDate(post.pubDate) }}
                  </p>
                </div>
                <!-- Thumbnail -->
                <div class="w-full max-w-lg lg:max-w-[256px] lg:flex-shrink-0">
                  <img
                    :src="post.thumbnail || DEFAULT_THUMBNAIL"
                    alt="Thumbnail"
                    class="w-full h-auto aspect-[5/3] object-cover rounded-lg"
                    v-motion-fade
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
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// Mengambil blogStore
const blogStore = useBlogStore();
const { error, isLoading, selectedCategory, allCategories, filteredPosts } =
  storeToRefs(blogStore);

onMounted(() => {
  blogStore.fetchPosts();

  // Mengambil kategori yang tersimpan di localStorage
  const storedCategory = localStorage.getItem("selectedCategory");
  if (storedCategory) {
    blogStore.setCategory(storedCategory);
  }
});

const DEFAULT_THUMBNAIL = "/img/maple.png";
</script>
