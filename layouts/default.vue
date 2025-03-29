<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <!-- Header -->
    <Header />

    <!-- Content -->
    <main class="flex-grow p-6">
      <div class="container">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <!-- <footer
      class="w-full py-4 text-center bg-secondary text-secondary-foreground"
    >
      <div class="container">
        <p>&copy; 2025 Amiw. Made with 💖</p>
      </div>
    </footer> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
