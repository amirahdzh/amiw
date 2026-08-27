<script setup lang="ts">
import { useBlogStore } from "@/stores/blog";

const store = useBlogStore();

interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
  ctaText: string;
  isExternal: boolean;
  extraButtonText?: string;
  extraButtonLink?: string;
  onClick?: () => void;
  accentBg: string;
}

const services: Service[] = [
  {
    icon: "lucide:code",
    title: "Web Development",
    description:
      "Building modern apps using <strong>Vue.js, Nuxt, and Laravel</strong>.",
    link: "/portfolio",
    ctaText: "Projects",
    isExternal: false,
    extraButtonText: "fa:github",
    extraButtonLink: "https://github.com/amirahdzh",
    accentBg: "bg-sage",
  },
  {
    icon: "lucide:pen-tool",
    title: "Technical Writing",
    description:
      "Simplifying <strong>web dev concepts</strong> through writing.",
    link: "/blog",
    ctaText: "Read",
    isExternal: false,
    onClick: () => store.setCategory("Web Development"),
    accentBg: "bg-honey",
  },
  {
    icon: "lucide:users",
    title: "Freelance & Collab",
    description: "Open for freelance projects and collaborations.",
    link: "mailto:amirahdzh@gmail.com",
    ctaText: "Contact",
    isExternal: true,
    accentBg: "bg-terracotta",
  },
  {
    icon: "lucide:feather",
    title: "Contemplative Writing",
    description: "Poetry, thoughts, and everyday musings.",
    link: "/blog",
    ctaText: "Writings",
    isExternal: false,
    onClick: () => store.setCategory("Contemplating"),
    accentBg: "bg-bloom",
  },
];
</script>

<template>
  <section
    id="services"
    class="w-full py-16 bg-[hsl(var(--alternate-background))]"
  >
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-foreground mb-6">🛠️ Services</h2>
      <h3 class="text-lg font-semibold text-foreground mb-4">What I Do?</h3>

      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="(service, index) in services"
          :key="index"
          v-motion-fade-visible
          class="relative overflow-hidden bg-secondary rounded-2xl p-4 border border-r-4 border-b-4 border-primary transition hover:scale-[1.02] duration-300"
          @click="service.onClick && service.onClick()"
        >
          <div
            class="absolute top-0 left-0 right-0 h-1.5"
            :class="service.accentBg"
          ></div>

          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center shrink-0"
              :class="service.accentBg"
            >
              <Icon :name="service.icon" class="w-4 h-4 text-foreground" />
            </div>
            <h4 class="font-bold text-sm text-foreground">
              {{ service.title }}
            </h4>
          </div>

          <p
            class="text-xs text-muted-foreground mb-3"
            v-html="service.description"
          ></p>

          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="service.link"
              :to="service.link"
              :target="service.isExternal ? '_blank' : '_self'"
              :rel="service.isExternal ? 'noopener noreferrer' : ''"
              class="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {{ service.ctaText }}
              <Icon
                v-if="service.isExternal"
                name="heroicons-outline:external-link"
                class="w-3.5 h-3.5"
              />
              <span v-else>→</span>
            </NuxtLink>

            <Button
              v-if="service.extraButtonText"
              :href="service.extraButtonLink"
              variant="ghost"
              size="icon"
              class="ml-auto h-6 w-6"
              as="a"
              target="_blank"
            >
              <Icon :name="service.extraButtonText" class="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
