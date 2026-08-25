<template>
  <Html>
    <div class="min-h-screen flex flex-col text-foreground">
      <!-- Header (hidden on /links — it's a standalone link-in-bio page) -->
      <Header v-if="route.path !== '/links'" />

      <!-- Content -->
      <main class="flex-grow">
        <NuxtPage />
      </main>

      <Footer /></div
  ></Html>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
