<template>
  <section
    class="w-full flex flex-wrap md:flex-nowrap items-center justify-center text-left gap-2"
  >
    <!-- Image with Motion -->
    <Motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <img
        src="/img/maple_circle.png"
        alt="Amiw Illustration"
        class="w-32 lg:w-40 flex-shrink-0 rounded-full"
      />
    </Motion>

    <!-- Text & Buttons with Motion -->
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 }"
      class="w-full md:max-w-md flex flex-col items-center md:items-start space-y-3 px-6"
    >
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <h2 class="text-4xl text-primary font-bold">I am Amiw!</h2>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.2 }"
      >
        <p class="text-primary text-center md:text-left font-medium">
          Full-stack developer specializing in Vue.js, Nuxt 3, and Laravel.
        </p>
      </Motion>

      <!-- Buttons with Motion -->
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.4 }"
        class="flex gap-4 justify-center md:justify-start w-full"
      >
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
          href="https://docs.google.com/document/d/1mMpH2B_8Qti2K9_YoP3OTbwzzxvhOsrZJPDD03YdBKA/edit?usp=sharing"
          target="_blank"
        >
          <Icon name="heroicons-outline:external-link" class="w-4 h-4" />
          Resume
        </Button>
      </Motion>
    </Motion>
  </section>
</template>
