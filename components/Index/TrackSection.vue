<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Placement {
  company: string;
  logo: string;
  period: string;
  summary: string;
}

interface Role {
  company: string;
  role: string;
  period: string;
  logo?: string;
  description: string;
  tools: string[];
  placement?: Placement;
}

// The companies stack vertically on wide screens and become a row of tabs on a
// phone. The arrow keys follow: up/down in the stack, left/right in the row.
const orientation = ref<"horizontal" | "vertical">("horizontal");
let query: MediaQueryList | undefined;
const sync = () => {
  orientation.value = query?.matches ? "vertical" : "horizontal";
};
onMounted(() => {
  query = window.matchMedia("(min-width: 768px)");
  sync();
  query.addEventListener("change", sync);
});
onUnmounted(() => query?.removeEventListener("change", sync));

// Latest first. One company is shown at a time: pick it in the tabs. All of the
// text is still in the page (hidden, not removed), so search engines can read it.
const roles: Role[] = [
  {
    // No logo file yet, so the row falls back to a monogram circle.
    company: "Klepon",
    role: "Software Engineer",
    period: "Jul 2026 – Present",
    description:
      "I built the licensing platform for a Revit plugin used in hydraulic design: accounts, licenses and seats, with admin and customer portals. It has its own GDPR features: people can export their data and delete their account themselves, old logs delete automatically, and the documentation is written for a lawyer to review. I set up CI/CD to Linux servers with health-checked deploys, built the Prefab Hub and the marketing site, and wrote the development guide for the second developer. We're preparing a beta with several companies in the EU.",
    tools: [
      "C#/.NET (ASP.NET Core 8)",
      "PostgreSQL",
      "EF Core",
      "Docker",
      "Linux",
      "GitHub Actions",
      "xUnit",
      "Astro",
    ],
  },
  {
    company: "Sanbersy",
    role: "Fullstack Web Developer",
    period: "Feb 2025 – Apr 2026",
    logo: "/img/logo/sanbersy.png",
    description:
      "I built web projects for academic and nonprofit institutions, including a conference management system and a donation platform for Rumah Amal Salman. I worked on both the frontend and the backend.",
    tools: ["Laravel", "Bootstrap", "Vue.js", "MySQL"],
  },
  {
    company: "PT MGS",
    role: "Frontend Developer",
    period: "May 2025 – Sep 2025",
    logo: "/img/logo/mgs.webp",
    description:
      "I was an in-house frontend developer on client projects, including client-specific deployments. I worked with stakeholders to agree on technical requirements.",
    tools: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Git"],
    // PLN was a client MGS staffed this role onto, so it hangs off MGS as one line.
    placement: {
      company: "PT PLN Icon Plus",
      // Just the square emblem — the full logo is a wide wordmark that
      // would be unreadable at this size.
      logo: "/img/logo/pln-icon.webp",
      period: "Jun – Jul 2025",
      summary:
        "bug fixing and code improvements on the Alih Daya PLN application.",
    },
  },
];
</script>

<template>
  <section id="experience" class="w-full py-16 md:py-20 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="heading-marker text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Work experience
      </h2>
      <p class="mt-2 text-base text-muted-foreground">Where I've worked.</p>

      <Tabs
        :default-value="roles[0].company"
        :orientation="orientation"
        class="mt-9 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12"
      >
        <TabsList
          class="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 text-muted-foreground sm:gap-3 md:w-auto md:flex-col md:items-stretch md:gap-0 md:self-start md:overflow-visible md:border-b-0 md:border-l"
        >
          <TabsTrigger
            v-for="role in roles"
            :key="role.company"
            :value="role.company"
            class="-mb-px justify-start rounded-none border-b-[3px] border-transparent bg-transparent px-2.5 py-3 font-mono text-[15px] font-bold shadow-none transition-colors first:pl-0 hover:text-foreground data-[state=active]:border-pink data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none motion-reduce:transition-none sm:px-3 md:mb-0 md:-ml-px md:border-b-0 md:border-l-[3px] md:px-4 md:py-3.5 md:first:pl-4"
          >
            <span class="flex items-center gap-2.5">
              <span
                v-if="role.logo"
                class="hidden h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary sm:flex"
              >
                <img :src="role.logo" alt="" class="h-full w-full object-contain p-1.5" />
              </span>
              <span
                v-else
                aria-hidden="true"
                class="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground sm:flex"
              >
                {{ role.company.charAt(0) }}
              </span>
              {{ role.company }}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="role in roles"
          :key="role.company"
          :value="role.company"
          force-mount
          class="mt-7 min-w-0 data-[state=inactive]:hidden md:mt-0"
        >
          <!-- Role on the left, dates at the far right. -->
          <div class="md:pt-[17px]">
            <h3 class="font-mono text-xl font-bold leading-tight text-foreground">
              {{ role.role }}
            </h3>
            <p class="mt-1 font-mono text-[13px] text-muted-foreground">{{ role.period }}</p>
          </div>

          <div class="mt-4 grid gap-2">
            <p class="max-w-[70ch] text-base leading-relaxed text-foreground">
              {{ role.description }}
            </p>
            <p
              class="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[13px] text-muted-foreground"
            >
              <template v-for="(tool, i) in role.tools" :key="tool">
                <span v-if="i > 0" aria-hidden="true" class="text-pink">·</span>
                <span>{{ tool }}</span>
              </template>
            </p>
            <p
              v-if="role.placement"
              class="flex items-center gap-2.5 pt-1 text-[14.5px] leading-snug text-muted-foreground"
            >
              <span aria-hidden="true" class="text-amiw">↳</span>
              <img
                :src="role.placement.logo"
                alt=""
                class="h-7 w-7 shrink-0 rounded-full border border-border object-cover"
              />
              <span>
                <b class="font-semibold text-foreground"
                  >Placed at {{ role.placement.company }}</b
                >
                ({{ role.placement.period }}): {{ role.placement.summary }}
              </span>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
