<script setup>
import { places } from "~/utils/site";

const currentYear = new Date().getFullYear();

const pages = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/art-leisure", label: "Art & Leisure" },
  { to: "/links", label: "Links" },
];

// Same places, same order as the top bar and the links page (utils/site.ts).
// Links that leave the site get a pink arrow.
const elsewhere = places;

const linkClass =
  "inline-block rounded py-1 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";
</script>

<template>
  <footer class="border-t border-border bg-background pb-6 pt-11 text-muted-foreground">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
        <!-- Left: who, and the newsletter sign-up. No visible form heading:
             the placeholder says what it is, and the label is kept for
             screen readers. (More about it on /newsletter.) -->
        <div class="min-w-0">
          <NuxtLink
            to="/"
            class="inline-block rounded font-mono text-[22px] font-bold leading-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Amiw
          </NuxtLink>
          <p class="mt-1 text-sm">Software engineer &amp; blogger.</p>

          <NewsletterForm id="footer-newsletter-email" class="mt-5 max-w-[26rem]" />
        </div>

        <!-- Right: pages, and links to elsewhere -->
        <div class="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-8">
          <nav aria-label="Footer">
            <p class="eyebrow mb-2.5">Pages</p>
            <ul>
              <li v-for="link in pages" :key="link.to">
                <NuxtLink :to="link.to" :class="linkClass">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </nav>

          <div>
            <p class="eyebrow mb-2.5">Elsewhere</p>
            <ul>
              <li v-for="link in elsewhere" :key="link.label">
                <a
                  :href="link.href"
                  :target="link.external ? '_blank' : undefined"
                  :rel="link.external ? 'noopener noreferrer' : undefined"
                  :class="linkClass"
                >
                  {{ link.label }}
                  <span aria-hidden="true" class="text-amiw">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="mt-9 border-t border-border pt-4 text-xs">
        &copy; {{ currentYear }} Amiw. All rights reserved.
      </p>
    </div>
  </footer>
</template>
