<template>
  <section class="w-full pt-8 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-5xl mx-auto px-6">
      <!-- <div class="grid md:grid-cols-2 gap-12"> -->
      <div class="">
        <!-- Work Experience -->
        <div>
          <h3 class="text-xl font-semibold mb-6">Work Experience</h3>
          <ul class="space-y-3">
            <li
              v-for="(job, index) in work"
              :key="index"
              class="transition-all duration-300 hover:scale-[1.01]"
            >
              <div
                @click="toggleExpand(index)"
                :class="[
                  'flex flex-col items-start group p-2 rounded-lg border-2 cursor-pointer select-none transition-all duration-300 overflow-hidden bg-secondary',
                  expandedIndex === index
                    ? 'border-[hsl(var(--amiw))] bg-muted  max-h-64'
                    : 'border-primary max-h-20',
                ]"
                style="min-height: 64px"
              >
                <div class="flex w-full">
                  <img
                    :src="job.logo"
                    alt="logo"
                    class="w-10 h-10 rounded-full object-contain mr-4 mt-1"
                  />
                  <div class="flex-1">
                    <div
                      class="text-base font-semibold text-foreground group-hover:text-[hsl(var(--amiw))] transition-colors"
                    >
                      <a
                        v-if="job.link"
                        :href="job.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline hover:text-[hsl(var(--amiw))]"
                        @click.stop
                      >
                        {{ job.company }}
                      </a>
                      <span v-else>{{ job.company }}</span>
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
                  <span class="ml-2 text-lg">
                    {{ expandedIndex === index ? "▲" : "▼" }}
                  </span>
                </div>
                <transition name="fade">
                  <div
                    v-if="expandedIndex === index"
                    class="w-full mt-2 p-3 text-sm text-foreground transition-all duration-300"
                  >
                    {{ job.description }}
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>

        <!-- Education -->
        <!-- <div v-motion-slide-right>
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
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const expandedIndex = ref<number | null>(null);

function toggleExpand(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}

const work = [
  {
    company: "PT Mega Giga Solusindo",
    role: "Frontend Developer",
    period: "Mei 2025 - Present",
    logo: "/img/logo/mgs.webp",
    link: "https://www.megagigasolusindo.co.id/",
    description:
      "Joined as an in-house frontend developer and assigned to key client projects. Contributed to various frontend development tasks, including client-specific deployments. Communicated with project stakeholders to ensure alignment on technical requirements.",
  },
  {
    company: "PT PLN Icon Plus",
    role: "Frontend Developer (Via PT MGS)",
    period: "June 2025 - Present",
    logo: "/img/logo/icon+.webp",
    link: "https://plniconplus.co.id/",
    description:
      "Assigned by PT Mega Giga Solusindo as a contract frontend developer for bug fixing and code improvements for Alih Daya PLN application. Worked closely with the client team on short-term goals.",
  },
  {
    company: "PT Sanbersy",
    role: "Freelance Full-stack Web Developer",
    period: "Feb 2025 - Present",
    logo: "/img/logo/sanbersy.png",
    link: "https://sanbersy.com/",
    description:
      "Collaborated on web-based projects for academic and nonprofit institutions. Contributed to the development of a conference management system and a donation platform for Rumah Amal Salman. Responsible for both frontend and backend development tasks, utilizing Laravel and Bootstrap frameworks.",
  },
];

console.log("Work items:", work.length, work);

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
