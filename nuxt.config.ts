// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', "@vueuse/motion/nuxt", "@pinia/nuxt"],
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
      script: [
        {
          innerHTML: `
            (function() {
              const theme = localStorage.getItem("vueuse-color-scheme") || "light";
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              }
            })();
          `,
          type: "text/javascript",
        },
      ],
    },
    
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
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
})