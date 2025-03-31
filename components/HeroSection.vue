<template>
  <section
    class="w-full py-24 flex flex-col justify-center bg-background border-b-4 border-primary"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-evenly max-w-6xl mx-auto"
    >
      <!-- Left Side: Intro -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="flex flex-col items-start text-left max-w-lg px-8"
      >
        <span
          class="text-[48px] md:text-[96px] font-semibold text-[hsl(var(--amiw))]"
        >
          Amiw
        </span>
        <h1 class="text-lg font-mono md:text-2xl font-light leading-snug">
          Just a girl who loves learning, writing, and sharing her journey.
        </h1>

        <!-- CTA Buttons -->
        <Motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.3, duration: 0.5 }"
          class="mt-6 flex gap-6"
        >
          <Button
            v-for="link in socialLinks"
            :key="link.url"
            variant="default"
            as="a"
            :href="link.url"
            target="_blank"
            size="icon"
          >
            <Icon :name="link.icon" class="w-5 h-5" />
          </Button>
        </Motion>

        <!-- Location -->
        <Motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.5, duration: 0.5 }"
        >
          <p class="mt-6 flex items-center gap-2 leading-none group">
            <Icon
              name="lucide:map-pin"
              class="w-5 h-5 text-[hsl(var(--amiw))] transition-transform group-hover:scale-110"
            />
            <span
              class="text-primary text-lg font-medium relative after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[hsl(var(--amiw))] after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Bandung, Indonesia
            </span>
          </p>
        </Motion>
      </Motion>

      <!-- Separator for Mobile -->
      <!-- <Motion
        :initial="{ opacity: 0, scaleX: 0 }"
        :enter="{ opacity: 1, scaleX: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="block md:hidden w-full border-t-2 border-[hsl(var(--amiw))] mx-8 origin-left"
      >
      </Motion> -->

      <!-- Swappable Content -->
      <div class="flex items-center justify-end pt-12 md:pt-0 px-8">
        <component
          :is="isSmallScreen ? HeroCollaborationSection : HeroQuoteSection"
        />
      </div>
    </div>

    <!-- Separator for Desktop -->
    <!-- <Motion
      :initial="{ opacity: 0, scaleX: 0 }"
      :enter="{ opacity: 1, scaleX: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
      class="hidden md:block border-t-2 border-[hsl(var(--amiw))] origin-left my-6 mx-8 md:my-12"
    >
    </Motion> -->

    <!-- Second Component -->
    <div class="flex items-center justify-center px-8 md:pt-20">
      <component
        :is="isSmallScreen ? HeroQuoteSection : HeroCollaborationSection"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from "vue";

// Import dynamically
const HeroCollaborationSection = defineAsyncComponent(() =>
  import("~/components/Hero/CollaborationSection.vue")
);
const HeroQuoteSection = defineAsyncComponent(() =>
  import("~/components/Hero/QuoteSection.vue")
);

// Screen size detection
const isSmallScreen = ref(false);
const checkScreenSize = () => {
  if (process.client) {
    isSmallScreen.value = window.matchMedia("(max-width: 768px)").matches;
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// Social Links
const socialLinks = [
  { url: "https://facebook.com/amirahdzh", icon: "fa:facebook" },
  { url: "https://medium.com/@amiwdzh", icon: "fa:medium" },
  { url: "https://github.com/amirahdzh", icon: "fa:github" },
];
</script>
