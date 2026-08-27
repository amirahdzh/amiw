<script setup lang="ts">
import { nextTick, ref } from "vue";
import emblaCarouselVue from "embla-carousel-vue";

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: false,
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
});

const expandedIndex = ref<number | null>(null);

async function toggleExpand(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
  // Card width just changed, so the carousel's scroll bounds/snap points
  // are stale until embla re-measures the track.
  await nextTick();
  emblaApi.value?.reInit();
}

const work = [
  {
    company: "PT Sanbersy",
    role: "Full-stack Web Developer",
    period: "Feb 2025 - Present",
    logo: "/img/logo/sanbersy.png",
    link: "https://sanbersy.com/",
    accentBg: "bg-sage",
    description:
      "Collaborated on web-based projects for academic and nonprofit institutions. Contributed to the development of a conference management system and a donation platform for Rumah Amal Salman. Responsible for both frontend and backend development tasks, utilizing Laravel and Bootstrap frameworks.",
    skills: ["Laravel", "Bootstrap", "Vue.js", "MySQL"],
  },
  {
    company: "PT Mega Giga Solusindo",
    role: "Frontend Developer",
    period: "Mei 2025 - Sept 2025",
    logo: "/img/logo/mgs.webp",
    link: "https://www.megagigasolusindo.co.id/",
    accentBg: "bg-terracotta",
    description:
      "Joined as an in-house frontend developer and assigned to key client projects. Contributed to various frontend development tasks, including client-specific deployments. Communicated with project stakeholders to ensure alignment on technical requirements.",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Typescript",
      "Vite",
      "Git",
    ],
  },
  {
    company: "PT PLN Icon Plus",
    role: "Frontend Developer (Via PT MGS)",
    period: "June 2025 - July 2025",
    logo: "/img/logo/icon+.webp",
    link: "https://plniconplus.co.id/",
    accentBg: "bg-honey",
    description:
      "Assigned by PT Mega Giga Solusindo as a contract frontend developer for bug fixing and code improvements for Alih Daya PLN application. Worked closely with the client team on short-term goals.",
    skills: ["Vue.js", "REST API", "Git", "Tailwind"],
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

<template>
  <section
    id="experience"
    class="w-full py-16 bg-[hsl(var(--alternate-background))]"
  >
    <div class="px-6 max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-foreground mb-6">
        💼 Work Experience
      </h2>

      <div>
        <h3 class="text-lg font-semibold text-foreground mb-3">
          Where I've worked
        </h3>
        <p class="text-xs text-muted-foreground mb-4 italic">
          🖱️ Drag sideways to explore
        </p>

        <div
          ref="emblaRef"
          class="overflow-hidden cursor-grab active:cursor-grabbing select-none -mx-1"
        >
          <div class="journey-track relative flex items-start gap-6 px-1 pb-2">
            <div
              v-for="(job, index) in work"
              :key="index"
              v-motion-fade-visible
              class="relative z-10 shrink-0 transition-[width] duration-300 ease-in-out"
              :class="expandedIndex === index ? 'w-96' : 'w-60'"
            >
              <!-- Marker on the timeline -->
              <div
                class="w-9 h-9 rounded-full border-2 border-primary ring-4 ring-background flex items-center justify-center overflow-hidden mb-4"
                :class="job.accentBg"
              >
                <img
                  :src="job.logo"
                  alt=""
                  class="w-full h-full object-contain p-1"
                />
              </div>

              <div
                @click="toggleExpand(index)"
                class="relative overflow-hidden bg-secondary rounded-2xl p-4 border border-r-4 border-b-4 border-primary cursor-pointer select-none transition duration-300"
                :class="{ 'hover:scale-[1.02]': expandedIndex !== index }"
              >
                <div
                  class="absolute top-0 left-0 right-0 h-1.5"
                  :class="job.accentBg"
                ></div>
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p
                      class="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1"
                    >
                      {{ job.period }}
                    </p>
                    <h4 class="font-bold text-sm text-foreground mb-1">
                      <a
                        :href="job.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:underline"
                        @click.stop
                      >
                        {{ job.company }}
                      </a>
                    </h4>
                  </div>
                  <span class="shrink-0 mt-1 text-sm">
                    {{ expandedIndex === index ? "▲" : "▼" }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground">{{ job.role }}</p>

                <transition name="fade">
                  <div
                    v-if="expandedIndex === index"
                    class="mt-3 pt-3 border-t border-border text-xs text-muted-foreground leading-relaxed space-y-2"
                  >
                    <p>{{ job.description }}</p>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="skill in job.skills"
                        :key="skill"
                        class="px-2 py-0.5 rounded bg-[hsl(var(--amiw)/0.12)] text-[10px] font-mono text-primary border border-[hsl(var(--amiw))]"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
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
          </li>
        </ul>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.journey-track::before {
  content: "";
  position: absolute;
  left: 20px;
  right: 20px;
  top: 18px;
  height: 2px;
  background: hsl(var(--primary) / 0.3);
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
