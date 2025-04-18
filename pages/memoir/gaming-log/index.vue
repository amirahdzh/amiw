<script setup lang="ts">
// Tidak perlu mengambil data dari Nuxt Content jika memilih hardcode
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold text-center mb-10 text-[hsl(var(--pink))]">
      Amiw's Gaming Logs
    </h1>

    <!-- Display Hardcoded Categories (Only Cover Images) -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Valorant -->
      <li>
        <NuxtLink
          to="/memoir/gaming-log/valorant"
          class="block overflow-hidden rounded-xl border-2 border-gray-200 hover:border-indigo-600 transition-all duration-300 group"
        >
          <img
            src="/img/gaming-log/valorant.webp"
            alt="Valorant"
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </NuxtLink>
      </li>

      <!-- Mobile Legends -->
      <li>
        <NuxtLink
          to="/memoir/gaming-log/mobile-legends"
          class="block overflow-hidden rounded-xl border-2 border-gray-200 hover:border-indigo-600 transition-all duration-300 group"
        >
          <img
            src="/img/gaming-log/ml.webp"
            alt="Mobile Legends"
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </NuxtLink>
      </li>
      <!-- Dota 2 -->
      <li>
        <NuxtLink
          to="/memoir/gaming-log/valorant"
          class="block overflow-hidden rounded-xl border-2 border-gray-200 hover:border-indigo-600 transition-all duration-300 group"
        >
          <img
            src="/img/gaming-log/dota2.webp"
            alt="Dota 2"
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.group:hover img {
  transform: scale(1.05);
}
</style>
