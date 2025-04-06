<script setup lang="ts">
const skills: string[] = [
  // Frontend
  "React",
  "Next.js",
  "Typescript",
  "Tailwind CSS",

  // UI Libraries (Tailwind-based)
  "ShadCN/UI",

  // Backend & Fullstack
  "Laravel",
  "Node.js",
  "PHP",
  "Docker",

  // Databases & DevOps
  "PostgreSQL",
  "MySQL",
  "Git",
  "CI/CD",
  "Linux",
  "Vercel",

  // Programming Languages
  "JavaScript",
  "Python",
  "Go",
  "C/C++",

  // Tools & Workflow
  "Postman",
];
</script>

<template>
  <section
    class="w-full pt-16 bg-[hsl(var(--alternate-background))] text-center"
  >
    <div v-motion-slide-bottom class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-primary mb-2">Technical Skills</h3>
      <p class="text-muted-foreground mb-8">
        A mix of tools, frameworks, and technologies I'm experienced with...
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="(skill, index) in skills"
          :key="skill"
          class="px-4 py-2 text-sm font-medium bg-secondary text-primary border border-primary rounded-full transition-shadow"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>
