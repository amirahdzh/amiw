<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useMotion } from "@vueuse/motion";

const config = useRuntimeConfig();
const baseURL = config.public.baseURL || "";

const bubbleShownOnce = ref(false);
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

const slogans = ["SPACE", "PAGE", "DIARY"];
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

  if (!isDeleting.value && currentText.value === fullText) {
    delay = pauseAfterTyped;
    isDeleting.value = true;
  } else if (isDeleting.value && currentText.value === "") {
    isDeleting.value = false;
    sloganIndex.value = (sloganIndex.value + 1) % slogans.length;
    delay = pauseBeforeTyping;
  }

  typewriterTimeout = setTimeout(typeWriter, delay);
};

onMounted(() => {
  typeWriter();

  if (!bubbleShownOnce.value) {
    showBubble.value = true;
    bubbleShownOnce.value = true;
    setTimeout(() => {
      showBubble.value = false;
    }, 3000);
  }
});

onBeforeUnmount(() => {
  clearTimeout(typewriterTimeout);
});
</script>

<template>
  <section class="w-full pt-24 pb-20 bg-[hsl(var(--alternate-background))]">
    <div
      class="max-w-5xl mx-auto px-8 pt-10 flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-12"
    >
      <!-- 🎨 Illustration -->
      <client-only>
        <div class="relative flex-shrink-0 mt-6 md:mt-0">
          <img
            :src="`${baseURL}/img/angel_maple.jpg`"
            alt="Amiw Illustration"
            class="w-44 h-44 md:w-64 md:h-64 lg:w-72 lg:h-72 border border-[hsl(var(--pink))] border-r-8 border-b-8 rounded-full object-cover aspect-square transition-all"
          />

          <!-- 🌟 Floating Emojis -->
          <motion
            :initial="{ y: 0 }"
            :enter="{
              y: [0, -12, 0],
              transition: {
                repeat: Infinity,
                duration: 2.5,
                ease: 'easeInOut',
              },
            }"
            class="absolute -top-6 -left-6 text-2xl"
          >
            🌸
          </motion>
          <motion
            :initial="{ y: 0 }"
            :enter="{
              y: [0, -10, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              },
            }"
            class="absolute -bottom-6 right-0 text-2xl"
          >
            🪐
          </motion>

          <!-- 💬 Thought Bubble Trigger -->
          <div
            class="absolute top-8 right-0 md:top-8 md:right-8 p-2 rounded-full border border-[hsl(var(--pink))] transition-transform duration-300 hover:scale-110 bg-white cursor-pointer"
            @mouseenter="showBubble = true"
            @mouseleave="showBubble = false"
          >
            💬
          </div>

          <!-- 💭 Thought Bubble -->
          <transition name="fade">
            <div
              v-if="showBubble"
              class="absolute -top-12 right-0 md:-top-12 bg-white text-gray-800 text-sm px-5 py-3 rounded-lg w-56 border border-[hsl(var(--pink))]"
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
          MY {{ currentText
          }}<span class="ml-1 animate-pulse font-thin">|</span>
        </h2>

        <p
          class="mt-4 italic text-md text-gray-500 dark:text-gray-400 border-l-4 border-[hsl(var(--pink))] pl-4"
        >
          This place is mine — A resting point for souls wandering nowhere.
        </p>

        <div
          v-motion-slide-bottom
          class="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md shadow mt-6 w-fit mx-auto lg:mx-0 rotate-[-1.5deg]"
        >
          <p class="text-sm italic">
            Sometimes I write just to remember I exist.
          </p>
        </div>
        <div class="border-t mt-4"></div>
        <!-- 🧭 In-page Nav -->
        <nav
          class="mt-4 mb-2 flex flex-wrap justify-center lg:justify-start items-center gap-2 text-sm text-muted-foreground"
        >
          <a
            href="#essence"
            class="relative px-2 transition-colors duration-300 hover:text-foreground group"
          >
            🫧 Essence
            <span
              class="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[hsl(var(--pink))] transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </a>

          <span class="text-muted-foreground">·</span>

          <a
            href="#journey"
            class="relative px-2 transition-colors duration-300 hover:text-foreground group"
          >
            🛤️ Journey
            <span
              class="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[hsl(var(--pink))] transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
