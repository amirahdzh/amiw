<script setup>
const currentYear = new Date().getFullYear();

// The form posts straight to the newsletter service (opens its confirmation
// page in a new tab), so there is no backend of our own. Without an action
// URL the form is shown switched off. See nuxt.config.ts.
const config = useRuntimeConfig();
const action = config.public.newsletterAction;
const field = config.public.newsletterField || "email";
const enabled = !!action;

const pages = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/art-leisure", label: "Art & Leisure" },
  { to: "/links", label: "Links" },
];

// Links that leave the site. They get a pink arrow.
const elsewhere = [
  { href: "https://github.com/amirahdzh", label: "GitHub", external: true },
  { href: "https://wa.me/6282114643544", label: "WhatsApp", external: true },
  { href: "mailto:amirahdzh@gmail.com", label: "Email", external: false },
  { href: "https://facebook.com/amiwdzh", label: "Facebook", external: true },
];

const linkClass =
  "inline-block rounded py-1 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";
</script>

<template>
  <footer class="border-t border-border bg-background pb-6 pt-11 text-muted-foreground">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
        <!-- Left: who, and the newsletter sign-up. No visible form heading:
             the placeholder says what it is, and the label is kept for
             screen readers. -->
        <div class="min-w-0">
          <NuxtLink
            to="/"
            class="inline-block rounded font-mono text-[22px] font-bold leading-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Amiw
          </NuxtLink>
          <p class="mt-1 text-sm">Software engineer &amp; blogger.</p>

          <form
            :action="enabled ? action : undefined"
            method="post"
            target="_blank"
            class="mt-5 max-w-[26rem]"
            @submit="(e) => { if (!enabled) e.preventDefault(); }"
          >
            <label for="footer-newsletter-email" class="sr-only">
              Get new posts by email
            </label>
            <div class="flex gap-2">
              <input
                id="footer-newsletter-email"
                :name="field"
                type="email"
                required
                autocomplete="email"
                placeholder="Email for new posts"
                :disabled="!enabled"
                class="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                type="submit"
                :disabled="!enabled"
                class="btn-solid shrink-0 px-5 py-2.5 text-sm focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                Subscribe
              </button>
            </div>
            <p v-if="!enabled" class="mt-2 text-xs">Opening soon.</p>
          </form>
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
