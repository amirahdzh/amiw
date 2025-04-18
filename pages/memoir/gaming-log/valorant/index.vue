<script setup lang="ts">
const { data: logs } = await useAsyncData("gaming-logs", () =>
  queryContent("/memoir/gaming-log/valorant")
    .only(["_path", "_dir", "title", "description", "cover", "date"])
    .sort({ date: -1 })
    .find()
);
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-20">
    <NuxtLink
      to="/memoir/gaming-log"
      class="text-sm text-primary hover:underline mb-8 block"
    >
      ← Back to Gaming Logs
    </NuxtLink>

    <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">
      Valorant Gaming Logs
    </h1>

    <ul v-if="logs && logs.length" class="space-y-10">
      <li v-for="log in logs" :key="log._path" class="flex space-x-4">
        <div class="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          <!-- Header with Avatar, Name, and Date -->
          <div class="flex items-center gap-4 mb-3">
            <!-- Avatar -->
            <div class="w-14 h-14 rounded-full overflow-hidden">
              <img
                src="/img/maple_circle.png"
                alt="Amiw Avatar"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Name and Date -->
            <div>
              <p class="font-semibold text-gray-800">Amiw</p>
              <p class="text-xs text-gray-400">
                {{ new Date(log.date).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div class="border-t my-4"></div>

          <!-- Content -->
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ log.title }}
          </h2>
          <p class="text-sm text-gray-600 mb-3">{{ log.description }}</p>

          <!-- Cover Image -->
          <img
            v-if="log.cover"
            :src="log.cover"
            alt="Cover Image"
            class="w-full h-80 object-cover rounded-lg mb-4"
          />

          <!-- Button to view full log -->
          <NuxtLink
            :to="log._path"
            class="text-[hsl(var(--pink))] font-bold text-sm hover:underline"
          >
            Read more
          </NuxtLink>
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-gray-400">No gaming logs found.</p>
  </main>
</template>

<style scoped>
/* Hover effect for images */
a:hover img {
  transition: transform 0.3s ease;
  transform: scale(1.02);
}
</style>
