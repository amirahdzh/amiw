<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6">
    <!-- Hero Section -->
    <section class="text-center">
      <h1 class="text-4xl font-bold text-primary">Welcome to Amiw's Space</h1>
      <p class="mt-2 text-muted-foreground">
        A personal space to showcase my work, thoughts, and more.
      </p>
    </section>

    <!-- Card Example -->
    <div class="mt-6 w-full max-w-md p-6 bg-card shadow-md rounded-lg">
      <h2 class="text-xl font-semibold text-card-foreground">
        About This Site
      </h2>
      <p class="mt-2 text-muted-foreground">
        This website is built with Nuxt 3, Tailwind CSS, and ShadCN Vue.
      </p>
    </div>

    <!-- Button Example -->
    <button
      class="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-opacity-90 transition"
    >
      Explore More
    </button>
  </div>
</template>
