<script setup lang="ts">
import { ref } from "vue";

const quotes = [
  "Simplicity is the soul of efficiency.",
  "Stay hungry, stay foolish.",
  "Be present, fully engage.",
  "Code is poetry.",
];

const currentQuote = ref("");
const generateQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote.value = quotes[randomIndex];
};

const currentColor = ref("#F472B6");
const generateColor = () => {
  const colors = ["#F472B6", "#60A5FA", "#34D399", "#FBBF24"];
  currentColor.value = colors[Math.floor(Math.random() * colors.length)];
};

const feeling = ref("");
</script>

<template>
  <section id="playground" class="py-20 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-4 text-foreground">🎠 Playground</h2>
      <p class="text-muted-foreground mb-10">
        Eksperimen & nikmati hal random di halaman ini ✨
      </p>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- 🎯 Quote Generator -->
        <div class="border p-5 rounded-xl bg-background shadow-sm">
          <h3 class="font-semibold text-foreground mb-2">📝 Quote Generator</h3>
          <p class="text-muted-foreground mb-4">
            Klik untuk mendapatkan inspirasi random.
          </p>
          <button
            @click="generateQuote"
            class="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600"
          >
            Get Quote
          </button>
          <p v-if="currentQuote" class="mt-4 italic text-foreground">
            "{{ currentQuote }}"
          </p>
        </div>

        <!-- 🎨 Blob Color Generator -->
        <div class="border p-5 rounded-xl bg-background shadow-sm">
          <h3 class="font-semibold text-foreground mb-2">🎨 Color Blob</h3>
          <p class="text-muted-foreground mb-4">
            Klik tombol untuk ganti warna blob SVG.
          </p>
          <button
            @click="generateColor"
            class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Change Blob
          </button>
          <svg
            :fill="currentColor"
            viewBox="0 0 200 200"
            class="mt-4 w-32 h-32 transition-all duration-300"
          >
            <path
              d="M41.1,-66.7C52.4,-59.5,61.4,-52.4,67.3,-42.4C73.3,-32.3,76.1,-19.2,75.2,-6.9C74.3,5.4,69.7,16.9,63.4,27.1C57.2,37.2,49.2,46,39.3,54.3C29.4,62.6,17.6,70.5,3.8,72.2C-10.1,74,-20.2,69.6,-30.1,63.2C-40,56.8,-49.7,48.4,-56.3,38.2C-62.8,27.9,-66.1,15.9,-67.3,3.2C-68.5,-9.5,-67.6,-22.9,-61.2,-33.6C-54.8,-44.2,-42.9,-52.1,-31,-58.5C-19.1,-64.9,-7.1,-69.7,4.7,-76.2C16.5,-82.7,32.9,-91.6,41.1,-66.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <!-- ✍️ Mood Writer -->
        <div
          class="border p-5 rounded-xl bg-background shadow-sm md:col-span-2"
        >
          <h3 class="font-semibold text-foreground mb-2">✍️ Mood Writer</h3>
          <p class="text-muted-foreground mb-4">
            Apa yang kamu rasakan hari ini?
          </p>
          <input
            v-model="feeling"
            placeholder="Tulis di sini..."
            class="w-full px-4 py-2 border rounded bg-muted text-foreground"
          />
          <p
            v-if="feeling"
            class="mt-4 text-2xl font-bold text-center text-[hsl(var(--pink))]"
          >
            {{ feeling }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
