<template>
  <Html>
    <div class="min-h-screen flex flex-col text-foreground">
      <!-- Header and footer are hidden on /links: it's a standalone
           link-in-bio page (pages/links/index.vue) -->
      <Header v-if="route.path !== '/links'" />
      <StickyNav v-if="route.path !== '/links'" />

      <!-- Content -->
      <main class="flex-grow">
        <NuxtPage />
      </main>

      <Footer v-if="route.path !== '/links'" />
    </div>
  </Html>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
