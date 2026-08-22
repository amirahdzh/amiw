<script setup lang="ts">
const innerJourney = [
  {
    year: "2025",
    title: "Beauty in Simplicity",
    description: "Minimalism brought clarity to my mind and space.",
    accentBg: "bg-sage",
  },
  {
    year: "2024",
    title: "Letting Go of Control",
    description: "I learned to surrender what's beyond me and found peace.",
    accentBg: "bg-honey",
  },

  {
    year: "2022",
    title: "Reconnected with Faith",
    description: "Returned quietly to my spiritual roots.",
    accentBg: "bg-terracotta",
  },
];

const journeyItems = [
  {
    year: "2025",
    title: "Freelance Dev @ Sanbersy",
    description: "Backend dev using <strong>Laravel</strong> (remote).",
    emoji: "💻",
    accentBg: "bg-terracotta",
  },
  {
    year: "2024",
    title: "Graduated B.Cs (Bachelor of Computer Science)",
    description:
      "Graduated from <strong>Universitas Pendidikan Indonesia</strong>.",
    emoji: "🎓",
    accentBg: "bg-honey",
  },
  {
    year: "2023",
    title: "Bootcamp & Projects",
    description:
      "Built fullstack apps with <strong>Vue</strong> & <strong>Laravel</strong>.",
    emoji: "🛠️",
    accentBg: "bg-sage",
  },
  {
    year: "2021",
    title: "Started Coding",
    description:
      "Met <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.",
    emoji: "🌱",
    accentBg: "bg-bloom",
  },
];

const highlight = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>");
</script>

<template>
  <section id="journey" class="py-16 px-6 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-foreground mb-6">🛤️ Journey</h2>
    <p class="text-muted-foreground mb-10 text-sm">
      A mix of quiet shifts within and visible milestones outside ✨
    </p>

    <!-- Inner Shifts -->
    <div class="mb-12">
      <h3 class="text-lg font-semibold text-foreground mb-3">
        🌊 Inner Shifts
      </h3>
      <ul class="grid md:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in innerJourney"
          :key="'inner-' + index"
          v-motion-fade-visible
          class="relative overflow-hidden bg-secondary rounded-2xl p-4 border border-r-4 border-b-4 border-primary transition hover:scale-[1.02] duration-300"
        >
          <div class="absolute top-0 left-0 right-0 h-1.5" :class="item.accentBg"></div>
          <p class="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
            {{ item.year }}
          </p>
          <h4 class="font-bold text-sm text-foreground mb-1">
            {{ item.title }}
          </h4>
          <p class="text-xs text-muted-foreground">{{ item.description }}</p>
        </li>
      </ul>
    </div>

    <!-- Visible Milestones -->
    <div>
      <h3 class="text-lg font-semibold text-foreground mb-3">
        🏁 Visible Milestones
      </h3>
      <ol class="relative border-l-2 border-primary/30 ml-4">
        <li
          v-for="(item, index) in journeyItems"
          :key="'outer-' + index"
          v-motion-fade-visible
          class="relative pl-8 pb-8 last:pb-0"
        >
          <!-- Marker on the timeline -->
          <span
            class="absolute -left-[19px] top-0 w-9 h-9 rounded-full border-2 border-primary ring-4 ring-background flex items-center justify-center text-base"
            :class="item.accentBg"
          >
            {{ item.emoji }}
          </span>

          <div
            class="relative overflow-hidden bg-secondary rounded-2xl p-4 border border-r-4 border-b-4 border-primary transition hover:scale-[1.02] duration-300"
          >
            <div class="absolute top-0 left-0 right-0 h-1.5" :class="item.accentBg"></div>
            <p class="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
              {{ item.year }}
            </p>
            <h4 class="font-bold text-sm text-foreground mb-1">
              {{ item.title }}
            </h4>
            <p
              class="text-xs text-muted-foreground"
              v-html="highlight(item.description)"
            />
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
