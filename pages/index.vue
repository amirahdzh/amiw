<template>
  <IndexHeroSection />
  <!-- <IndexProfesionalSection /> -->
  <IndexTrackSection />
  <!-- <IndexSkillSection /> -->
  <IndexProjectSection />
  <IndexPersonalSection />

  <!-- Shortcut periodik -->
  <transition name="fade" mode="out-in">
    <div
      v-if="showShortcut"
      @click="goToMemoir"
      @mouseenter="isHovered = true"
      @mouseleave="onMouseLeave"
      class="fixed bottom-6 right-6 p-4 bg-secondary border-primary border text-primary rounded-full shadow-lg cursor-pointer animate-bounce z-50 transition-all duration-1000 font-medium"
    >
      🚪 Peek
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const showShortcut = ref(false);
const isHovered = ref(false);
const router = useRouter();

const goToMemoir = () => {
  router.push("/memoir");
};

let intervalId: ReturnType<typeof setInterval> | null = null;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const startShortcutCycle = () => {
  showShortcut.value = true;

  // Clear any existing timeout before setting new one
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    // hanya sembunyikan kalau tidak di-hover
    if (!isHovered.value) {
      showShortcut.value = false;
    }
    // jika sedang hover, tunggu sampai mouseleave
  }, 3000); // Reduced from 4000ms to 3000ms
};

const onMouseLeave = () => {
  isHovered.value = false;
  // Clear any existing timeout before setting new one
  if (timeoutId) clearTimeout(timeoutId);

  // sembunyikan shortcut setelah hover selesai
  timeoutId = setTimeout(() => {
    showShortcut.value = false;
  }, 800); // Reduced from 1000ms to 800ms
};

onMounted(() => {
  // Delay initial appearance to reduce startup load
  timeoutId = setTimeout(() => {
    startShortcutCycle();
  }, 2000);

  // Increased interval to reduce frequency
  intervalId = setInterval(() => {
    if (!showShortcut.value && !isHovered.value) {
      startShortcutCycle();
    }
  }, 10000); // Increased from 5000ms to 10000ms
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
