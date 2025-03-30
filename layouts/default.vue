<template>
  <div class="min-h-screen flex flex-col text-foreground">
    <!-- Header -->
    <Header />

    <!-- Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
