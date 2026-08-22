<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useMotion } from "@vueuse/motion";

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
  <section class="w-full pt-24 pb-16 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-3xl mx-auto px-6">
      <div
        class="relative overflow-hidden rounded-2xl bg-secondary border border-r-4 border-b-4 border-primary p-8 md:p-10"
      >
        <!-- Pink "bloom" accent strip -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>

        <div class="flex items-center gap-5 mt-2">
          <!-- 🎨 Avatar badge -->
          <client-only>
            <div class="relative shrink-0">
              <div
                class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-r-4 border-b-4 border-[hsl(var(--pink))] bg-[hsl(var(--alternate-background))] flex items-center justify-center"
              >
                <span
                  class="font-mono text-2xl md:text-3xl text-[hsl(var(--pink))]"
                  >A</span
                >
              </div>

              <!-- 🌟 Floating Emojis -->
              <motion
                :initial="{ y: 0 }"
                :enter="{
                  y: [0, -8, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2.5,
                    ease: 'easeInOut',
                  },
                }"
                class="absolute -top-3 -left-3 text-lg"
              >
                🌸
              </motion>
              <motion
                :initial="{ y: 0 }"
                :enter="{
                  y: [0, -6, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  },
                }"
                class="absolute -bottom-2 -right-2 text-lg"
              >
                🪐
              </motion>

              <!-- 💬 Thought Bubble Trigger -->
              <div
                class="absolute -bottom-1 -right-1 p-1.5 rounded-full border border-[hsl(var(--pink))] transition-transform duration-300 hover:scale-110 bg-secondary cursor-pointer"
                @mouseenter="showBubble = true"
                @mouseleave="showBubble = false"
              >
                💬
              </div>

              <!-- 💭 Thought Bubble -->
              <transition name="fade">
                <div
                  v-if="showBubble"
                  class="absolute top-full mt-2 left-0 z-20 bg-secondary text-foreground text-sm px-5 py-3 rounded-lg w-56 border border-[hsl(var(--pink))] shadow-lg"
                >
                  {{ randomQuote }}
                </div>
              </transition>
            </div>
          </client-only>

          <!-- 📌 Greeting -->
          <div class="flex-1 min-w-0">
            <p class="text-muted-foreground text-sm tracking-wide">
              Welcome to
            </p>
            <h2
              class="text-3xl md:text-4xl font-extrabold text-foreground transition-all duration-500 ease-in-out"
            >
              MY {{ currentText
              }}<span class="ml-1 animate-pulse font-thin">|</span>
            </h2>
          </div>
        </div>

        <p
          class="mt-5 italic text-md text-muted-foreground border-l-4 border-[hsl(var(--pink))] pl-4"
        >
          This place is mine — A resting point for souls wandering nowhere.
        </p>

        <div
          v-motion-slide-bottom
          class="bg-honey/30 text-primary px-4 py-3 rounded-xl shadow mt-6 w-fit rotate-[-1deg]"
        >
          <p class="text-sm italic">
            Sometimes I write just to remember I exist.
          </p>
        </div>

        <!-- 🧭 In-page Nav -->
        <div class="border-t border-border mt-6 pt-4">
          <nav class="flex flex-wrap items-center gap-2 text-sm">
            <a
              href="#essence"
              class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-sage hover:text-secondary transition-colors"
            >
              🫧 Essence
            </a>
            <a
              href="#journey"
              class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-terracotta hover:text-secondary transition-colors"
            >
              🛤️ Journey
            </a>
            <a
              href="#playground"
              class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-honey hover:text-primary transition-colors"
            >
              🎠 Playground
            </a>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
