<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { onClickOutside } from "@vueuse/core";
// import ChatBox from "~/components/ChatBox.vue";

const showChatModal = ref(false);
const showGameChoiceModal = ref(false);
const chatModalRef = ref(null);
const gameModalRef = ref(null);
const selectedGame = ref("");

// Close modal on outside click
onClickOutside(chatModalRef, () => {
  if (showChatModal.value) showChatModal.value = false;
});
onClickOutside(gameModalRef, () => {
  if (showGameChoiceModal.value) showGameChoiceModal.value = false;
});

// Optional: Close on ESC
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    showChatModal.value = false;
    showGameChoiceModal.value = false;
  }
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onBeforeUnmount(() => window.removeEventListener("keydown", handleEscape));

const openGameChoiceModal = () => {
  showGameChoiceModal.value = true;
};
const closeGameChoiceModal = () => {
  showGameChoiceModal.value = false;
};

const handleGameSelection = (game: string) => {
  selectedGame.value = game;
  closeGameChoiceModal();
  window.location.href = `/memoir/gaming-log/${game}`;
};
</script>

<template>
  <section id="playground" class="py-20 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-6 text-foreground">🎠 Playground</h2>

      <!-- Playground Cards -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- ChatBox Playground -->
        <div
          v-motion-fade-visible
          class="bg-secondary rounded-2xl p-8 cursor-pointer transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden border border-r-4 border-b-4 border-primary"
          @click="showChatModal = true"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>

          <div class="flex items-center justify-between gap-2 mb-3 mt-2">
            <h3 class="text-2xl font-extrabold text-primary">
              🧠 Talk with the Bot
            </h3>
            <span
              class="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0 bg-bloom text-primary"
            >
              Chat
            </span>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            Chat with Amiw’s thoughtful bot, always ready to listen 💬
          </p>
        </div>

        <!-- Gaming Log Card -->
        <div
          v-motion-fade-visible
          class="bg-secondary rounded-2xl p-8 cursor-pointer transition hover:scale-[1.02] duration-300 group relative overflow-hidden border border-r-4 border-b-4 border-primary"
          @click="openGameChoiceModal"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-terracotta"></div>

          <div class="flex items-center justify-between gap-2 mb-3 mt-2">
            <h3 class="text-2xl font-extrabold text-primary">
              🎮 My Gaming Log
            </h3>
            <span
              class="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0 bg-terracotta text-secondary"
            >
              Play
            </span>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            Track my progress in Mobile Legends & Valorant, from strategies to
            milestones!
          </p>
        </div>

        <!-- Sustainable Living -->
        <div
          v-motion-fade-visible
          class="bg-secondary rounded-2xl p-8 cursor-not-allowed transition hover:opacity-90 duration-300 group relative overflow-hidden border border-r-4 border-b-4 border-primary"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-honey"></div>

          <div class="flex items-center justify-between gap-2 mb-3 mt-2">
            <h3 class="text-2xl font-extrabold text-primary">
              🌱 Sustainable Living
            </h3>
            <span
              class="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0 bg-honey text-primary"
            >
              Eco
            </span>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            Learn to reduce waste, live minimally, and love the Earth in small
            everyday choices.
          </p>
          <div class="mt-6 flex items-center justify-between">
            <span class="text-sm italic text-muted-foreground"
              >Under Development</span
            >
            <span class="text-honey text-xl">🌾</span>
          </div>
        </div>

        <!-- Homesteading Projects -->
        <div
          v-motion-fade-visible
          class="bg-secondary rounded-2xl p-8 cursor-not-allowed transition hover:opacity-90 duration-300 group relative overflow-hidden border border-r-4 border-b-4 border-primary"
        >
          <!-- Pink "bloom" accent strip -->
          <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>

          <div class="flex items-center justify-between gap-2 mb-3 mt-2">
            <h3 class="text-2xl font-extrabold text-primary">
              🏡 Homesteading Projects
            </h3>
            <span
              class="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0 bg-sage text-secondary"
            >
              Garden
            </span>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            Future space for garden logs, DIY tools, and seasonal harvest notes
            from a quiet life.
          </p>
          <div class="mt-6 flex items-center justify-between">
            <span class="text-sm italic text-muted-foreground"
              >Coming Soon...</span
            >
            <span class="text-terracotta text-xl">🌿</span>
          </div>
        </div>

        <!-- Pantry & Food Waste Tracker -->
        <div
          v-motion-fade-visible
          class="bg-secondary rounded-2xl p-8 cursor-not-allowed transition hover:opacity-90 duration-300 group relative overflow-hidden border border-r-4 border-b-4 border-primary"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-terracotta"></div>

          <div class="flex items-center justify-between gap-2 mb-3 mt-2">
            <h3 class="text-2xl font-extrabold text-primary">
              🍽️ Food Waste Tracker
            </h3>
            <span
              class="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0 bg-terracotta text-secondary"
            >
              Kitchen
            </span>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            A simple tool to track what's in your pantry, save food, and plan
            meals more mindfully.
          </p>
          <div class="mt-6 flex items-center justify-between">
            <span class="text-sm italic text-muted-foreground"
              >Still in the kitchen...</span
            >
            <span class="text-honey text-xl">🍞</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Selection Modal -->
    <transition name="fade">
      <div
        v-show="showGameChoiceModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      >
        <div
          v-show="showGameChoiceModal"
          ref="gameModalRef"
          class="relative bg-secondary rounded-3xl shadow-2xl w-full max-w-xl p-8 border border-border"
        >
          <button
            @click="closeGameChoiceModal"
            class="absolute top-4 right-6 text-muted-foreground hover:text-destructive transition text-xl"
          >
            ×
          </button>

          <h3 class="text-2xl font-semibold text-foreground mb-6 text-center">
            Choose a Game
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Valorant Card -->
            <div
              class="cursor-pointer border border-border rounded-xl overflow-hidden hover:shadow-md transition"
              @click="handleGameSelection('valorant')"
            >
              <img
                src="/img/gaming-log/valorant.webp"
                alt="Valorant Cover"
                class="w-full h-32 object-cover"
              />
            </div>

            <!-- Mobile Legends Card -->
            <div
              class="cursor-pointer border border-border rounded-xl overflow-hidden hover:shadow-md transition"
              @click="handleGameSelection('mobile-legends')"
            >
              <img
                src="/img/gaming-log/ml.webp"
                alt="Mobile Legends Cover"
                class="w-full h-32 object-cover"
              />
            </div>

            <!-- Dota 2 Card -->
            <!-- <div
              class="cursor-pointer border border-border rounded-xl overflow-hidden hover:shadow-md transition"
              @click="handleGameSelection('mobile-legends')"
            >
              <img
                src="/img/gaming-log/dota2.webp"
                alt="Dota 2 Cover"
                class="w-full h-32 object-cover"
              />
            </div> -->
          </div>
        </div>
      </div>
    </transition>

    <!-- ChatBox Modal -->
    <transition name="fade">
      <div
        v-show="showChatModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      >
        <div
          v-show="showChatModal"
          ref="chatModalRef"
          class="relative bg-secondary rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border"
        >
          <button
            @click="showChatModal = false"
            class="absolute top-4 right-6 text-muted-foreground hover:text-destructive transition text-xl"
          >
            ×
          </button>

          <div class="pt-8 pb-4 px-4 sm:px-8">
            <h3 class="text-xl font-semibold text-center text-primary mb-2">
              Amiw's Bot
            </h3>
            <p class="text-xs text-muted-foreground text-center">
              Powered by the <strong>Deepseek R1</strong> model, designed for
              engaging conversations and intelligent responses.
            </p>
            <ChatBox />

            <div class="mt-4 text-xs text-muted-foreground">
              <p class="italic">
                Disclaimer: The responses generated by this bot are based on a
                trained AI model and may not always be accurate. Please use
                discretion when interpreting or acting upon the information
                provided. And Amiw can not see your chat history, so feel free
                to interact! 🌸
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
