<template>
  <section
    class="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20 max-w-5xl mx-auto gap-12"
  >
    <!-- Left Side: Intro -->
    <div class="flex flex-col items-start text-left max-w-lg">
      <span
        class="text-[64px] md:text-[96px] font-semibold text-[hsl(var(--amiw))]"
      >
        Amiw
      </span>
      <h1 class="text-xl font-mono md:text-2xl font-light leading-snug">
        Just a girl who loves learning, writing, and sharing the journey.
      </h1>

      <!-- CTA Buttons -->
      <div class="mt-6 flex gap-6">
        <Button
          v-for="link in socialLinks"
          :key="link.url"
          variant="default"
          as="a"
          :href="link.url"
          target="_blank"
          size="icon"
        >
          <Icon :name="link.icon" class="w-5 h-5" />
        </Button>
      </div>
    </div>

    <!-- Right Side: Random Quote -->
    <div
      class="cursor-pointer transition hover:opacity-80 active:scale-95"
      @click="shuffleQuote"
    >
      <div
        class="p-6 border-l-2 border-[hsl(var(--amiw))] bg-secondary space-y-4"
      >
        <p class="text-xs uppercase tracking-wide font-semibold text-gray-500">
          Book Quotes I Love
        </p>
        <p
          class="italic text-lg leading-relaxed text-gray-700 dark:text-gray-300"
        >
          "{{ currentQuote.text }}"
        </p>
        <p class="text-sm font-semibold text-[hsl(var(--amiw))]">
          — {{ currentQuote.author }}
        </p>
        <div class="pt-2 flex items-center gap-2 text-xs text-gray-500">
          <Icon name="lucide:refresh-cw" class="w-4 h-4" />
          <span>Click to shuffle</span>
        </div>
      </div>
    </div>
  </section>

  <hr class="border-t-2 border-[hsl(var(--amiw))]" />

  <!-- Tech Icons Marquee (Optional) -->
  <!-- <section class="max-w-3xl mx-auto px-6 py-8">
    <div class="w-full text-white text-sm py-2 overflow-hidden rounded-lg">
      <div class="animate-marquee flex w-max">
        <div v-for="index in 2" :key="index" class="flex gap-12 whitespace-nowrap">
          <Icon v-for="tech in techIcons" :key="tech" :name="tech" class="w-16 h-16 text-[hsl(var(--amiw))]" />
          <div class="w-8"></div>
        </div>
      </div>
    </div>
  </section> -->
</template>

<script setup>
import { ref, computed } from "vue";

// Quotes Data
const quotes = ref([
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  {
    text: "It is only with the heart that one can see rightly.",
    author: "Antoine de Saint-Exupéry",
  },
  {
    text: "Happiness can be found even in the darkest of times.",
    author: "J.K. Rowling",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "We accept the love we think we deserve.",
    author: "Stephen Chbosky",
  },
]);

const lastQuoteIndex = ref(0);

// Shuffle Quote Function
const shuffleQuote = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.value.length);
  } while (newIndex === lastQuoteIndex.value); // Prevent repeated quote

  lastQuoteIndex.value = newIndex;
};

// Compute the current quote dynamically
const currentQuote = computed(() => quotes.value[lastQuoteIndex.value]);

// Social Links
const socialLinks = [
  { url: "https://facebook.com/amirahdzh", icon: "fa:facebook" },
  { url: "https://medium.com/amiwdzh", icon: "fa:medium" },
  { url: "https://github.com/amirahdzh", icon: "fa:github" },
];

// Tech Icons (Optional)
const techIcons = [
  "mdi:vuejs",
  "mdi:nodejs",
  "mdi:language-javascript",
  "mdi:nuxt",
];
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  display: flex;
  animation: marquee 10s linear infinite;
}
</style>
