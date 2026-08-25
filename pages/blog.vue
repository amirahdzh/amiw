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
            Sharing thoughts, insights, and stories from this little corner
            of the internet.
          </p>
        </div>

        <!-- Author Info -->
        <div
          class="relative overflow-hidden mt-6 rounded-2xl border border-r-4 border-b-4 border-primary bg-secondary p-5"
        >
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-bloom"></div>
          <div class="mt-1">
            <p class="text-lg font-bold text-primary">Amiw Dzh</p>
            <p class="text-sm text-muted-foreground">
              Web Developer & Writer
            </p>
          </div>
        </div>

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
        <div v-if="selectedCategory" class="text-3xl font-bold mb-6">
          {{ selectedCategory }}
        </div>

        <!-- Posts -->
        <ul class="flex flex-col gap-6">
          <li
            v-for="post in filteredPosts"
            :key="post.id"
            v-motion-pop-visible
            class="relative overflow-hidden bg-secondary rounded-2xl p-6 border border-r-4 border-b-4 border-primary transition hover:scale-[1.01] duration-300"
          >
            <div class="absolute top-0 left-0 right-0 h-1.5" :class="post.accentBg"></div>
            <div
              class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mt-1"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-secondary"
                    :class="post.accentBg"
                  >
                    {{ post.badge }}
                  </span>
                  <span class="text-xs text-muted-foreground">
                    {{ blogStore.formatDate(post.pubDate) }}
                  </span>
                </div>
                <a
                  v-if="post.link"
                  :href="post.link"
                  target="_blank"
                  class="text-2xl font-extrabold text-primary hover:text-primary/80"
                >
                  {{ post.title }}
                </a>
                <span v-else class="text-2xl font-extrabold text-primary">
                  {{ post.title }}
                </span>
                <p class="mt-3 text-muted-foreground text-base leading-relaxed">
                  {{ blogStore.getExcerpt(post.description) }}
                </p>
              </div>
              <!-- Thumbnail -->
              <div
                v-if="post.thumbnail"
                class="w-full max-w-lg lg:max-w-[256px] lg:flex-shrink-0"
              >
                <img
                  :src="post.thumbnail"
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
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// Mengambil blogStore
const blogStore = useBlogStore();
const { selectedCategory, allCategories, filteredPosts } =
  storeToRefs(blogStore);

onMounted(() => {
  blogStore.loadPosts();

  // Mengambil kategori yang tersimpan di localStorage
  const storedCategory = localStorage.getItem("selectedCategory");
  if (storedCategory) {
    blogStore.setCategory(storedCategory);
  }
});
</script>
