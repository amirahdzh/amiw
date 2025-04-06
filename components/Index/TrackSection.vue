<template>
  <section class="w-full pt-8 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Work Experience -->
        <div v-motion-slide-left>
          <h3 class="text-xl font-semibold mb-6">Work Experience</h3>
          <ul class="space-y-1">
            <li
              v-for="(job, index) in work"
              :key="index"
              v-motion-fade
              class="transition duration-200 hover:scale-[1.01]"
            >
              <a
                v-if="job.link"
                :href="job.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-start group p-2 rounded-lg bg-secondary border-2 border-primary transition-colors"
              >
                <img
                  :src="job.logo"
                  alt="logo"
                  class="w-10 h-10 rounded-full object-contain mr-4 mt-1"
                />
                <div class="flex-1">
                  <div
                    class="text-base font-semibold text-foreground group-hover:text-[hsl(var(--amiw))] transition-colors"
                  >
                    {{ job.company }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{ job.role }}
                  </div>
                </div>
                <div
                  class="text-sm text-muted-foreground text-right whitespace-nowrap ml-4"
                >
                  {{ job.period }}
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- Education -->
        <div v-motion-slide-right>
          <h3 class="text-xl font-semibold mb-6">Education</h3>
          <ul class="space-y-3">
            <li
              v-for="(edu, index) in education"
              :key="index"
              v-motion-fade
              class="transition duration-200 hover:scale-[1.01]"
            >
              <a
                v-if="edu.link"
                :href="edu.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-start group p-2 rounded-lg bg-secondary border-2 border-primary transition-colors"
              >
                <img
                  :src="edu.logo"
                  alt="logo"
                  class="w-10 h-10 rounded-full object-contain mr-4 mt-1"
                />
                <div class="flex-1">
                  <div
                    class="text-base font-semibold text-foreground group-hover:text-[hsl(var(--amiw))] transition-colors"
                  >
                    {{ edu.school }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{ edu.degree }}
                  </div>
                </div>
                <div
                  class="text-sm text-muted-foreground text-right whitespace-nowrap ml-4"
                >
                  {{ edu.period }}
                </div>
              </a>
              <div v-else class="flex items-start group p-2 rounded-lg">
                <img
                  :src="edu.logo"
                  alt="logo"
                  class="w-10 h-10 rounded-full object-contain mr-4 mt-1"
                />
                <div class="flex-1">
                  <div
                    class="text-base font-semibold text-foreground group-hover:text-[hsl(var(--amiw))] transition-colors"
                  >
                    {{ edu.school }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{ edu.degree }}
                  </div>
                </div>
                <div
                  class="text-sm text-muted-foreground text-right whitespace-nowrap ml-4"
                >
                  {{ edu.period }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const work = [
  {
    company: "PT Sanbersy",
    role: "Freelance Full-stack Web Developer",
    period: "Feb 2025 - Present",
    logo: "/img/logo/sanbersy.png",
    link: "https://sanbersy.com/",
  },
];

const education = [
  {
    school: "Universitas Pendidikan Indonesia",
    degree: "Computer Science - Bachelor's Degree",
    period: "2020 - 2024",
    logo: "/img/logo/upi.jpg",
    link: "https://www.upi.edu/",
  },
  {
    school: "SMAN 5 Depok",
    degree: "Natural Science - High School",
    period: "2017 - 2020",
    logo: "/img/logo/smanli.png",
    link: "https://sman5depok.sch.id/",
  },
];
</script>
