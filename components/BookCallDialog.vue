<script setup lang="ts">
import { computed, onMounted, ref, useId } from "vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONTACT_EMAIL, WHATSAPP_URL } from "~/utils/site";

// "Book a call": a small box where a visitor can say what they'd like to talk
// about and when, as much or as little as they like. Nothing is required, and
// nothing is sent from this site: the text is handed over to WhatsApp or the
// visitor's email app, where they can still change it before sending.
//
// Use it around the button that should open it:
//   <BookCallDialog><button type="button">Book a call</button></BookCallDialog>

const id = useId();
const open = ref(false);
const topic = ref("");
const date = ref(""); // "2026-10-21"
const clock = ref(""); // "14:00"
const zone = ref("UTC"); // an IANA name like "Europe/Brussels"
const zones = ref<string[]>([]);
const minDate = ref("");

// A short fallback in case the browser can't list every time zone.
const fallbackZones = [
  "UTC", "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos", "America/Argentina/Buenos_Aires",
  "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Mexico_City",
  "America/New_York", "America/Sao_Paulo", "America/Toronto", "Asia/Bangkok", "Asia/Dubai",
  "Asia/Hong_Kong", "Asia/Jakarta", "Asia/Kolkata", "Asia/Manila", "Asia/Seoul",
  "Asia/Singapore", "Asia/Tokyo", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam",
  "Europe/Berlin", "Europe/Brussels", "Europe/London", "Europe/Madrid", "Europe/Paris",
  "Europe/Rome", "Pacific/Auckland",
];

// Browser only: the full list of time zones, the visitor's own one chosen, and
// today's date as the earliest day that can be picked.
onMounted(() => {
  let list: string[] = [];
  try {
    list = (Intl as unknown as { supportedValuesOf(key: string): string[] }).supportedValuesOf("timeZone");
  } catch {
    // Older browser: use the short list.
  }
  if (!list.length) list = fallbackZones;
  if (!list.includes("UTC")) list = [...list, "UTC"];
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) {
      if (!list.includes(detected)) list = [...list, detected];
      zone.value = detected;
    }
  } catch {
    // No time zone support: the visitor picks one.
  }
  zones.value = list;
  minDate.value = new Date().toLocaleDateString("en-CA"); // yyyy-mm-dd, local
});

// "GMT+2" for a zone on a given day (daylight saving changes it through the
// year, so the day the visitor picked is used, or today).
const offsetOf = (tz: string, day: string) => {
  try {
    const when = day ? new Date(`${day}T12:00:00Z`) : new Date();
    return (
      new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
        .formatToParts(when)
        .find((part) => part.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
};
const nameOf = (tz: string) => tz.replace(/_/g, " ");
const labelOf = (tz: string) => {
  const offset = offsetOf(tz, date.value);
  return offset ? `${nameOf(tz)} (${offset})` : nameOf(tz);
};

// The dropdown, grouped by region ("Europe", "Asia", ...).
const zoneGroups = computed(() => {
  const groups = new Map<string, { value: string; label: string }[]>();
  for (const tz of [...zones.value].sort()) {
    const region = tz.includes("/") ? tz.split("/")[0] : "Other";
    if (!groups.has(region)) groups.set(region, []);
    groups.get(region)!.push({ value: tz, label: labelOf(tz) });
  }
  return [...groups].map(([region, items]) => ({ region, items }));
});

// "2026-10-21" -> "Wednesday 21 October 2026" (written out, so "10/11" can't be misread)
const prettyDate = (day: string) => {
  const [y, m, d] = day.split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
};

const greeting = "Hi Amiw! I'd like to book the free first call.";

const message = computed(() => {
  const parts = [greeting];
  const about = topic.value.trim();
  const where = labelOf(zone.value);
  if (about) parts.push(`What I'd like to talk about:\n${about}`);
  const when = [date.value ? prettyDate(date.value) : "", clock.value].filter(Boolean).join(", ");
  if (when) {
    parts.push(
      `A time that could suit me: ${when}, ${where}.\nWe can agree the exact time together.`,
    );
  } else {
    parts.push(`My time zone: ${where}.`);
  }
  return parts.join("\n\n");
});

const whatsappLink = computed(() => `${WHATSAPP_URL}?text=${encodeURIComponent(message.value)}`);
const emailLink = computed(
  () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Free first call")}&body=${encodeURIComponent(message.value)}`,
);
// "Just say hi": the greeting alone, nothing else.
const hiLink = `${WHATSAPP_URL}?text=${encodeURIComponent(greeting)}`;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent class="max-h-[92vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:max-w-[30rem]">
      <div>
        <DialogTitle class="font-mono text-lg font-bold text-foreground">
          Book a free call
        </DialogTitle>
        <DialogDescription class="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
          Share whatever you like: it helps me prepare, so we can start with your situation. If
          you're not sure yet, that's fine too. We'll work it out together on the call.
        </DialogDescription>
      </div>

      <div class="grid gap-4">
        <div>
          <label :for="`${id}-topic`" :class="labelClass">
            What would you like to talk about?
            <span class="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            :id="`${id}-topic`"
            v-model="topic"
            rows="4"
            placeholder="For example: what you need, who it's for, a deadline, links you like. Nothing is required."
            :class="fieldClass"
          ></textarea>
        </div>

        <fieldset class="grid gap-4">
          <legend :class="labelClass">
            A time that could suit you
            <span class="font-normal text-muted-foreground">(optional)</span>
          </legend>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label :for="`${id}-date`" class="mb-1.5 block text-sm text-muted-foreground">Day</label>
              <input :id="`${id}-date`" v-model="date" type="date" :min="minDate" :class="fieldClass" />
            </div>
            <div>
              <label :for="`${id}-time`" class="mb-1.5 block text-sm text-muted-foreground">Time</label>
              <input :id="`${id}-time`" v-model="clock" type="time" :class="fieldClass" />
            </div>
          </div>
          <div>
            <label :for="`${id}-zone`" class="mb-1.5 block text-sm text-muted-foreground">
              Your time zone
            </label>
            <select :id="`${id}-zone`" v-model="zone" :class="fieldClass">
              <optgroup v-for="group in zoneGroups" :key="group.region" :label="group.region">
                <option v-for="item in group.items" :key="item.value" :value="item.value">
                  {{ item.label }}
                </option>
              </optgroup>
            </select>
          </div>
        </fieldset>
        <p class="-mt-1 text-sm leading-relaxed text-muted-foreground">
          The time is only a starting point. We'll agree the final time together.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-solid px-5 py-2.5 text-[15px] focus-visible:ring-offset-background"
          @click="open = false"
        >
          Send on WhatsApp
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
        <a
          :href="emailLink"
          class="btn-outline px-5 py-2.5 text-[15px] focus-visible:ring-offset-background"
          @click="open = false"
        >
          Send by email
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </a>
      </div>

      <p class="text-sm text-muted-foreground">
        I reply within one working day.
        <a
          :href="hiLink"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded font-semibold text-foreground underline decoration-pink decoration-2 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="open = false"
          >Skip this and just say hi</a
        >
      </p>
    </DialogContent>
  </Dialog>
</template>
