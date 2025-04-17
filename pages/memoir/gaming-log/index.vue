<script setup lang="ts">
const { data: categories } = await useAsyncData("gaming-categories", () =>
  queryContent("/memoir/gaming-log")
    .where({ _dir: { $in: ["valorant", "mobile-legends"] } }) // Filter kategori berdasarkan folder
    .only(["_path", "title", "description", "_dir"])
    .sort({ title: 1 })
    .find()
);
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-6">Choose Your Game</h1>

    <!-- Display categories (Valorant, Mobile Legends) -->
    <ul v-if="categories && categories.length" class="space-y-4">
      <li v-for="category in categories" :key="category._dir">
        <NuxtLink
          :to="category._path"
          class="block p-4 rounded-lg border hover:shadow transition"
        >
          <h2 class="text-xl font-semibold">{{ category.title }}</h2>
          <p class="text-sm text-gray-500">{{ category.description }}</p>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-gray-500">No categories found.</p>
  </main>
</template>
