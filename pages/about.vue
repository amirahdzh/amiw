<template>
  <section class="w-full py-16 bg-background">
    <div class="max-w-4xl mx-auto px-6 md:px-12">
      <!-- Hero Section -->
      <Motion
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="text-center mb-12"
      >
        <h1 class="text-4xl font-bold text-foreground">About Me</h1>
        <p class="text-muted-foreground mt-2 text-lg">
          Full-stack developer, writer, and lifelong learner.
        </p>
      </Motion>

      <!-- Education -->
      <Motion
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :visible="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="mb-10"
      >
        <h2 class="text-2xl font-semibold text-primary">Education 🎓</h2>
        <p class="text-muted-foreground mt-2">
          S1 Teknik Informatika - Universitas XYZ (2024)
        </p>
      </Motion>

      <!-- Experience -->
      <Motion
        v-motion
        :initial="{ opacity: 0, x: 30 }"
        :visible="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
        class="mb-10"
      >
        <h2 class="text-2xl font-semibold text-primary">Work Experience 💼</h2>
        <div class="mt-3 space-y-4">
          <div class="p-4 bg-secondary rounded-lg shadow-sm">
            <h3 class="text-lg font-medium">Laravel Developer (Freelance)</h3>
            <p class="text-muted-foreground text-sm">
              PT Sanbersy, Bandung (2025 - Now)
            </p>
          </div>
          <div class="p-4 bg-secondary rounded-lg shadow-sm">
            <h3 class="text-lg font-medium">Frontend Developer (Vue.js)</h3>
            <p class="text-muted-foreground text-sm">[Company Name] (2025)</p>
          </div>
        </div>
      </Motion>

      <!-- Random Facts -->
      <Motion
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.4 }"
        class="mb-10"
      >
        <h2 class="text-2xl font-semibold text-primary">Random Facts 🎲</h2>
        <ul class="mt-3 list-disc list-inside text-muted-foreground space-y-1">
          <li>📚 Suka baca buku tentang tech, self-growth, dan filsafat.</li>
          <li>🎮 Main Valorant tiap malam (Rank: [isi rank-mu]).</li>
          <li>🏡 Punya impian untuk homesteading di usia 30-an.</li>
          <li>📝 Suka nulis di Medium & bikin puisi.</li>
        </ul>
      </Motion>

      <!-- Skills -->
      <Motion
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :visible="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.6 }"
        class="mb-10"
      >
        <h2 class="text-2xl font-semibold text-primary">Skills 🛠️</h2>
        <div class="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <span class="px-3 py-1 bg-secondary rounded-lg">JavaScript</span>
          <span class="px-3 py-1 bg-secondary rounded-lg">Vue.js / Nuxt</span>
          <span class="px-3 py-1 bg-secondary rounded-lg">TailwindCSS</span>
          <span class="px-3 py-1 bg-secondary rounded-lg">Laravel</span>
          <span class="px-3 py-1 bg-secondary rounded-lg">Node.js</span>
          <span class="px-3 py-1 bg-secondary rounded-lg">Docker</span>
        </div>
      </Motion>

      <!-- CTA to Blog / Story -->
      <Motion
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.8 }"
        class="text-center mt-12"
      >
        <p class="text-lg">Want to dive deeper into my journey?</p>
        <NuxtLink
          to="/blog"
          class="mt-3 inline-flex items-center gap-2 px-5 py-2.5 text-primary border border-primary rounded-lg hover:bg-primary hover:text-background transition-all"
        >
          Read My Story
        </NuxtLink>
      </Motion>
    </div>
  </section>
</template>

<script setup lang="ts">
//   import { Motion } from "@vueuse/motion";
</script>
