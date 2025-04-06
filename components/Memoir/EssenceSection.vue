<template>
  <section
    id="essence"
    class="w-full py-20 bg-background relative"
    aria-label="Personal Essence Section"
  >
    <div
      class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-12 items-center"
    >
      <!-- 🎭 Essence Quote Box -->
      <blockquote class="relative w-full">
        <div
          class="p-8 bg-secondary rounded-2xl hover:border-primary hover:border-r-4 hover:border-b-8 transform rotate-[-1.5deg] transition hover:scale-[1.01] duration-300"
        >
          <p class="text-lg italic leading-relaxed text-muted-foreground">
            “A minimalist at heart, I find joy in simple things.<br /><br />
            I choose silence over noise, presence over pressure.<br /><br />
            I am a quiet wanderer — moving slowly, living fully.”
          </p>
        </div>
        <span
          class="absolute -top-4 -left-4 text-4xl opacity-80 select-none"
          aria-hidden="true"
        >
          📍
        </span>
      </blockquote>

      <!-- 🌸 Essence Board Section -->
      <div
        class="relative flex flex-col gap-10 p-10 w-full max-w-4xl mx-auto bg-secondary rounded-3xl hover:border-primary hover:border-b-4 hover:border-r-4 transform hover:scale-[1.01] transition duration-300"
      >
        <!-- 📝 Title with Sticker Emoji -->
        <h2
          class="text-4xl font-extrabold flex items-center gap-3 text-foreground"
        >
          📌 <span>My Essence, In Fragments</span>
        </h2>

        <!-- 🧠 Short Paragraph / Self-Quote -->
        <div
          class="bg-background border-l-4 border-primary px-6 py-4 rounded-xl shadow-sm transform rotate-[-0.5deg]"
        >
          <p class="text-lg italic leading-relaxed text-muted-foreground">
            "I move gently through the world — favoring silence over noise,
            pause over pressure, presence over productivity."
          </p>
        </div>

        <!-- 🧩 Mini Badges Grid -->
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-base font-medium text-muted-foreground"
        >
          <div
            class="bg-yellow-100/60 text-yellow-900 px-4 py-3 rounded-xl shadow transform rotate-[-2deg] hover:rotate-0 transition"
          >
            🕊️ Pre-dawn dreamer
          </div>
          <div
            class="bg-pink-100/60 text-pink-900 px-4 py-3 rounded-xl shadow transform rotate-[1.5deg] hover:rotate-0 transition"
          >
            📖 Lost in pages
          </div>
          <div
            class="bg-green-100/60 text-green-900 px-4 py-3 rounded-xl shadow transform rotate-[-1deg] hover:rotate-0 transition"
          >
            🍵 Matcha over coffee
          </div>
          <div
            class="bg-blue-100/60 text-blue-900 px-4 py-3 rounded-xl shadow transform rotate-[2deg] hover:rotate-0 transition"
          >
            🌱 Minimalist soul
          </div>
          <div
            class="bg-purple-100/60 text-purple-900 px-4 py-3 rounded-xl shadow transform rotate-[-1.5deg] hover:rotate-0 transition"
          >
            🌍 Quiet wanderer
          </div>
          <div
            class="bg-indigo-100/60 text-indigo-900 px-4 py-3 rounded-xl shadow transform rotate-[1deg] hover:rotate-0 transition"
          >
            🎮 Nightly quests
          </div>
        </div>

        <!-- 🎀 Decorative Element -->
        <span
          class="absolute -top-6 -right-4 text-5xl rotate-6 opacity-60 select-none"
          aria-hidden="true"
        >
          💫
        </span>
      </div>
    </div>
  </section>
</template>
