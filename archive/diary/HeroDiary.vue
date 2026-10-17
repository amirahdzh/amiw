<!--
  ARCHIVED (2026-10-17): the diary-side hero, set aside while the homepage is
  reworked professional-first. Not auto-registered by Nuxt (lives outside
  components/). See archive/diary/README.md for how to bring it back.

  Standalone version: it no longer reads the heroVibe store. The avatar
  button emits `peek`, which used to open Memoir/PeekDrawer.vue (since
  removed) — wire it to whatever the diary entry point becomes.
-->
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits<{ (e: "peek"): void }>();

// WCAG 2.2.2: looping cues must be skippable for anyone who has asked the
// OS for reduced motion.
const prefersReducedMotion =
  import.meta.client &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 👆 Periodic "click me" cursor cue on the avatar, hinting it's clickable.
const cuePulse = ref(false);

let clickCueTimeout: ReturnType<typeof setTimeout> | null = null;
let clickCueInterval: ReturnType<typeof setInterval> | null = null;

const pulseClickCue = () => {
  cuePulse.value = true;
  if (clickCueTimeout) clearTimeout(clickCueTimeout);
  clickCueTimeout = setTimeout(() => {
    cuePulse.value = false;
  }, 2200);
};

// Word bank — cycled as a calm crossfade between whole words rather than a
// per-letter typewriter effect (too "terminal hacker" for the rest of the
// site's soft, handwritten-note visual language).
const diaryCopy = { prefix: "MY ", words: ["SPACE", "PAGE", "DIARY"] };

const wordIndex = ref(0);
const activeWord = computed(() => diaryCopy.words[wordIndex.value]);

let wordCycleInterval: ReturnType<typeof setInterval> | null = null;
const wordCycleDelay = 2800;

onMounted(() => {
  if (prefersReducedMotion) return;

  wordCycleInterval = setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % diaryCopy.words.length;
  }, wordCycleDelay);

  clickCueTimeout = setTimeout(() => {
    pulseClickCue();
  }, 2000);

  clickCueInterval = setInterval(() => {
    if (!cuePulse.value) pulseClickCue();
  }, 4500);
});

onBeforeUnmount(() => {
  if (wordCycleInterval) clearInterval(wordCycleInterval);
  if (clickCueTimeout) clearTimeout(clickCueTimeout);
  if (clickCueInterval) clearInterval(clickCueInterval);
});
</script>

<template>
  <div
    class="pt-24 pb-16 bg-[hsl(var(--alternate-background))]"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div class="relative rounded-2xl p-8 md:p-10">
        <!-- Card background + border, clipped so the accent strip's
             corners can never render past the card's own rounded
             silhouette -->
        <div
          class="absolute inset-0 overflow-hidden rounded-2xl bg-secondary border border-r-4 border-b-4 border-primary"
        >
          <!-- Pink "bloom" accent strip -->
          <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>
        </div>

        <div
          class="relative flex flex-col md:flex-row md:items-center gap-8 mt-2"
        >
          <!-- 🎨 Avatar badge — a real button: it opens the peek drawer,
               so it needs to be keyboard-reachable and announced, not
               just a hover/click affordance on a bare div. -->
          <client-only>
            <div class="group relative shrink-0 w-fit mx-auto md:mx-0">
              <button
                type="button"
                aria-label="Peek at the professional side"
                class="block w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-r-4 border-b-4 border-[hsl(var(--pink))] bg-[hsl(var(--alternate-background))] overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_8px_hsl(var(--pink)/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--pink))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--alternate-background))] motion-reduce:transition-none"
                @click="emit('peek')"
              >
                <img
                  src="/img/amiw.jpeg"
                  alt=""
                  class="w-full h-full object-cover"
                />

                <!-- 🖱️ Periodic "click me" cursor cue (decorative only) -->
                <transition name="fade">
                  <div
                    v-if="cuePulse"
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      class="absolute w-12 h-12 rounded-full bg-[hsl(var(--pink))]/50 cue-ripple"
                    ></span>
                    <Icon
                      name="lucide:mouse-pointer-click"
                      class="relative w-9 h-9 text-primary/50 drop-shadow-md cue-tap"
                    />
                  </div>
                </transition>
              </button>

              <!-- 🌟 Floating flower (decorative, paused for reduced motion) -->
              <motion
                aria-hidden="true"
                :initial="{ y: 0 }"
                :enter="{
                  y: prefersReducedMotion ? 0 : [0, -8, 0],
                  transition: {
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    duration: 2.5,
                    ease: 'easeInOut',
                  },
                }"
                class="absolute -top-3 -left-3"
              >
                <Icon name="lucide:flower-2" class="w-4 h-4 text-[hsl(var(--pink))]" />
              </motion>
            </div>
          </client-only>

          <!-- 📌 Welcome and intro -->
          <div class="flex-1 min-w-0">
            <p class="text-muted-foreground text-sm tracking-wide">
              Welcome to
            </p>
            <h1
              class="text-3xl md:text-4xl font-extrabold text-foreground"
            >
              <span aria-hidden="true"
                >{{ diaryCopy.prefix
                }}<Transition name="word-fade" mode="out-in"
                  ><span :key="activeWord" class="inline-block">{{
                    activeWord
                  }}</span></Transition
                ></span
              >
              <span class="sr-only"
                >{{ diaryCopy.prefix
                }}{{ diaryCopy.words.join(" / ") }}</span
              >
            </h1>

            <p
              class="mt-5 italic text-md text-muted-foreground border-l-4 border-[hsl(var(--pink))] pl-4"
            >
              This place is mine — A resting point for souls wandering
              nowhere.
            </p>

            <div
              v-motion-slide-bottom
              class="bg-honey/30 text-primary px-4 py-3 rounded-xl shadow mt-6 w-fit rotate-[-1deg]"
            >
              <p class="text-sm italic">
                Sometimes I write just to remember I exist.
              </p>
            </div>
          </div>
        </div>

        <!-- 🧭 In-page Nav -->
        <div class="relative border-t border-border mt-6 pt-4">
          <nav class="flex flex-wrap items-center gap-2 text-sm">
            <a
              href="#essence"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-sage hover:text-secondary transition-colors"
            >
              <Icon name="lucide:droplet" class="w-3.5 h-3.5" />
              Essence
            </a>
            <a
              href="#journey"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-terracotta hover:text-secondary transition-colors"
            >
              <Icon name="lucide:route" class="w-3.5 h-3.5" />
              Journey
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.word-fade-enter-active,
.word-fade-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}
.word-fade-enter-from,
.word-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

/* Cursor press + ripple burst, sharing one timeline so the ripple fires at
   the exact instant the cursor is smallest — i.e. the moment of "clicking" */
@keyframes cue-tap {
  0%,
  30% {
    transform: scale(1) translate(0, 0);
  }
  40% {
    transform: scale(0.8) translate(-2px, 2px);
  }
  55% {
    transform: scale(1.05) translate(0, 0);
  }
  70%,
  100% {
    transform: scale(1) translate(0, 0);
  }
}
.cue-tap {
  animation: cue-tap 1.4s ease-in-out infinite;
}

@keyframes cue-ripple {
  0%,
  39% {
    transform: scale(0.5);
    opacity: 0;
  }
  40% {
    transform: scale(0.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
.cue-ripple {
  animation: cue-ripple 1.4s ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cue-tap,
  .cue-ripple {
    animation: none;
  }
}
</style>
