<template>
  <section
    class="w-full py-16 bg-[hsl(var(--alternate-background))] border-b-2 border-primary"
    v-motion-slide-bottom
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-2">
        Check out my featured work
      </h2>
      <p class="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
        I've been learning by building different kinds of projects. These are
        some that I'm excited (and a little proud) to share.
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { delay: index * 0.1, duration: 0.4 },
          }"
          class="rounded-lg border-2 border-primary overflow-hidden bg-secondary transition"
        >
          <img
            :src="project.thumbnail"
            :alt="`${project.title} Thumbnail`"
            class="w-full h-48 object-cover"
          />
          <div class="p-4 space-y-3">
            <h3 class="text-xl font-semibold">{{ project.title }}</h3>
            <!-- <p class="text-sm text-muted-foreground">{{ project.date }}</p> -->
            <p class="text-primary text-sm">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-secondary">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-2 py-1 bg-muted-foreground rounded"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-3 pt-3">
              <a
                v-if="project.website"
                :href="project.website"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-3 py-1 border border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-background transition-colors"
              >
                <Icon name="fa6-solid:globe" class="w-4 h-4" />
                Website
              </a>

              <a
                v-if="project.source"
                :href="project.source"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-3 py-1 border border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-background transition-colors"
              >
                <Icon name="simple-icons:github" class="w-4 h-4" />
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { $config } = useNuxtApp();

const projects = [
  {
    title: "Miw's Book",
    date: "Feb 2024 - Present",
    description:
      "Personal library site to manage my books, share insights, and allow others to recommend or borrow books.",
    tech: ["Vue.js", "Nuxt 3", "Laravel", "Tailwind"],
    thumbnail: "/gif/miwsbook.gif",
    website: "https://book.amiw.dev/",
    source: "https://github.com/amirahdzh/miwsbook-fe",
  },
  {
    title: "Wedding Invitation Template",
    date: "Oct 2025",
    description:
      "A beautiful, modern wedding invitation website built with Express.js, EJS, htmx, TailwindCSS, and SQLite.",
    tech: ["Express.js", "EJS", "htmx", "TailwindCSS", "SQLite"],
    thumbnail: "/gif/wedding_inv.gif",
    website: `${$config.public.siteUrl}/wedding-template`,
    source: "https://github.com/amirahdzh/wedding-inv",
  },
  {
    title: "Personal Website",
    date: "Apr 2024",
    description:
      "My personal website showcasing my work, blog posts, thoughts, and everything about me. Built with Nuxt 3 and VueUse Motion.",
    tech: ["Nuxt 3", "VueUse Motion", "TailwindCSS"],
    thumbnail: "/gif/personal_web.gif",

    website: "https://amiwspace.vercel.app",
    source: "https://github.com/amirahdzh/amiwspace",
  },
  {
    title: "Daarul Ummahaat Website",
    date: "Sept 2025",
    description:
      "Official website for Daarul Ummahaat, non-profit organization focused on empowering humanity through education and social initiatives.",
    tech: ["Nuxt 3", "Markdown", "TailwindCSS"],
    thumbnail: "/gif/daarul_ummahaat.gif",
    website: "https://daarulummahaat.org",
    source: "https://github.com/amirahdzh/daarul-ummahaat",
  },
  {
    title: "Miaw Discord Bot",
    date: "Sept 2025",
    description:
      "Miaw Bott is a  customizable Discord bot designed for modern servers. It features both slash and prefix commands, dynamic reaction roles, public and private messaging, and is easy to extend for new features.",
    tech: ["Node.js", "Discord.js", "Typescript"],
    thumbnail: "/img/miaw.jpg",
    // website: "https://daarulummahaat.org",
    source: "https://github.com/amirahdzh/amiw-bot",
  },
];
</script>
