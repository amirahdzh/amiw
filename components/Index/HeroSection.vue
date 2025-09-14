<template>
  <section
    v-motion-slide-bottom
    :delay="100"
    class="w-full pt-24 pb-8 flex flex-col justify-center bg-background border-b-2 border-foreground font-mono"
  >
    <!-- Intro Section -->
    <div
      class="flex flex-col md:flex-row items-center justify-evenly max-w-6xl mx-auto"
    >
      <section
        class="w-full flex flex-wrap sm:flex-nowrap items-center justify-center text-left sm:gap-2 gap-4"
      >
        <!-- Profile Image -->
        <img
          src="/img/maple.png"
          alt="Amiw Illustration"
          class="sm:w-52 w-28 flex-shrink-0 border-2 border-primary rounded-lg"
        />

        <!-- Intro Text & Buttons -->
        <div
          class="w-full sm:max-w-sm flex flex-col items-center sm:items-start space-y-4 px-6"
        >
          <h2 class="text-4xl text-primary">I am <b> Amiw</b>!</h2>

          <div class="text-primary font-medium text-md sm:whitespace-nowrap">
            <span class="block text-center sm:text-left text-md">
              <i>Frontend? Backend? Servers?</i> <br />
              Don't worry,
              <span class="bg-white"> I'm a <b>full-stack dev</b></span
              >. <br />I do everything on my own.
            </span>
          </div>

          <div class="flex gap-4 justify-center sm:justify-start w-full">
            <Button
              variant="default"
              class="bg-secondary hover:bg-secondary hover:text-primary border border-r-4 border-b-4 border-primary text-primary"
              as="a"
              href="https://wa.me/6282114643544"
              target="_blank"
            >
              <Icon name="simple-icons:whatsapp" class="w-5 h-5" />
              Contact Me
            </Button>

            <Button
              variant="default"
              class="bg-primary text-secondary"
              as="a"
              href="https://docs.google.com/document/d/1RnKQJoASDSASEYZp6-OdoPom6lehE-J-2ZmPf39MftU/edit?usp=sharing"
              target="_blank"
            >
              <Icon name="heroicons-outline:external-link" class="w-4 h-4" />
              Resume
            </Button>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="block text-center sm:text-left">
              Remote · Jakarta (GMT+7)
            </span>
          </div>
        </div>
      </section>
    </div>

    <!-- Separator -->
    <div class="flex justify-center my-4 sm:my-8">
      <div class="w-1/2 border-t border-primary"></div>
    </div>

    <!-- Pitch Your Idea CTA -->
    <!-- <div class="max-w-3xl mx-auto px-8 mb-8">
      <div class="flex flex-col items-center gap-1 rounded">
        <span class="text-neutral-700 text-center text-sm font-poppins">
          Interested in <b class="font-bold">sustainability</b>?<br />Discuss
          with me · Pitch
        </span>
      </div>
    </div> -->

    <!-- About Section -->
    <section class="max-w-3xl mx-auto px-8 text-center">
      <p class="text-primary leading-relaxed text-xs">
        beyond professional, I love to connect and collaborate with people:
        <br />
        <a href="https://discord.gg/Ye8J4Z4ANN" target="_blank"
          ><span class="hover:underline bg-white">[join my community]</span></a
        >

        <a
          href="mailto:amirahdzh@gmail.com?subject=Pitch%20Your%20Idea"
          target="_blank"
          >&nbsp;<span class="hover:underline bg-white">[pitch your idea]</span>
        </a>
      </p>
    </section>

    <!-- Tech Stack Icons -->
    <!-- <div class="flex justify-center mt-6">
      <div
        class="flex items-center gap-6 px-6 py-4 rounded-full bg-white backdrop-blur-md"
      >
        <Icon name="simple-icons:nuxt" class="w-8 h-8 text-[#00DC82]" />
        <Icon name="simple-icons:vuedotjs" class="w-8 h-8 text-[#42B883]" />
        <Icon name="simple-icons:laravel" class="w-8 h-8 text-[#FF2D20]" />
        <Icon name="simple-icons:tailwindcss" class="w-8 h-8 text-[#06B6D4]" />
      </div>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const currentTime = ref("");
let rafId: number | null = null;
let lastUpdate = 0;

function updateTime() {
  const now = Date.now();
  // Only update every second (1000ms) to reduce DOM updates
  if (now - lastUpdate >= 1000) {
    const date = new Date();
    currentTime.value = date.toLocaleTimeString("en-US", {
      hour12: false,
      timeZone: "Asia/Jakarta",
    });
    lastUpdate = now;
  }

  // Continue animation loop
  rafId = requestAnimationFrame(updateTime);
}

onMounted(() => {
  // Initial update
  const date = new Date();
  currentTime.value = date.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: "Asia/Jakarta",
  });
  lastUpdate = Date.now();

  // Start RAF loop
  rafId = requestAnimationFrame(updateTime);
});

onBeforeUnmount(() => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
</script>
