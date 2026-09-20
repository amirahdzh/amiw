<script setup lang="ts">
import { computed, ref } from "vue";
import TimelineCard from "./TimelineCard.vue";
import TimelineNestedCard from "./TimelineNestedCard.vue";

type Color = "amiw" | "terracotta" | "sage";

interface Nested {
  company: string;
  role: string;
  period: string;
  logo?: string;
  color: Color;
  details: string;
  tools: string[];
}

interface Node {
  id: string;
  company: string;
  role?: string;
  period: string;
  logo?: string;
  color: Color;
  details?: string;
  tools?: string[];
  nested?: Nested;
}

const current: Node = {
  id: "current",
  company: "PT xxx xxxxxxxxx",
  role: "Software Engineer",
  period: "Jul 2026 - Present",
  color: "amiw",
};

const sanbersy: Node = {
  id: "sanbersy",
  company: "Sanbersy",
  role: "Fullstack Web Developer",
  period: "Feb 2025 - Apr 2026",
  logo: "/img/logo/sanbersy.png",
  color: "amiw",
  details:
    "Collaborated on web-based projects for academic and nonprofit institutions. Contributed to the development of a conference management system and a donation platform for Rumah Amal Salman. Responsible for both frontend and backend development tasks, utilizing Laravel and Bootstrap frameworks.",
  tools: ["Laravel", "Bootstrap", "Vue.js", "MySQL"],
};

// PLN was a client MGS staffed this role onto, so its details appear inside
// MGS's own detail dialog rather than as its own node on the axis.
const mgs: Node = {
  id: "mgs",
  company: "PT MGS",
  role: "Frontend Developer",
  period: "May 2025 - Sep 2025",
  logo: "/img/logo/mgs.webp",
  color: "terracotta",
  details:
    "Joined as an in-house frontend developer and assigned to key client projects. Contributed to various frontend development tasks, including client-specific deployments. Communicated with project stakeholders to ensure alignment on technical requirements.",
  tools: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Vite", "Git"],
  nested: {
    company: "PT PLN Icon Plus",
    role: "Frontend Developer (via MGS)",
    period: "Jun 2025 - Sep 2025",
    logo: "/img/logo/icon+.webp",
    color: "sage",
    details:
      "Assigned by MGS as a contract frontend developer for bug fixing and code improvements on the Alih Daya PLN application. Worked closely with the client team on short-term goals.",
    tools: ["Vue.js", "REST API", "Git", "Tailwind"],
  },
};

const nodes = [current, sanbersy, mgs];

// Hand-placed, not to scale — this timeline reads as a sketch, not a real
// month-by-month ruler. Reversed (latest first) so it reads left to right.
// The "gap" tick is a decorative break, not a real date.
const X = {
  jul26: 80,
  apr26: 210,
  gap: 340,
  sep25: 470,
  may25: 600,
  feb25: 730,
};
const AXIS_WIDTH = 820;
const ticks: { label: string; x: number; color?: Color }[] = [
  { label: "Jul", x: X.jul26, color: "amiw" },
  { label: "Apr", x: X.apr26, color: "amiw" },
  { label: "···", x: X.gap },
  { label: "Sep", x: X.sep25, color: "terracotta" },
  { label: "May", x: X.may25, color: "terracotta" },
  { label: "Feb", x: X.feb25, color: "amiw" },
];

// Vertical geometry of the desktop diagram. Cards are fixed-size now (detail
// lives in the dialog, not inline), so this is just a static, tight layout —
// no growth to account for. Each range segment sits its own SEGMENT_GAP away
// from the axis line (not on top of it), with a CARD_GAP-long dotted
// connector bridging segment to card.
const AXIS_TOP = 100;
const SEGMENT_GAP = 8;
const CARD_GAP = 14;
// Clears the tick-label row (which sits ~14-31px below the axis) so
// Sanbersy's segment/circles don't collide with the "Apr"/"Feb" labels.
const BELOW_SEGMENT_GAP = 42;
const DIAGRAM_HEIGHT = 236;
const ABOVE_CONNECTOR_TOP = AXIS_TOP - SEGMENT_GAP - CARD_GAP;
const ABOVE_CARD_BOTTOM = DIAGRAM_HEIGHT - ABOVE_CONNECTOR_TOP;
const BELOW_CONNECTOR_TOP = AXIS_TOP + BELOW_SEGMENT_GAP;
const BELOW_CARD_TOP = BELOW_CONNECTOR_TOP + CARD_GAP;

const mgsAnchorX = (X.sep25 + X.may25) / 2;
const sanbersyAnchorX = (X.apr26 + X.feb25) / 2;

// A single shared detail dialog — clicking any card selects it, clicking
// outside (or Escape) closes it. No explicit close button.
const selectedId = ref<string | null>(null);
const selected = computed(
  () => nodes.find((n) => n.id === selectedId.value) ?? null,
);
const isDialogOpen = computed({
  get: () => selectedId.value !== null,
  set: (open: boolean) => {
    if (!open) selectedId.value = null;
  },
});

const colorClasses: Record<
  Color,
  { border: string; text: string; ring: string; bg: string }
> = {
  amiw: {
    border: "border-amiw",
    text: "text-amiw",
    ring: "focus-visible:ring-amiw",
    bg: "bg-amiw",
  },
  terracotta: {
    border: "border-terracotta",
    text: "text-terracotta",
    ring: "focus-visible:ring-terracotta",
    bg: "bg-terracotta",
  },
  sage: {
    border: "border-sage",
    text: "text-sage",
    ring: "focus-visible:ring-sage",
    bg: "bg-sage",
  },
};
</script>

<template>
  <section
    id="experience"
    class="w-full py-16 bg-[hsl(var(--alternate-background))] overflow-hidden"
  >
    <div class="px-6 max-w-5xl mx-auto">
      <h2
        class="text-3xl font-bold text-foreground mb-6 inline-flex items-center gap-2"
      >
        <Icon name="lucide:briefcase" class="w-7 h-7" />
        Work Experience
      </h2>

      <h3 class="text-lg font-semibold text-foreground mb-1">
        Where I've worked
      </h3>
      <p
        class="text-xs text-muted-foreground mb-5 italic inline-flex items-center gap-1.5"
      >
        <Icon name="lucide:mouse-pointer-click" class="w-3.5 h-3.5" />
        Tap a card for details
      </p>

      <!-- Desktop / tablet: axis-based timeline, latest role on the left -->
      <div class="hidden md:block overflow-x-auto -mx-1 px-1">
        <div
          class="relative"
          :style="{
            width: `${AXIS_WIDTH}px`,
            height: `${DIAGRAM_HEIGHT}px`,
          }"
          v-motion-fade-visible
        >
          <!-- Current — fixed above the axis -->
          <div
            class="absolute left-5"
            :style="{ bottom: `${ABOVE_CARD_BOTTOM}px` }"
          >
            <TimelineCard :node="current" @select="selectedId = current.id" />
          </div>
          <span
            class="absolute border-l-2 border-dotted"
            :class="colorClasses.amiw.border"
            :style="{ left: `${X.jul26}px`, top: `${ABOVE_CONNECTOR_TOP}px`, height: `${CARD_GAP}px` }"
          ></span>

          <!-- MGS — fixed above the axis -->
          <div
            class="absolute -translate-x-1/2"
            :style="{
              left: `${mgsAnchorX}px`,
              bottom: `${ABOVE_CARD_BOTTOM}px`,
            }"
          >
            <TimelineCard :node="mgs" @select="selectedId = mgs.id" />
          </div>
          <span
            class="absolute -translate-x-1/2 border-l-2 border-dotted"
            :class="colorClasses.terracotta.border"
            :style="{
              left: `${mgsAnchorX}px`,
              top: `${ABOVE_CONNECTOR_TOP}px`,
              height: `${CARD_GAP}px`,
            }"
          ></span>

          <!-- The axis. The line stops short of the arrow icons rather than
               running underneath them — the lucide arrow glyphs already
               include their own shaft, so overlapping a second line there
               produced a doubled/misaligned edge. -->
          <div class="absolute inset-x-0" :style="{ top: `${AXIS_TOP}px` }">
            <div class="absolute h-0.5 bg-primary/70" style="left: 20px; right: 20px; top: 0"></div>
            <Icon
              name="lucide:arrow-left"
              class="absolute -top-[7px] left-1 h-4 w-4 text-primary/70"
            />
            <Icon
              name="lucide:arrow-right"
              class="absolute -top-[7px] right-1 h-4 w-4 text-primary/70"
            />

            <!-- Current's range — a short open-ended stretch ending at the
                 Jul tick, kept clear of the axis's own left arrow so the two
                 don't visually collide. -->
            <div
              class="absolute h-0.5"
              :class="colorClasses.amiw.bg"
              :style="{
                left: '48px',
                top: `-${SEGMENT_GAP}px`,
                width: `${X.jul26 - 48}px`,
              }"
            ></div>
            <span
              class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-secondary"
              :class="colorClasses.amiw.border"
              :style="{ left: `${X.jul26}px`, top: `-${SEGMENT_GAP}px` }"
            ></span>

            <!-- MGS's range, also its own line above the axis -->
            <div
              class="absolute h-0.5"
              :class="colorClasses.terracotta.bg"
              :style="{
                left: `${X.sep25}px`,
                top: `-${SEGMENT_GAP}px`,
                width: `${X.may25 - X.sep25}px`,
              }"
            ></div>
            <span
              class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-secondary"
              :class="colorClasses.terracotta.border"
              :style="{ left: `${X.sep25}px`, top: `-${SEGMENT_GAP}px` }"
            ></span>
            <span
              class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-secondary"
              :class="colorClasses.terracotta.border"
              :style="{ left: `${X.may25}px`, top: `-${SEGMENT_GAP}px` }"
            ></span>

            <!-- Sanbersy's range, drawn as a second line below the ticks
                 since its span overlaps MGS's on this compressed axis. -->
            <div
              class="absolute h-0.5"
              :class="colorClasses.amiw.bg"
              :style="{
                left: `${X.apr26}px`,
                top: `${BELOW_SEGMENT_GAP}px`,
                width: `${X.feb25 - X.apr26}px`,
              }"
            ></div>
            <span
              class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-secondary"
              :class="colorClasses.amiw.border"
              :style="{ left: `${X.apr26}px`, top: `${BELOW_SEGMENT_GAP}px` }"
            ></span>
            <span
              class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-secondary"
              :class="colorClasses.amiw.border"
              :style="{ left: `${X.feb25}px`, top: `${BELOW_SEGMENT_GAP}px` }"
            ></span>

            <!-- Tick labels -->
            <div
              v-for="tick in ticks"
              :key="tick.label"
              class="absolute top-3.5 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-bold"
              :class="
                tick.color
                  ? colorClasses[tick.color].text
                  : 'text-muted-foreground'
              "
              :style="{ left: `${tick.x}px` }"
            >
              {{ tick.label }}
            </div>
          </div>

          <!-- Sanbersy — fixed below the axis -->
          <span
            class="absolute -translate-x-1/2 border-l-2 border-dotted"
            :class="colorClasses.amiw.border"
            :style="{ left: `${sanbersyAnchorX}px`, top: `${BELOW_CONNECTOR_TOP}px`, height: `${CARD_GAP}px` }"
          ></span>
          <div
            class="absolute -translate-x-1/2"
            :style="{ left: `${sanbersyAnchorX}px`, top: `${BELOW_CARD_TOP}px` }"
          >
            <TimelineCard :node="sanbersy" @select="selectedId = sanbersy.id" />
          </div>
        </div>
      </div>

      <!-- Mobile: vertical timeline, same data, latest first -->
      <ol
        class="relative flex flex-col gap-3 border-l-2 border-primary/30 pl-5 md:hidden"
      >
        <li class="relative">
          <span
            class="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 bg-secondary"
            :class="colorClasses.amiw.border"
          ></span>
          <TimelineCard
            :node="current"
            full
            @select="selectedId = current.id"
          />
        </li>

        <li class="relative">
          <span
            class="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 bg-secondary"
            :class="colorClasses.terracotta.border"
          ></span>
          <TimelineCard :node="mgs" full @select="selectedId = mgs.id" />
        </li>

        <li class="relative">
          <span
            class="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 bg-secondary"
            :class="colorClasses.amiw.border"
          ></span>
          <TimelineCard
            :node="sanbersy"
            full
            @select="selectedId = sanbersy.id"
          />
        </li>
      </ol>
    </div>

    <!-- Shared detail dialog — content swaps with `selected`. No close
         button by design; dismiss by clicking outside or pressing Escape. -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent
        v-if="selected"
        hide-close
        class="max-w-md gap-0 overflow-hidden rounded-xl border border-r-4 border-b-4 border-primary bg-card p-0 text-card-foreground shadow"
      >
        <div class="h-2 w-full" :class="colorClasses[selected.color].bg"></div>

        <DialogHeader class="p-6 pb-2">
          <div class="mb-1 flex items-center gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2"
              :class="colorClasses[selected.color].border"
            >
              <img
                v-if="selected.logo"
                :src="selected.logo"
                alt=""
                class="h-full w-full object-contain p-1.5"
              />
              <Icon
                v-else
                name="lucide:user"
                class="h-5 w-5"
                :class="colorClasses[selected.color].text"
              />
            </div>
            <div class="min-w-0">
              <DialogTitle class="text-xl font-bold text-primary truncate">{{
                selected.company
              }}</DialogTitle>
              <p
                v-if="selected.role"
                class="text-sm text-muted-foreground truncate"
              >
                {{ selected.role }}
              </p>
            </div>
          </div>
          <DialogDescription
            class="text-xs font-bold uppercase tracking-wide text-muted-foreground"
          >
            {{ selected.period }}
          </DialogDescription>
        </DialogHeader>

        <div
          class="max-h-[28rem] overflow-y-auto px-6 pb-6 pt-2 space-y-4 text-sm text-muted-foreground leading-relaxed"
        >
          <p v-if="selected.details">{{ selected.details }}</p>

          <div v-if="selected.tools?.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tool in selected.tools"
              :key="tool"
              class="rounded border px-1.5 py-0.5 font-mono text-[10px]"
              :class="[
                colorClasses[selected.color].border,
                colorClasses[selected.color].text,
              ]"
            >
              {{ tool }}
            </span>
          </div>

          <TimelineNestedCard
            v-if="selected.nested"
            :nested="selected.nested"
          />
        </div>
      </DialogContent>
    </Dialog>
  </section>
</template>
