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

// Every page, the blog included, uses the homepage's width (max-w-6xl with
// 1.5rem sides), so the bars always match the content under them.
export const navWidthClass = (_path: string) => "max-w-6xl px-6";

export const navFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
