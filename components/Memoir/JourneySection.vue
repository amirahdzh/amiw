<script setup lang="ts">
const innerJourney = [
  {
    year: "2025",
    title: "Beauty in Simplicity",
    description: "Minimalism brought clarity to my mind and space.",
  },
  {
    year: "2024",
    title: "Letting Go of Control",
    description: "I learned to surrender what's beyond me and found peace.",
  },

  {
    year: "2022",
    title: "Reconnected with Faith",
    description: "Returned quietly to my spiritual roots.",
  },
];

const journeyItems = [
  {
    year: "2025",
    title: "Freelance Dev @ Sanbersy",
    description: "Backend dev using <strong>Laravel</strong> (remote).",
    emoji: "💻",
  },
  {
    year: "2024",
    title: "Graduated B.Cs (Bachelor of Computer Science)",
    description:
      "Graduated from <strong>Universitas Pendidikan Indonesia</strong>.",
    emoji: "🎓",
  },
  {
    year: "2023",
    title: "Bootcamp & Projects",
    description:
      "Built fullstack apps with <strong>Vue</strong> & <strong>Laravel</strong>.",
    emoji: "🛠️",
  },
  {
    year: "2021",
    title: "Started Coding",
    description:
      "Met <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.",
    emoji: "🌱",
  },
];

const highlight = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>");
</script>

<template>
  <section id="journey" class="py-16 px-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-foreground mb-6">🛤️ Journey</h2>
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
          class="bg-[hsl(var(--alternate-background))] rounded-xl p-4 border border-border hover:shadow-sm transition"
        >
          <p class="text-xs text-muted-foreground mb-1">{{ item.year }}</p>
          <h4 class="font-semibold text-sm text-foreground mb-1">
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
      <ul class="grid md:grid-cols-2 gap-4">
        <li
          v-for="(item, index) in journeyItems"
          :key="'outer-' + index"
          v-motion-fade-visible
          class="bg-[hsl(var(--alternate-background))] rounded-xl p-4 border border-border hover:shadow-sm transition flex items-start gap-3"
        >
          <div class="text-xl">{{ item.emoji }}</div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">{{ item.year }}</p>
            <h4 class="font-semibold text-sm text-foreground mb-1">
              {{ item.title }}
            </h4>
            <p
              class="text-xs text-muted-foreground"
              v-html="highlight(item.description)"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
