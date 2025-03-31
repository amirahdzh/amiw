<template>
  <section class="w-full py-24 bg-secondary">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <!-- Title -->
      <Motion v-motion-pop-visible class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-bold text-foreground">
          What <span class="text-[hsl(var(--amiw))]"> I Do? </span>
        </h2>
      </Motion>

      <!-- Grid: Experience & Skills -->
      <div class="grid md:grid-cols-2 gap-8">
        <Motion
          v-for="(service, index) in services"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }"
        >
          <Card
            @click="service.onClick"
            class="p-6 flex flex-col items-start rounded-xl cursor-pointer"
          >
            <Icon :name="service.icon" class="w-10 h-10 text-foreground mb-4" />
            <h3 class="text-xl font-semibold text-primary">
              {{ service.title }}
            </h3>
            <p class="text-foreground mt-2" v-html="service.description"></p>

            <div class="flex items-center justify-between w-full mt-4">
              <NuxtLink
                v-if="service.link"
                :to="service.link"
                :target="service.isExternal ? '_blank' : '_self'"
                :rel="service.isExternal ? 'noopener noreferrer' : ''"
                class="relative text-primary text-lg font-medium after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[hsl(var(--pink))] after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
              >
                {{ service.ctaText }}
                <Icon
                  v-if="service.isExternal"
                  name="heroicons-outline:external-link"
                  class="w-4 h-4"
                />
                <span v-else> → </span>
              </NuxtLink>

              <Button
                v-if="service.extraButtonText"
                :href="service.extraButtonLink"
                variant="ghost"
                size="icon"
                class="ml-auto hover:bg-[hsl(var(--pink))]"
                as="a"
                target="_blank"
              >
                <Icon :name="service.extraButtonText" class="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Mendefinisikan tipe data untuk Service
interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
  ctaText: string;
  isExternal: boolean;
  extraButtonText?: string;
  extraButtonLink?: string;
  onClick?: () => void; // Menambahkan properti onClick
}

// Membuat data services dengan event click di dalamnya
const services = ref<Service[]>([
  {
    icon: "lucide:code",
    title: "Web Development",
    description:
      "Experienced in building modern web applications using <strong>Vue.js, Nuxt, and Laravel</strong>.",
    link: "/portfolio",
    ctaText: "Explore Projects",
    isExternal: false,
    extraButtonText: "fa:github",
    extraButtonLink: "https://www.github.com/amirahdzh",
  },
  {
    icon: "lucide:pen-tool",
    title: "Technical Writing",
    description:
      "Writing about <strong>web development</strong> on social media, making complex topics easier to understand.",
    link: "/blog",
    ctaText: "Read More",
    isExternal: false,
    onClick: () => {
      store.setCategory("Web Development");
    },
  },
  {
    icon: "lucide:users",
    title: "Freelance & Collaboration",
    description:
      "Open for freelance projects & collaboration in web development.",
    link: "mailto:amirahdzh@gmail.com",
    ctaText: "Contact Me",
    isExternal: true,
  },
  {
    icon: "lucide:feather",
    title: "Contemplative Writing",
    description:
      "Turning thoughts into words—poetry, reflections, and everyday musings.",
    link: "/blog",
    ctaText: "See My Writings",
    isExternal: false,
    onClick: () => {
      store.setCategory("Contemplating");
    },
  },
]);

// import { useBlogStore } from "@/stores/blog";
const store = useBlogStore();
</script>
