<script setup lang="ts">
import { projects } from "~/utils/projects";
</script>

<template>
  <section id="projects" class="w-full py-16 md:py-20 bg-background">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="heading-marker text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Projects
      </h2>
      <p class="mt-2 text-base text-muted-foreground">Things I've built.</p>

      <ul class="mt-9 border-b border-border" data-reveal-group>
        <li v-for="project in projects" :key="project.title" data-reveal class="border-t border-border">
          <IndexProjectRow :project="project" />
        </li>
      </ul>
    </div>
  </section>
</template>
