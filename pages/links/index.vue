<template>
  <section
    class="w-full min-h-screen pt-28 pb-16 bg-background flex flex-col items-center"
  >
    <div class="w-full max-w-md px-4 flex flex-col flex-1">
      <!-- Profile -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-primary">{{ profile.name }}</h1>
        <p class="text-sm text-muted-foreground mt-1">
          {{ profile.nickname }}
        </p>

        <div class="flex justify-center gap-4 mt-4">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.name"
            class="flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary text-primary transition-colors hover:bg-primary hover:text-secondary"
          >
            <Icon :name="social.icon" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Links -->
      <div class="flex flex-col gap-4">
        <component
          :is="link.disabled ? 'div' : 'a'"
          v-for="link in links"
          :key="link.title"
          v-bind="
            link.disabled
              ? { 'aria-disabled': 'true' }
              : { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
          "
          class="flex items-center gap-3 px-5 py-4 rounded-2xl border border-r-4 border-b-4 border-primary bg-secondary text-primary transition-transform"
          :class="
            link.disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:-translate-y-0.5 active:translate-y-0 active:border-r-2 active:border-b-2'
          "
        >
          <Icon :name="link.icon" class="w-5 h-5 shrink-0" />
          <div class="flex flex-col">
            <span class="font-semibold flex items-center gap-2">
              {{ link.title }}
              <span
                v-if="link.disabled"
                class="text-[10px] font-normal uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-primary text-secondary"
              >
                Coming soon
              </span>
            </span>
            <span v-if="link.desc" class="text-xs text-muted-foreground">
              {{ link.desc }}
            </span>
          </div>
        </component>
      </div>

      <p class="text-center text-xs text-muted-foreground mt-auto pt-10">
        © {{ new Date().getFullYear() }} Amiw
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "Amiw's Links",
  meta: [
    {
      name: "description",
      content: "Amiw's links — get in touch, or see what I'm building.",
    },
  ],
});

const profile = {
  name: "Amiw",
  nickname: "Web Developer | Technical & Content Writer",
};

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/6282114643544",
    icon: "simple-icons:whatsapp",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/amiwdzh",
    icon: "simple-icons:facebook",
  },
  {
    name: "Medium",
    href: "https://medium.com/@amiwdzh",
    icon: "simple-icons:medium",
  },
  {
    name: "Email",
    href: "mailto:hello@amiw.dev",
    icon: "lucide:mail",
  },
];

const links = [
  {
    title: "Subscribe My Newsletter",
    href: "https://newsletter.amiw.dev",
    icon: "lucide:mail",
    disabled: true,
  },
  {
    title: "Free Website for You",
    href: "https://wa.me/6282114643544?text=Hi%20Amiw!%20I'd%20like%20to%20request%20help%20building%20a%20website%20for%20my%20community.%20Could%20we%20discuss%20it?",
    desc: "for selected communities supporting open education and meaningful impact",
    icon: "lucide:globe",
    disabled: true,
  },
  {
    title: "Real-World Projects",
    href: "/",
    desc: "how I solve digital problems",
    icon: "lucide:folder-open",
    disabled: false,
  },
];
</script>
