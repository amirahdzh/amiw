<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <!-- Header -->
    <Header />

    <!-- Content -->
    <main class="flex-grow bg-background">
      <div class="container">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 2rem;
}
</style>
