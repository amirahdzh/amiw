<template>
  <section
    id="essence"
    class="w-full py-20 bg-background relative"
    aria-label="Personal Essence Section"
  >
    <div
      class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-12 items-start"
    >
      <!-- 🎭 Essence Quote Box -->
      <blockquote class="group relative w-full">
        <span
          class="absolute -top-4 left-3 opacity-80 select-none z-10 transition-transform duration-300 group-hover:scale-[1.01]"
          aria-hidden="true"
        >
          <Icon name="lucide:map-pin" class="w-9 h-9 text-primary" />
        </span>
        <div
          class="relative overflow-hidden p-8 bg-secondary rounded-2xl border border-r-4 border-b-4 border-primary transition duration-300 group-hover:scale-[1.01]"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-bloom"></div>
          <p class="mt-2 text-lg italic leading-relaxed text-muted-foreground">
            “A minimalist at heart, I find joy in simple things.<br /><br />
            I choose silence over noise, presence over pressure.<br /><br />
            I am a quiet wanderer — moving slowly, living fully.”
          </p>
        </div>
      </blockquote>

      <!-- 🌸 Essence Board Section -->
      <div class="group relative w-full max-w-4xl mx-auto">
        <span
          class="absolute -top-4 left-3 opacity-80 select-none z-10 transition-transform duration-300 group-hover:scale-[1.01]"
          aria-hidden="true"
        >
          <Icon name="lucide:pin" class="w-9 h-9 text-primary" />
        </span>
        <span
          class="absolute -top-6 -right-4 rotate-6 opacity-60 select-none z-10 transition-transform duration-300 group-hover:scale-[1.01]"
          aria-hidden="true"
        >
          <Icon name="lucide:sparkles" class="w-11 h-11 text-honey" />
        </span>
        <div
          class="relative overflow-hidden flex flex-col gap-10 p-10 bg-secondary rounded-2xl border border-r-4 border-b-4 border-primary transition duration-300 group-hover:scale-[1.01]"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-sage"></div>

          <!-- 📝 Title -->
          <h2 class="mt-2 text-4xl font-extrabold text-foreground">
            My Essence, In Fragments
          </h2>

          <!-- 🧠 Short Paragraph / Self-Quote -->
          <div
            class="bg-background border-l-4 border-primary px-6 py-4 rounded-xl shadow-sm"
          >
            <p class="text-lg italic leading-relaxed text-muted-foreground">
              "I move gently through the world — favoring silence over noise,
              pause over pressure, presence over productivity."
            </p>
          </div>

          <!-- 🧩 Mini Badges Grid -->
          <div
            class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-base font-semibold text-primary"
          >
            <div
              class="bg-honey/25 px-4 py-3 rounded-xl shadow transform rotate-[-2deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:sunrise" class="w-5 h-5 shrink-0" />
              Pre-dawn dreamer
            </div>
            <div
              class="bg-bloom/70 px-4 py-3 rounded-xl shadow transform rotate-[1.5deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:book-open" class="w-5 h-5 shrink-0" />
              Lost in pages
            </div>
            <div
              class="bg-sage/25 px-4 py-3 rounded-xl shadow transform rotate-[-1deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:coffee" class="w-5 h-5 shrink-0" />
              Matcha over coffee
            </div>
            <div
              class="bg-terracotta/20 px-4 py-3 rounded-xl shadow transform rotate-[2deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:sprout" class="w-5 h-5 shrink-0" />
              Minimalist soul
            </div>
            <div
              class="bg-honey/25 px-4 py-3 rounded-xl shadow transform rotate-[-1.5deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:compass" class="w-5 h-5 shrink-0" />
              Quiet wanderer
            </div>
            <div
              class="bg-bloom/70 px-4 py-3 rounded-xl shadow transform rotate-[1deg] hover:rotate-0 transition inline-flex items-center gap-2"
            >
              <Icon name="lucide:gamepad-2" class="w-5 h-5 shrink-0" />
              Nightly quests
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
