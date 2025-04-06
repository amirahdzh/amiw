<template>
  <section class="w-full py-16 bg-[hsl(var(--alternate-background))]">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Title -->
      <Motion v-motion-pop-visible class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground">
          What <span class="text-[hsl(var(--amiw))]"> I Do? </span>
        </h2>
      </Motion>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 gap-6 items-stretch">
        <Motion
          v-for="(service, index) in services"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.15, duration: 0.5 }"
        >
          <Card class="h-full cursor-pointer">
            <div
              class="h-full p-4 flex flex-col justify-between border rounded-xl transition hover:shadow-md"
              @click="service.onClick"
            >
              <div>
                <!-- Ganti bagian dalam Card -->
                <div class="flex items-center gap-2 mb-2">
                  <Icon :name="service.icon" class="w-5 h-5 text-foreground" />
                  <h3 class="text-base font-semibold text-foreground">
                    {{ service.title }}
                  </h3>
                </div>

                <p
                  class="text-sm text-muted-foreground mb-3"
                  v-html="service.description"
                ></p>
              </div>

              <div
                class="flex items-center justify-between text-sm font-medium"
              >
                <NuxtLink
                  v-if="service.link"
                  :to="service.link"
                  :target="service.isExternal ? '_blank' : '_self'"
                  :rel="service.isExternal ? 'noopener noreferrer' : ''"
                  class="hover:underline text-primary flex items-center gap-1"
                >
                  {{ service.ctaText }}
                  <Icon
                    v-if="service.isExternal"
                    name="heroicons-outline:external-link"
                    class="w-4 h-4"
                  />
                  <span v-else>→</span>
                </NuxtLink>

                <Button
                  v-if="service.extraButtonText"
                  :href="service.extraButtonLink"
                  variant="ghost"
                  size="icon"
                  class="ml-auto"
                  as="a"
                  target="_blank"
                >
                  <Icon :name="service.extraButtonText" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBlogStore } from "@/stores/blog";

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
}

const store = useBlogStore();

const services = ref<Service[]>([
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
  },
  {
    icon: "lucide:users",
    title: "Freelance & Collab",
    description: "Open for freelance projects and collaborations.",
    link: "mailto:amirahdzh@gmail.com",
    ctaText: "Contact",
    isExternal: true,
  },
  {
    icon: "lucide:feather",
    title: "Contemplative Writing",
    description: "Poetry, thoughts, and everyday musings.",
    link: "/blog",
    ctaText: "Writings",
    isExternal: false,
    onClick: () => store.setCategory("Contemplating"),
  },
]);
</script>
