// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', "@vueuse/motion/nuxt", "@pinia/nuxt", '@nuxt/content'],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      // Tells the CSS that arrival motion (plugins/reveal.client.ts) is going to
      // run, so items can start hidden without a flash. If the script never
      // runs, nothing is hidden. See "reveal-on" in assets/css/tailwind.css.
      script: [
        { innerHTML: "document.documentElement.classList.add('reveal-on')", tagPosition: "head" },
      ],
      title: "Amiw | Software Engineer (C#/.NET, TypeScript)",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Amiw blog', href: '/rss.xml' },
      ],
    },
    
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      // Base URL of the self-hosted tldraw sync Worker (see sync-worker/),
      // e.g. https://amiw-tldraw-sync.<account>.workers.dev. Leave unset to
      // use tldraw's public demo sync server instead (fine for testing;
      // data lasts 24h and rooms are public).
      tldrawSyncUrl: process.env.NUXT_PUBLIC_TLDRAW_SYNC_URL || "",
      // Get one at tldraw.dev/pricing (free 100-day trial works). Without
      // this, tldraw's own SDK deliberately blanks the editor 5 seconds
      // after mount on any real (non-localhost) domain — see
      // LicenseProvider.tsx's shouldHideEditorAfterDelay/LICENSE_TIMEOUT.
      tldrawLicenseKey: process.env.NUXT_PUBLIC_TLDRAW_LICENSE_KEY || "",
      // Footer newsletter form. Set NUXT_PUBLIC_NEWSLETTER_ACTION to the form
      // action URL of whichever newsletter service you use (for example
      // Buttondown's embed-subscribe URL), and NUXT_PUBLIC_NEWSLETTER_FIELD to
      // the name of its email field if it isn't "email" (Mailchimp uses
      // "EMAIL"). Leave the action unset and the footer shows the form
      // switched off with "Opening soon", so no address is collected
      // anywhere until a service is connected.
      newsletterAction: process.env.NUXT_PUBLIC_NEWSLETTER_ACTION || "",
      newsletterField: process.env.NUXT_PUBLIC_NEWSLETTER_FIELD || "email",
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    },
    openRouterApiKey: process.env.OPENROUTER_API_KEY
  },
  // The sitemap is a server route. Prerender it so it also exists on a static build.
  nitro: { prerender: { routes: ["/sitemap.xml", "/rss.xml"] } },
  routeRules: {
    // Memoir moved to "/" — send old bookmarks/links to the new home
    '/memoir': { redirect: '/' },
    // Canvas renamed to Art & Leisure — keep old shared links working
    '/canvas': { redirect: '/art-leisure' },
    // The resume (public/resume.pdf) can be opened and downloaded by anyone
    // with the link, but search engines are told not to list or cache it.
    // (A robots.txt line alone would not stop it being listed.)
    '/resume.pdf': { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
  },
})