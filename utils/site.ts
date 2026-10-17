// What the site says about itself, in one place. Used by the page titles and
// descriptions (composables/usePageSeo.ts), the structured data on the
// homepage, and the sitemap.

export const SITE = {
  name: "Amiw",
  // The main address. Everything else (canonical links, sitemap, social
  // previews) is built from it. NUXT_PUBLIC_SITE_URL overrides it if set.
  url: "https://amiw.dev",
  title: "Amiw | Software Engineer (C#/.NET, TypeScript)",
  description:
    "Amiw is a software engineer working in C#/.NET and TypeScript, with Linux infrastructure and software delivery experience. Projects, work history and writing.",
  jobTitle: "Software Engineer",
  image: "/og.png",
  knowsAbout: ["C#/.NET", "TypeScript", "Linux infrastructure", "Software delivery"],
};

// Where to find Amiw. One list, used by the top bar, the slim bar, the footer
// and the links page, so they always show the same places in the same order.
// Change a handle or the email here and everywhere follows.
export const CONTACT_EMAIL = "amirahdzh@gmail.com";
export const WHATSAPP_URL = "https://wa.me/6282114643544";

export interface Place {
  label: string;
  href: string;
  icon: string;
  // Opens in a new tab (false for mailto:)
  external: boolean;
  // Public profile that also goes into the hidden structured data below
  profile?: boolean;
}

export const places: Place[] = [
  { label: "GitHub", href: "https://github.com/amirahdzh", icon: "simple-icons:github", external: true, profile: true },
  { label: "Instagram", href: "https://instagram.com/amiw.dev", icon: "simple-icons:instagram", external: true, profile: true },
  { label: "Facebook", href: "https://facebook.com/amiw.dev", icon: "simple-icons:facebook", external: true, profile: true },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: "simple-icons:whatsapp", external: true },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: "lucide:mail", external: false },
];

// Profiles that belong to the same person. They go into the page's hidden
// structured data (JSON-LD "sameAs"), which is how search engines learn that
// these accounts and this site are one person. Visitors never see this list.
//
// Only list profiles that are public and that you are happy to have tied to
// the site. Do not list a profile you want kept separate.
export const profiles: string[] = [
  ...places.filter((p) => p.profile).map((p) => p.href),
  // LinkedIn is here on purpose, and only here. It sits in the page source for
  // search engines. The site does not link to LinkedIn anywhere visitors can
  // see (nothing in the header, footer, links page or any page text).
  "https://linkedin.com/in/amirahdzh/",
];
