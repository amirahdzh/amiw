<script setup lang="ts">
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

// Latest first. Everything is visible on the page — no click-to-open dialog.
const roles: Role[] = [
  {
    // No logo file yet, so the row falls back to a monogram circle.
    company: "Klepon",
    role: "Software Engineer",
    period: "Jul 2026 – Present",
    description:
      "I built the licensing platform for a Revit plugin used in hydraulic design: accounts, licenses and seats, with admin and customer portals. I also set up CI/CD to Linux servers, with database migrations and health-checked deploys, and built the marketing site.",
    tools: [
      "C#/.NET (ASP.NET Core 8)",
      "PostgreSQL",
      "EF Core",
      "Linux",
      "GitHub Actions",
      "xUnit",
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

      <ol class="mt-9 border-b border-border">
        <li
          v-for="role in roles"
          :key="role.company"
          class="grid gap-3 border-t border-border py-6 md:grid-cols-[10.5rem_16rem_minmax(0,1fr)] md:items-start md:gap-7"
        >
          <div class="md:pt-1.5">
            <p class="font-mono text-[13.5px] font-bold text-foreground">
              {{ role.period }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span
              v-if="role.logo"
              class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary"
            >
              <img :src="role.logo" alt="" class="h-full w-full object-contain p-2" />
            </span>
            <span
              v-else
              aria-hidden="true"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-mono text-lg font-bold text-foreground"
            >
              {{ role.company.charAt(0) }}
            </span>
            <div class="min-w-0">
              <h3 class="font-mono text-lg font-bold leading-tight text-foreground">
                {{ role.company }}
              </h3>
              <p class="mt-px text-sm text-muted-foreground">{{ role.role }}</p>
            </div>
          </div>

          <div class="grid gap-2">
            <p class="max-w-[58ch] text-base leading-relaxed text-foreground">
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
        </li>
      </ol>
    </div>
  </section>
</template>
