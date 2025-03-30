<template>
  <section class="w-full py-24 bg-secondary">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-bold text-foreground">
          What <span class="text-[hsl(var(--amiw))]"> I Do? </span>
        </h2>
      </div>

      <!-- Grid: Experience & Skills -->
      <div class="grid md:grid-cols-2 gap-8">
        <Card
          v-for="(service, index) in services"
          :key="index"
          class="p-6 flex flex-col items-start rounded-xl"
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
              class="relative text-primary text-lg font-medium after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[hsl(var(--amiw))] after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
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
              :to="service.extraButtonLink"
              variant="ghost"
              size="icon"
              class="ml-auto"
            >
              <Icon :name="service.extraButtonText" class="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: "lucide:code",
    title: "Web Development",
    description:
      "Experienced in building modern web applications using <strong>Vue.js, Nuxt, and Laravel</strong>.",
    link: "/web-dev",
    ctaText: "Explore Projects",
    isExternal: false,
    extraButtonText: "fa:github",
    extraButtonLink: "/about",
  },
  {
    icon: "lucide:pen-tool",
    title: "Technical Writing",
    description:
      "Writing about <strong>web development</strong> on social media, making complex topics easier to understand.",
    link: "/writing",
    ctaText: "Read More",
    isExternal: false,
    // extraButtonText: "Learn More",
    // extraButtonLink: "/about",
  },
  {
    icon: "lucide:users",
    title: "Freelance & Collaboration",
    description:
      "Open for freelance projects & collaboration in web development.",
    link: "mailto:amirahdzh@gmail.com",
    ctaText: "Contact Me",
    isExternal: true,
    // extraButtonText: "Learn More",
    // extraButtonLink: "/about",
  },
  {
    icon: "lucide:feather",
    title: "Contemplative Writing",
    description:
      "Turning thoughts into words—poetry, reflections, and everyday musings.",
    link: "/reflections",
    ctaText: "See My Writings",
    isExternal: false,
    // extraButtonText: "Learn More",
    // extraButtonLink: "/about",
  },
];
</script>
