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
      title: "Amiw's Space",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
  routeRules: {
    // Memoir moved to "/" — send old bookmarks/links to the new home
    '/memoir': { redirect: '/' },
  },
})