<script setup lang="ts">
import { resolveComponent } from "vue";
import { places } from "~/utils/site";

usePageSeo({
  title: "Links | Amiw",
  description: "Amiw's links: get in touch, or see what I'm building.",
});

// `:is="'NuxtLink'"` (a plain string) doesn't reliably resolve to the real
// component, it rendered as an inert <nuxtlink> tag with no href.
// resolveComponent() looks it up properly.
const NuxtLinkComponent = resolveComponent("NuxtLink");

const links = [
  {
    title: "Subscribe to my newsletter",
    href: "/newsletter",
    internal: true,
    icon: "lucide:mail",
  },
  {
    title: "Real-world projects",
    href: "/#projects",
    internal: true,
    desc: "how I solve digital problems",
    icon: "lucide:folder-open",
  },
  {
    title: "Free website for you",
    href: "https://wa.me/6282114643544?text=Hi%20Amiw!%20I'd%20like%20to%20request%20help%20building%20a%20website%20for%20my%20community.%20Could%20we%20discuss%20it?",
    internal: false,
    desc: "for selected communities working on open education",
    icon: "lucide:globe",
    soon: true,
  },
];

// Not a link at all while it is "soon", so it can't be clicked or tabbed to.
const linkAttrs = (link: (typeof links)[number]) => {
  if (link.soon) return {};
  if (link.internal) return { to: link.href };
  return { href: link.href, target: "_blank", rel: "noopener noreferrer" };
};
const linkTag = (link: (typeof links)[number]) =>
  link.soon ? "div" : link.internal ? NuxtLinkComponent : "a";

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
</script>

<template>
  <section class="flex min-h-screen w-full flex-col items-center bg-background px-4 pb-10 pt-12">
    <div class="flex w-full max-w-md flex-1 flex-col">
      <!-- Profile -->
      <div class="text-center">
        <NuxtLink
          to="/"
          aria-label="Amiw, home"
          class="mx-auto block h-28 w-28 overflow-hidden rounded-full bg-[hsl(var(--blush-band))] ring-2 ring-pink ring-offset-4 ring-offset-background transition-transform hover:scale-105 motion-reduce:transition-none"
          :class="focusClass"
        >
          <!-- The same illustration as the homepage hero. Swap the file here
               (a square picture works best) to change it. -->
          <img
            src="/img/amiw-figure.webp"
            alt="Amiw"
            class="h-full w-full object-cover object-top"
          />
        </NuxtLink>

        <h1 class="mt-5 font-mono text-2xl font-bold text-foreground">Amiw</h1>
        <p class="mt-1 text-sm text-muted-foreground">Software engineer &amp; blogger.</p>

        <ul class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li v-for="place in places" :key="place.label">
            <a
              :href="place.href"
              :target="place.external ? '_blank' : undefined"
              :rel="place.external ? 'noopener noreferrer' : undefined"
              :aria-label="place.label"
              class="block rounded p-1 text-foreground transition-colors hover:text-amiw motion-reduce:transition-none"
              :class="focusClass"
            >
              <Icon :name="place.icon" class="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Links -->
      <ul class="mt-8 flex flex-col gap-3.5">
        <li v-for="link in links" :key="link.title">
          <component
            :is="linkTag(link)"
            v-bind="linkAttrs(link)"
            :aria-disabled="link.soon ? 'true' : undefined"
            class="group relative flex min-h-[3.75rem] items-center justify-center rounded-full border px-14 py-3 text-center transition-all motion-reduce:transition-none"
            :class="[
              focusClass,
              link.soon
                ? 'cursor-not-allowed border-dashed border-muted-foreground/40 pr-[4.5rem] text-muted-foreground'
                : 'border-primary bg-secondary text-primary hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-soft motion-reduce:hover:translate-y-0',
            ]"
          >
            <Icon :name="link.icon" class="absolute left-5 h-5 w-5" />
            <span class="flex flex-col">
              <span class="font-semibold leading-snug">{{ link.title }}</span>
              <span
                v-if="link.desc"
                class="mt-0.5 text-xs leading-snug"
                :class="
                  link.soon
                    ? ''
                    : 'text-muted-foreground group-hover:text-primary-foreground/80'
                "
              >
                {{ link.desc }}
              </span>
            </span>
            <span
              v-if="link.soon"
              class="absolute right-4 rounded-full bg-muted px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground"
            >
              soon
            </span>
          </component>
        </li>
      </ul>

      <p class="mt-auto pt-12 text-center font-mono text-xs text-muted-foreground">
        <NuxtLink
          to="/"
          class="rounded underline-offset-4 decoration-pink decoration-2 hover:text-foreground hover:underline"
          :class="focusClass"
        >
          amiw.dev
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
