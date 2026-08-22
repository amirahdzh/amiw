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
      <blockquote class="relative w-full">
        <span
          class="absolute -top-4 -left-4 text-4xl opacity-80 select-none z-10"
          aria-hidden="true"
        >
          📍
        </span>
        <div
          class="relative overflow-hidden p-8 bg-secondary rounded-2xl border border-r-4 border-b-4 border-primary transition hover:scale-[1.01] duration-300"
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
      <div class="relative w-full max-w-4xl mx-auto">
        <span
          class="absolute -top-6 -right-4 text-5xl rotate-6 opacity-60 select-none z-10"
          aria-hidden="true"
        >
          💫
        </span>
        <div
          class="relative overflow-hidden flex flex-col gap-10 p-10 bg-secondary rounded-2xl border border-r-4 border-b-4 border-primary transition hover:scale-[1.01] duration-300"
        >
          <div class="absolute top-0 left-0 right-0 h-2 bg-sage"></div>

          <!-- 📝 Title with Sticker Emoji -->
          <h2
            class="mt-2 text-4xl font-extrabold flex items-center gap-3 text-foreground"
          >
            📌 <span>My Essence, In Fragments</span>
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
              class="bg-honey/25 px-4 py-3 rounded-xl shadow transform rotate-[-2deg] hover:rotate-0 transition"
            >
              🕊️ Pre-dawn dreamer
            </div>
            <div
              class="bg-bloom/70 px-4 py-3 rounded-xl shadow transform rotate-[1.5deg] hover:rotate-0 transition"
            >
              📖 Lost in pages
            </div>
            <div
              class="bg-sage/25 px-4 py-3 rounded-xl shadow transform rotate-[-1deg] hover:rotate-0 transition"
            >
              🍵 Matcha over coffee
            </div>
            <div
              class="bg-terracotta/20 px-4 py-3 rounded-xl shadow transform rotate-[2deg] hover:rotate-0 transition"
            >
              🌱 Minimalist soul
            </div>
            <div
              class="bg-honey/25 px-4 py-3 rounded-xl shadow transform rotate-[-1.5deg] hover:rotate-0 transition"
            >
              🌍 Quiet wanderer
            </div>
            <div
              class="bg-bloom/70 px-4 py-3 rounded-xl shadow transform rotate-[1deg] hover:rotate-0 transition"
            >
              🎮 Nightly quests
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
