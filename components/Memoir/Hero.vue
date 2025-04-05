<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { ref, onMounted, onBeforeUnmount } from "vue";

const config = useRuntimeConfig();
const baseURL = config.public.baseURL || "";

const showBubble = ref(false);
const quotes = [
  "Keep pushing forward, the journey is worth it!",
  "Code is poetry, and poetry is life.",
  "Even a single bug can teach a thousand lessons.",
  "Take a break, your brain deserves it too.",
  "Write something today, even if it's just a thought.",
];

const randomQuote = useState(
  "randomQuote",
  () => quotes[Math.floor(Math.random() * quotes.length)]
);

// ✨ Smooth typewriter logic
const slogans = ["CHAPTER", "PAGE", "DIARY", "JOURNEY"];

const sloganIndex = ref(0);
const currentText = ref("");
const isDeleting = ref(false);
let typewriterTimeout: ReturnType<typeof setTimeout>;

const typeSpeed = 100;
const deleteSpeed = 60;
const pauseAfterTyped = 1200;
const pauseBeforeTyping = 300;

const typeWriter = async () => {
  const fullText = slogans[sloganIndex.value];

  if (isDeleting.value) {
    currentText.value = fullText.slice(0, currentText.value.length - 1);
  } else {
    currentText.value = fullText.slice(0, currentText.value.length + 1);
  }

  let delay = isDeleting.value ? deleteSpeed : typeSpeed;

  // Full word typed
  if (!isDeleting.value && currentText.value === fullText) {
    delay = pauseAfterTyped;
    isDeleting.value = true;
  }

  // Word deleted
  else if (isDeleting.value && currentText.value === "") {
    isDeleting.value = false;
    sloganIndex.value = (sloganIndex.value + 1) % slogans.length;
    delay = pauseBeforeTyping;
  }

  typewriterTimeout = setTimeout(typeWriter, delay);
};

onMounted(() => {
  typeWriter();
});

onBeforeUnmount(() => {
  clearTimeout(typewriterTimeout);
});
</script>

<template>
  <section
    class="w-full py-24 bg-[hsl(var(--alternate-background))] border-b-4 border-border"
  >
    <div
      class="max-w-5xl mx-auto px-8 pt-10 flex flex-col lg:flex-row justify-center items-center gap-12"
    >
      <!-- 🎨 Illustration -->
      <client-only>
        <div class="relative flex-shrink-0 mt-6 md:mt-0">
          <img
            :src="`${baseURL}/img/angel_maple.jpg`"
            alt="Amiw Illustration"
            class="w-44 h-44 md:w-64 md:h-64 lg:w-72 lg:h-72 border rounded-full object-cover aspect-square"
            @error="console.error('Failed to load image!')"
          />

          <!-- 💬 Thought Bubble Trigger -->
          <div
            class="absolute top-4 right-0 md:top-6 md:right-8 p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110 bg-white cursor-pointer"
            @mouseenter="showBubble = true"
            @mouseleave="showBubble = false"
          >
            💬
          </div>

          <!-- 💭 Thought Bubble -->
          <transition name="fade">
            <div
              v-if="showBubble"
              class="absolute -top-9 right-0 md:-top-8 bg-white text-gray-800 text-sm px-5 py-3 rounded-lg shadow-md w-56 border border-gray-200"
            >
              {{ randomQuote }}
            </div>
          </transition>
        </div>
      </client-only>

      <!-- 📌 Info & Work -->
      <div class="flex flex-col text-center lg:text-left max-w-md">
        <p class="text-muted-foreground text-lg tracking-wide">Welcome to</p>
        <h2
          class="text-4xl md:text-5xl font-semibold text-foreground transition-all duration-500 ease-in-out whitespace-nowrap"
        >
          MY
          {{ currentText }}
        </h2>

        <!-- 🔥 Quote -->
        <p class="mt-5 italic text-lg text-gray-600 dark:text-gray-400">
          Not everything needs an explanation. This is mine. A little chaotic, a
          little honest — just like me.
        </p>
        <!-- <p class="mt-5 italic text-lg text-gray-600 dark:text-gray-400">
          "{{ randomQuote }}"
        </p> -->

        <p
          class="mt-5 text-3xl text-gray-800 dark:text-gray-300 leading-relaxed"
        >
          🌧️ 🧃 👾 📖 🎧
        </p>
      </div>
    </div>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
