<template>
  <IndexHeroSection />
  <!-- <IndexProfesionalSection /> -->
  <IndexTrackSection />
  <IndexSkillSection />
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

let intervalId: NodeJS.Timer;
let timeoutId: NodeJS.Timeout;

const startShortcutCycle = () => {
  showShortcut.value = true;

  timeoutId = setTimeout(() => {
    // hanya sembunyikan kalau tidak di-hover
    if (!isHovered.value) {
      showShortcut.value = false;
    }
    // jika sedang hover, tunggu sampai mouseleave
  }, 4000);
};

const onMouseLeave = () => {
  isHovered.value = false;
  // sembunyikan shortcut setelah hover selesai
  timeoutId = setTimeout(() => {
    showShortcut.value = false;
  }, 1000); // kasih jeda sedikit
};

onMounted(() => {
  startShortcutCycle(); // langsung muncul pertama kali

  intervalId = setInterval(() => {
    if (!showShortcut.value) {
      startShortcutCycle();
    }
  }, 5000); // shortcut muncul setiap 15 detik
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
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
