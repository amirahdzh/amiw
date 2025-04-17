<script setup lang="ts">
const { data: logs } = await useAsyncData("gaming-logs", () =>
  queryContent("/memoir/gaming-log/valorant")
    .where({ _path: { $ne: "/memoir/gaming-log/valorant" } })
    .only(["_path", "_dir", "title", "description"])
    .sort({ title: 1 })
    .find()
);
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-20">
    <h1 class="text-3xl font-bold mb-6">Gaming Logs</h1>

    <ul v-if="logs && logs.length" class="space-y-4">
      <li v-for="log in logs" :key="log._path">
        <NuxtLink
          :to="log._path"
          class="block p-4 rounded-lg border hover:shadow transition"
        >
          <p class="text-sm text-indigo-500 font-medium capitalize mb-1">
            {{ log._dir }}
          </p>
          <h2 class="text-xl font-semibold">{{ log.title }}</h2>
          <p class="text-sm text-gray-500">{{ log.description }}</p>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-gray-500">No gaming logs found.</p>
  </main>
</template>
