<script setup lang="ts">
const route = useRoute();
const currentPath = route.path;

const { data: logs } = await useAsyncData("gaming-logs", () =>
  queryContent("/memoir/gaming-log/valorant")
    .where({ _path: { $ne: currentPath } })
    .only(["_path", "title", "description", "cover"])
    .sort({ date: -1 })
    .find()
);
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-16">
    <NuxtLink
      to="/memoir/gaming-log/valorant"
      class="inline-flex items-center gap-1 mb-8 text-sm text-indigo-500 hover:underline"
    >
      ← Back to Valorant Logs
    </NuxtLink>

    <ContentDoc v-slot="{ doc }">
      <article class="prose prose-neutral dark:prose-invert max-w-none">
        <img
          v-if="doc.cover"
          :src="doc.cover"
          alt="Cover Image"
          class="w-full mb-6 rounded-lg shadow"
        />
        <h1 class="mb-2">{{ doc.title }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ doc.date }}</p>

        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <section v-if="logs?.length" class="mt-16">
      <h2 class="text-xl font-semibold mb-6 border-b pb-2">
        🎮 More Valorant Logs
      </h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <NuxtLink
          v-for="log in logs"
          :key="log._path"
          :to="log._path"
          class="block border rounded-lg overflow-hidden hover:shadow-lg transition group"
        >
          <img
            v-if="log.cover"
            :src="log.cover"
            alt="Cover"
            class="h-32 w-full object-cover"
          />
          <div class="p-4 bg-white dark:bg-neutral-900">
            <h3
              class="font-semibold text-lg group-hover:text-indigo-600 transition"
            >
              {{ log.title }}
            </h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ log.description || "No description available." }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
