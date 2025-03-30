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
        <!-- Card 1: Web Development -->
        <Card class="p-6 flex flex-col items-start">
          <Icon name="lucide:code" class="w-10 h-10 text-primary mb-4" />
          <h3 class="text-xl font-semibold">Web Development</h3>
          <p class="text-muted-foreground mt-2">
            Experienced in building modern web applications using
            <strong>Vue.js, Nuxt, and Laravel</strong>.
          </p>
        </Card>

        <!-- Card 2: Technical Writing -->
        <Card class="p-6 flex flex-col items-start">
          <Icon name="lucide:pen-tool" class="w-10 h-10 text-primary mb-4" />
          <h3 class="text-xl font-semibold">Technical Writing</h3>
          <p class="text-muted-foreground mt-2">
            Writing about <strong>web development</strong> on social media,
            making complex topics easier to understand.
          </p>
        </Card>

        <!-- Card 3: Freelance & Collaboration -->
        <Card class="p-6 flex flex-col items-start">
          <Icon name="lucide:users" class="w-10 h-10 text-primary mb-4" />
          <h3 class="text-xl font-semibold">Freelance & Collaboration</h3>
          <p class="text-muted-foreground mt-2">
            Open for freelance projects & collaboration in web development.
          </p>
        </Card>
        <!-- Card 4: Content Writing -->
        <Card class="p-6 flex flex-col items-start">
          <Icon name="lucide:feather" class="w-10 h-10 text-primary mb-4" />
          <h3 class="text-xl font-semibold">Content Writing</h3>
          <p class="text-muted-foreground mt-2">
            Expressing thoughts, reflections, and creativity through writing.
          </p>
        </Card>
      </div>

      <!-- CTA Button -->
      <!-- <div class="text-center mt-12">
        <Button as="a" href="/portfolio" class="px-6 py-3 text-lg">
          View Portfolio
        </Button>
      </div> -->
    </div>
  </section>
</template>

<script setup>
// ShadCN components
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@iconify/vue";
</script>
