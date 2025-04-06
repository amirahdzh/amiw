<template>
  <section
    v-motion-slide-bottom
    class="w-full pt-24 pb-8 flex flex-col justify-center bg-background border-b-2 border-foreground"
  >
    <!-- Intro Section -->
    <div
      v-motion-slide-bottom
      class="flex flex-col md:flex-row items-center justify-evenly max-w-6xl mx-auto"
    >
      <section
        class="w-full flex flex-wrap md:flex-nowrap items-center justify-center text-left gap-6"
      >
        <!-- Profile Image -->
        <img
          src="/img/maple_circle.png"
          alt="Amiw Illustration"
          class="w-32 lg:w-40 flex-shrink-0 rounded-full"
        />

        <!-- Intro Text & Buttons -->
        <div
          class="w-full md:max-w-md flex flex-col items-center md:items-start space-y-3 px-6"
        >
          <h2 class="text-4xl text-primary font-bold">I am Amiw!</h2>

          <p class="text-primary text-center md:text-left font-medium">
            Full-stack developer specializing in Vue.js, Nuxt 3, and Laravel.
          </p>

          <div class="flex gap-4 justify-center md:justify-start w-full">
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
          </div>
        </div>
      </section>
    </div>

    <!-- Separator -->
    <div v-motion-slide-bottom class="flex justify-center mt-8 mb-6">
      <div class="w-1/2 border-t border-primary"></div>
    </div>

    <!-- About Section -->
    <section v-motion-slide-bottom class="max-w-3xl mx-auto px-8 text-center">
      <p class="text-primary leading-relaxed">
        I'm <b>Amirah Dzatul Himmah</b>, known as <b>Amiw</b> — a full-stack
        developer passionate about building clean, scalable, and user-friendly
        web apps. I mostly work with <b>Vue.js</b>, <b>Nuxt 3</b>,
        <b>Tailwind CSS</b>, and <b>Laravel</b>, and I thrive at the
        intersection of creativity, logic, and continuous learning.
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
