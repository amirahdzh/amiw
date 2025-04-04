<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const baseURL = config.public.baseURL || "";

console.log("Base URL:", baseURL); // Debugging

const imgLoaded = ref(false);
const quickThought = ref("");
const randomWhisper = ref("");

onMounted(() => {
  imgLoaded.value = true;
  generateRandomWhisper();
});

// Featured Writing Example
const featuredWriting = {
  title: "A Reflection on Time",
  excerpt:
    "We often chase after the future, forgetting that the present is all we have...",
  link: "/memoir/a-reflection-on-time",
};

// Random facts about Amiw
const randomFacts = [
  "🎮 Gamer by night, coder by day – Valorant mainstay.",
  "📖 Buku favorit: (isi buku favoritmu).",
  "☕ Suka kopi? Jawabannya tergantung hari.",
  "🌎 Mimpi besar? Remote work sambil homesteading.",
  "🚀 Superpower? Bisa debug error yang susah, tapi lupa titik koma.",
];

// Skills
const skills = [
  "JavaScript (Node.js, Vue.js, Nuxt.js, Express.js)",
  "PHP (Laravel)",
  "Golang (masih eksplor)",
  "MySQL, MongoDB, PostgreSQL",
  "Docker, Git, CI/CD",
];

// Daily Amiw's Whisper
const whispers = [
  "Keep pushing forward, the journey is worth it!",
  "Code is poetry, and poetry is life.",
  "Even a single bug can teach a thousand lessons.",
  "Take a break, your brain deserves it too.",
  "Write something today, even if it’s just a thought.",
];

const generateRandomWhisper = () => {
  randomWhisper.value = whispers[Math.floor(Math.random() * whispers.length)];
};
</script>

<template>
  <section class="w-full py-24 bg-background border-b-4 border-border">
    <div class="max-w-6xl mx-auto px-6">
      <!-- 🎭 Random Facts -->
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-primary">🎭 Random Facts</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="(fact, index) in randomFacts" :key="index">
            {{ fact }}
          </li>
        </ul>
      </div>

      <!-- 🛠️ Skills -->
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-primary">
          🛠️ Skills & Tech Stack
        </h3>
        <ul class="mt-2 space-y-2">
          <li v-for="(skill, index) in skills" :key="index">✅ {{ skill }}</li>
        </ul>
      </div>

      <!-- 🎨 Creative Playground -->
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-primary">
          🌟 Daily Amiw's Whisper
        </h3>
        <p class="mt-2 italic text-gray-700 dark:text-gray-300">
          "{{ randomWhisper }}"
        </p>
      </div>

      <!-- 📜 Featured Writing -->
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-primary">📜 Featured Writing</h3>
        <div class="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="text-lg font-bold">{{ featuredWriting.title }}</h4>
          <p class="text-sm mt-1">{{ featuredWriting.excerpt }}</p>
          <a
            :href="featuredWriting.link"
            class="text-sm text-blue-500 hover:underline mt-2 inline-block"
          >
            Read more →
          </a>
        </div>
      </div>

      <!-- ✨ Quick Thought Input -->
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-primary">📝 Quick Thought</h3>
        <textarea
          v-model="quickThought"
          placeholder="Write a thought, an idea, or a random note..."
          class="w-full p-3 border rounded-lg mt-2 text-black"
        ></textarea>
      </div>
    </div>
  </section>
</template>
