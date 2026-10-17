// Shared by the top bar (components/Header.vue) and the slim bar that returns
// while scrolling (components/StickyNav.vue), so the two can't drift apart.

export const siteLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/art-leisure", label: "Art & Leisure" },
  { to: "/links", label: "Links" },
];

// Icons are shown on wider screens only; the same places are in the footer.
export const socials = [
  {
    href: "https://instagram.com/amiw.dev",
    label: "Instagram",
    icon: "simple-icons:instagram",
    external: true,
  },
  {
    href: "https://wa.me/6282114643544",
    label: "WhatsApp",
    icon: "simple-icons:whatsapp",
    external: true,
  },
  {
    href: "mailto:amirahdzh@gmail.com",
    label: "Email",
    icon: "lucide:mail",
    external: false,
  },
];

// The blog uses a wider layout (max-w-7xl with 2rem sides), so the bars follow
// it there; everywhere else they match the homepage (max-w-6xl, 1.5rem sides).
export const navWidthClass = (path: string) =>
  path.startsWith("/blog") ? "max-w-7xl px-8" : "max-w-6xl px-6";

export const navFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
