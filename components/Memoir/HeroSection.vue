<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMotion } from "@vueuse/motion";
import { onClickOutside } from "@vueuse/core";

const showBubble = ref(false);
const avatarWrapperRef = ref(null);

const riddles = [
  {
    text: "I have keys but no locks, space but no room. What am I?",
    answers: ["keyboard"],
    success: "Ding ding ding! 🎉 You just typed your way to victory.",
  },
  {
    text: "The more you take, the more you leave behind. What am I?",
    answers: ["footsteps", "footprints", "footprint"],
    success: "Yes! You really know how to walk the talk. 👣",
  },
  {
    text: "I speak without a mouth and hear without ears. What am I?",
    answers: ["echo"],
    success: "Correct! ...correct! ...correct! 🔊 (sorry, had to.)",
  },
  {
    text: "What has to be broken before you can use it?",
    answers: ["egg", "eggs"],
    success: "Cracked it! 🥚 Literally.",
  },
  {
    text: "I'm always in front of you, but you'll never actually see me. What am I?",
    answers: ["the future", "future", "tomorrow"],
    success: "Exactly — always one step ahead of you. ⏳",
  },
  {
    text: "What gets wetter the more it dries?",
    answers: ["a towel", "towel"],
    success: "Yep! Now go dry off that brain, genius. 🧺",
  },
];

const currentRiddle = useState(
  "currentRiddle",
  () => riddles[Math.floor(Math.random() * riddles.length)],
);

const guess = ref("");
const isCorrect = ref(false);
const wrongHint = ref(false);

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/^(a|an|the)\s+/, "");

const checkAnswer = () => {
  if (!guess.value.trim()) return;
  const normalized = normalize(guess.value);
  if (currentRiddle.value.answers.some((a) => normalize(a) === normalized)) {
    isCorrect.value = true;
    wrongHint.value = false;
  } else {
    wrongHint.value = true;
  }
};

const nextRiddle = () => {
  let next = riddles[Math.floor(Math.random() * riddles.length)];
  while (next.text === currentRiddle.value.text && riddles.length > 1) {
    next = riddles[Math.floor(Math.random() * riddles.length)];
  }
  currentRiddle.value = next;
  guess.value = "";
  isCorrect.value = false;
  wrongHint.value = false;
};

onClickOutside(avatarWrapperRef, () => {
  showBubble.value = false;
});

// 👆 Periodic "click me" cursor cue on the avatar. `cuePulse` handles the
// appear/disappear timing on its own loop; the computed then gates actual
// visibility so it can only ever show while the riddle bubble is closed —
// if the bubble opens mid-pulse, the cue disappears immediately.
const cuePulse = ref(false);
const showClickCue = computed(() => cuePulse.value && !showBubble.value);

let clickCueTimeout: ReturnType<typeof setTimeout> | null = null;
let clickCueInterval: ReturnType<typeof setInterval> | null = null;

const pulseClickCue = () => {
  cuePulse.value = true;
  if (clickCueTimeout) clearTimeout(clickCueTimeout);
  clickCueTimeout = setTimeout(() => {
    cuePulse.value = false;
  }, 2200);
};

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
      <div
        class="relative rounded-2xl bg-secondary border border-r-4 border-b-4 border-primary p-8 md:p-10"
      >
        <!-- Pink "bloom" accent strip -->
        <div
          class="absolute top-0 left-0 right-0 h-2 rounded-t-2xl bg-bloom"
        ></div>

        <div class="flex flex-col md:flex-row md:items-center gap-8 mt-2">
          <!-- 🎨 Avatar badge -->
          <client-only>
            <div
              ref="avatarWrapperRef"
              class="group relative shrink-0 w-fit mx-auto md:mx-0"
            >
              <!-- 💭 Speech bubble: below the avatar on mobile, above it on desktop -->
              <transition name="pop">
                <div
                  v-if="showBubble"
                  class="speech-bubble absolute top-full mt-5 md:top-auto md:bottom-full md:mt-0 md:mb-5 left-1/2 -translate-x-1/2 z-20 w-72 max-w-[85vw] rounded-[28px] border-2 border-[hsl(var(--pink))] bg-secondary px-5 py-4 text-sm text-foreground shadow-lg"
                >
                  <template v-if="!isCorrect">
                    <p class="font-medium leading-snug">
                      🤔 {{ currentRiddle.text }}
                    </p>
                    <div
                      class="mt-3 flex items-center gap-2"
                      :class="{ 'animate-shake': wrongHint }"
                    >
                      <input
                        v-model="guess"
                        type="text"
                        placeholder="Your answer..."
                        class="min-w-0 flex-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--pink))]"
                        @keyup.enter="checkAnswer"
                        @input="wrongHint = false"
                      />
                      <button
                        type="button"
                        class="shrink-0 rounded-full bg-bloom px-3 py-1.5 text-xs font-bold text-primary transition-opacity hover:opacity-90"
                        @click="checkAnswer"
                      >
                        Guess
                      </button>
                    </div>
                    <p
                      v-if="wrongHint"
                      class="mt-1.5 text-xs text-muted-foreground"
                    >
                      Not quite — try again! 🤨
                    </p>
                  </template>
                  <template v-else>
                    <p class="font-medium leading-snug">
                      {{ currentRiddle.success }}
                    </p>
                    <button
                      type="button"
                      class="mt-3 rounded-full bg-sage px-3 py-1.5 text-xs font-bold text-secondary transition-opacity hover:opacity-90"
                      @click="nextRiddle"
                    >
                      🎲 Try another riddle
                    </button>
                  </template>
                </div>
              </transition>

              <div
                class="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-r-4 border-b-4 border-[hsl(var(--pink))] bg-[hsl(var(--alternate-background))] overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_8px_hsl(var(--pink)/0.25)]"
                @click="showBubble = !showBubble"
              >
                <img
                  src="/img/amiw.jpeg"
                  alt="Amiw"
                  class="w-full h-full object-cover"
                />

                <!-- 🖱️ Periodic "click me" cursor cue -->
                <transition name="fade">
                  <div
                    v-if="showClickCue"
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
              <!-- <motion
                :initial="{ y: 0 }"
                :enter="{
                  y: [0, -6, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  },
                }"
                class="absolute -top-2 -right-3 text-lg"
              >
                ✨
              </motion> -->

            </div>
          </client-only>

          <!-- 📌 Welcome and intro -->
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
          </div>
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

/* Speech bubble tail — on mobile the bubble sits below the avatar, so the
   tail points up; on desktop (md+) the bubble sits above it, so the tail
   flips to point down. Bordered outer triangle + inset bg-colored inner
   triangle, in both cases. */
.speech-bubble::before,
.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 0;
  height: 0;
}

.speech-bubble::before {
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 12px solid hsl(var(--pink));
}

.speech-bubble::after {
  transform: translateX(-50%);
  margin-bottom: -3px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 9px solid hsl(var(--secondary));
}

@media (min-width: 768px) {
  .speech-bubble::before,
  .speech-bubble::after {
    bottom: auto;
    top: 100%;
  }

  .speech-bubble::before {
    border-bottom: none;
    border-top: 12px solid hsl(var(--pink));
  }

  .speech-bubble::after {
    margin-bottom: 0;
    margin-top: -3px;
    border-bottom: none;
    border-top: 9px solid hsl(var(--secondary));
  }
}

.pop-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -6px) scale(0.92);
}

@keyframes shake {
  10%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  80% {
    transform: translateX(3px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-5px);
  }
  40%,
  60% {
    transform: translateX(5px);
  }
}
.animate-shake {
  animation: shake 0.4s ease;
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
