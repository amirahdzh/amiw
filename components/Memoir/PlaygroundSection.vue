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

// The bot, sustainable living, homestead and food waste tracker are not open
// yet; they show a status instead of a button.
const items = [
  {
    tag: "Paused",
    icon: "lucide:brain",
    title: "Talk with the Bot",
    description: "Chat with Amiw's thoughtful bot, always ready to listen.",
    status: "In training…",
  },
  {
    tag: "Play",
    icon: "lucide:gamepad-2",
    title: "My Gaming Log",
    description:
      "Track my progress in Mobile Legends & Valorant, from strategies to milestones.",
    cta: "Open log",
    action: openGameChoiceModal,
  },
  {
    tag: "Eco",
    icon: "lucide:sprout",
    title: "Sustainable Living",
    description:
      "Learn to reduce waste, live minimally, and love the Earth in small everyday choices.",
    status: "Under development",
  },
  {
    tag: "Garden",
    icon: "lucide:home",
    title: "Homesteading Projects",
    description:
      "Future space for garden logs, DIY tools, and seasonal harvest notes from a quiet life.",
    status: "Coming soon…",
  },
  {
    tag: "Kitchen",
    icon: "lucide:utensils",
    title: "Food Waste Tracker",
    description:
      "A simple tool to track what's in your pantry, save food, and plan meals more mindfully.",
    status: "Still in the kitchen…",
  },
] as {
  tag: string;
  icon: string;
  title: string;
  description: string;
  status?: string;
  cta?: string;
  action?: () => void;
}[];

const handleGameSelection = (game: string) => {
  selectedGame.value = game;
  closeGameChoiceModal();
  window.location.href = `/memoir/gaming-log/${game}`;
};
</script>

<template>
  <section id="playground" class="w-full bg-[hsl(var(--alternate-background))] py-16 md:py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="heading-marker text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Playground
      </h2>
      <p class="mt-2 text-base text-muted-foreground">Small things I'm making for fun.</p>

      <ul class="mt-9 border-b border-border">
        <li
          v-for="item in items"
          :key="item.title"
          class="grid gap-3 border-t border-border py-6 md:grid-cols-[15.5rem_minmax(0,1fr)_11rem] md:items-center md:gap-8"
        >
          <div>
            <span class="eyebrow mb-1 block">{{ item.tag }}</span>
            <h3 class="flex items-center gap-2 font-mono text-xl font-bold leading-tight text-foreground">
              <Icon :name="item.icon" class="h-5 w-5 shrink-0 text-amiw" />
              {{ item.title }}
            </h3>
          </div>

          <p class="max-w-[44ch] text-base leading-relaxed text-foreground">
            {{ item.description }}
          </p>

          <button
            v-if="item.action"
            type="button"
            class="btn-outline w-44 justify-self-start px-6 py-3 text-base focus-visible:ring-offset-[hsl(var(--alternate-background))] md:justify-self-end"
            @click="item.action"
          >
            {{ item.cta }}
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </button>
          <p v-else class="font-mono text-[13px] text-muted-foreground md:text-right">
            {{ item.status }}
          </p>
        </li>
      </ul>
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
                to interact!
                <Icon name="lucide:flower-2" class="inline w-3.5 h-3.5" />
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
