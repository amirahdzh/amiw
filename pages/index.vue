<template>
  <MemoirHeroSection />
  <IndexProfesionalSection />
  <IndexProjectSection />
  <IndexTrackSection />
  <IndexCollaborateSection />
</template>

<script setup lang="ts">
import { SITE, profiles } from "~/utils/site";

usePageSeo({ title: SITE.title, description: SITE.description, path: "/" });

// Hidden structured data (JSON-LD). It tells search engines who this site is
// about and which public profiles belong to the same person. Visitors never see it.
const config = useRuntimeConfig();
const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `${base}/#person`,
            name: SITE.name,
            url: `${base}/`,
            image: `${base}${SITE.image}`,
            jobTitle: SITE.jobTitle,
            description: SITE.description,
            knowsAbout: SITE.knowsAbout,
            sameAs: profiles,
          },
          {
            "@type": "WebSite",
            "@id": `${base}/#website`,
            url: `${base}/`,
            name: SITE.name,
            inLanguage: "en",
            publisher: { "@id": `${base}/#person` },
          },
        ],
      }),
    },
  ],
});
</script>
