<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useHeroVibeStore, type HeroVibe } from "@/stores/heroVibe";

type Vibe = HeroVibe;

const heroVibeStore = useHeroVibeStore();
const vibe = computed(() => heroVibeStore.vibe);

const toggleVibe = () => {
  heroVibeStore.toggle();
};

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

// Typewriter word bank per vibe — same "prefix + typed word" shape in both,
// so switching vibes reads as a variation of the same mechanic rather than
// a different widget bolted on.
const vibeCopy: Record<Vibe, { prefix: string; words: string[] }> = {
  diary: { prefix: "MY ", words: ["SPACE", "PAGE", "DIARY"] },
  professional: {
    prefix: "I'M A ",
    words: ["FULL-STACK DEV", "BUILDER", "PROBLEM SOLVER"],
  },
};

const sloganIndex = ref(0);
const currentText = ref("");
const isDeleting = ref(false);

let typewriterTimeout: ReturnType<typeof setTimeout>;
const typeSpeed = 100;
const deleteSpeed = 60;
const pauseAfterTyped = 1200;
const pauseBeforeTyping = 300;

const typeWriter = () => {
  const words = vibeCopy[vibe.value].words;
  const fullText = words[sloganIndex.value];

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
    sloganIndex.value = (sloganIndex.value + 1) % words.length;
    delay = pauseBeforeTyping;
  }

  typewriterTimeout = setTimeout(typeWriter, delay);
};

watch(vibe, () => {
  clearTimeout(typewriterTimeout);
  sloganIndex.value = 0;
  currentText.value = "";
  isDeleting.value = false;
  typeWriter();
});

onMounted(() => {
  typeWriter();

  clickCueTimeout = setTimeout(() => {
    pulseClickCue();
  }, 2000);

  clickCueInterval = setInterval(() => {
    if (!cuePulse.value) pulseClickCue();
  }, 4500);
});

onBeforeUnmount(() => {
  clearTimeout(typewriterTimeout);
  if (clickCueTimeout) clearTimeout(clickCueTimeout);
  if (clickCueInterval) clearInterval(clickCueInterval);
});
</script>

<template>
  <section class="w-full pt-24 pb-16 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-3xl mx-auto px-6">
      <div class="relative rounded-2xl p-8 md:p-10">
        <!-- Card background + border, clipped so the accent strip's corners
             can never render past the card's own rounded silhouette -->
        <div
          class="absolute inset-0 overflow-hidden rounded-2xl bg-secondary border border-r-4 border-b-4 border-primary"
        >
          <!-- Pink "bloom" accent strip -->
          <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>
        </div>

        <div
          class="relative flex flex-col md:flex-row md:items-center gap-8 mt-2"
        >
          <!-- 🎨 Avatar badge -->
          <client-only>
            <div class="group relative shrink-0 w-fit mx-auto md:mx-0">
              <div
                class="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-r-4 border-b-4 border-[hsl(var(--pink))] bg-[hsl(var(--alternate-background))] overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_8px_hsl(var(--pink)/0.25)]"
                @click="toggleVibe"
              >
                <img
                  src="/img/amiw.jpeg"
                  alt="Amiw"
                  class="w-full h-full object-cover"
                />

                <!-- 🖱️ Periodic "click me" cursor cue -->
                <transition name="fade">
                  <div
                    v-if="cuePulse"
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
            </div>
          </client-only>

          <!-- 📌 Welcome and intro -->
          <div class="flex-1 min-w-0">
            <transition name="fade" mode="out-in">
              <div :key="vibe">
                <p class="text-muted-foreground text-sm tracking-wide">
                  {{ vibe === "diary" ? "Welcome to" : "Hi, I'm Amiw" }}
                </p>
                <h2
                  class="text-3xl md:text-4xl font-extrabold text-foreground transition-all duration-500 ease-in-out"
                  :class="{ 'font-mono': vibe === 'professional' }"
                >
                  {{ vibeCopy[vibe].prefix }}{{ currentText
                  }}<span class="ml-1 animate-pulse font-thin">|</span>
                </h2>

                <template v-if="vibe === 'diary'">
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
                </template>
                <template v-else>
                  <p
                    class="mt-5 text-sm leading-relaxed text-muted-foreground border-l-4 border-[hsl(var(--pink))] pl-4"
                  >
                    <i>Frontend? Backend? Servers?</i>
                    Don't worry, <br />
                    <span class="bg-bloom"
                      >I'm a <b>full-stack developer</b></span
                    >, I do it all, and well.
                  </p>

                  <div class="flex flex-wrap gap-3 mt-6">
                    <Button
                      variant="default"
                      size="sm"
                      class="bg-secondary hover:bg-secondary hover:text-primary border border-r-4 border-b-4 border-primary text-primary"
                      as="a"
                      href="https://wa.me/6282114643544"
                      target="_blank"
                    >
                      <Icon name="simple-icons:whatsapp" class="w-4 h-4" />
                      Contact Me
                    </Button>

                    <Button
                      variant="default"
                      size="sm"
                      class="bg-primary text-secondary"
                      as="a"
                      href="https://docs.google.com/document/d/1JPOLI2oE2TByNBR7FCI7I6ZZaW7vDEOff67c0FaDrDA/edit?usp=drive_link"
                      target="_blank"
                    >
                      <Icon
                        name="heroicons-outline:external-link"
                        class="w-4 h-4"
                      />
                      Resume
                    </Button>
                  </div>
                </template>
              </div>
            </transition>
          </div>
        </div>

        <!-- 🧭 In-page Nav -->
        <div class="relative border-t border-border mt-6 pt-4">
          <nav class="flex flex-wrap items-center gap-2 text-sm">
            <template v-if="vibe === 'diary'">
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
            </template>
            <template v-else>
              <a
                href="#services"
                class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-sage hover:text-secondary transition-colors"
              >
                🛠️ Services
              </a>
              <a
                href="#experience"
                class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-terracotta hover:text-secondary transition-colors"
              >
                💼 Experience
              </a>
            </template>
            <!-- <NuxtLink
              to="/art-leisure"
              class="px-3 py-1 rounded-full bg-muted text-foreground font-medium hover:bg-honey hover:text-primary transition-colors"
            >
              🎨 Art & Leisure
            </NuxtLink> -->
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>
