<template>
  <section
    class="w-full min-h-screen pt-28 pb-16 bg-background flex flex-col items-center"
  >
    <div class="w-full max-w-md px-4 flex flex-col flex-1">
      <!-- Profile -->
      <div class="text-center mb-8">
        <div
          class="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-r-4 border-b-4 border-[hsl(var(--pink))] bg-[hsl(var(--alternate-background))] overflow-hidden"
        >
          <img
            src="/img/amiw.jpeg"
            alt="Amiw"
            class="w-full h-full object-cover"
          />
        </div>

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
              : {
                  href: link.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
          "
          class="relative overflow-hidden flex items-center gap-3 pl-5 pr-4 py-4 pt-5 rounded-2xl border border-r-4 border-b-4 border-primary bg-secondary text-primary transition-transform"
          :class="
            link.disabled
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:-translate-y-0.5 active:translate-y-0 active:border-r-2 active:border-b-2'
          "
        >
          <div
            class="absolute top-0 left-0 right-0 h-1.5"
            :class="link.accentBg"
          ></div>
          <Icon :name="link.icon" class="w-5 h-5 shrink-0" />
          <div class="flex flex-col flex-1 min-w-0">
            <span class="font-semibold flex items-center gap-2">
              {{ link.title }}
            </span>
            <span v-if="link.desc" class="text-xs text-muted-foreground">
              {{ link.desc }}
            </span>
          </div>
          <span
            class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0"
            :class="[
              link.accentBg,
              link.disabled ? 'text-primary' : 'text-secondary',
            ]"
          >
            {{ link.disabled ? "Soon" : "Live" }}
          </span>
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
    accentBg: "bg-honey",
  },
  {
    title: "Free Website for You",
    href: "https://wa.me/6282114643544?text=Hi%20Amiw!%20I'd%20like%20to%20request%20help%20building%20a%20website%20for%20my%20community.%20Could%20we%20discuss%20it?",
    desc: "for selected communities supporting open education and meaningful impact",
    icon: "lucide:globe",
    disabled: true,
    accentBg: "bg-sage",
  },
  {
    title: "Real-World Projects",
    href: "/",
    desc: "how I solve digital problems",
    icon: "lucide:folder-open",
    disabled: false,
    accentBg: "bg-terracotta",
  },
];
</script>
