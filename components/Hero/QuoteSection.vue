<template>
  <Motion
    :initial="{ opacity: 0, scale: 0.9 }"
    :enter="{ opacity: 1, scale: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
    class="cursor-pointer transition hover:opacity-80 hover: active:scale-95"
    @click="shuffleQuote"
  >
    <div
      class="p-6 max-w-md md:mt-0 mt-12 border border-l-8 border-[hsl(var(--amiw))] bg-secondary space-y-4"
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
  </Motion>
</template>

<script setup>
import { ref, computed } from "vue";

// Quotes Data
const quotes = ref([
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  {
    text: "It is only with the heart that one can see rightly. ",
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
  } while (newIndex === lastQuoteIndex.value);

  lastQuoteIndex.value = newIndex;
};

// Compute the current quote dynamically
const currentQuote = computed(() => quotes.value[lastQuoteIndex.value]);
</script>
