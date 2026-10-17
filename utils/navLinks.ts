// Shared by the top bar (components/Header.vue) and the slim bar that returns
// while scrolling (components/StickyNav.vue), so the two can't drift apart.

import { places } from "./site";

export const siteLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/art-leisure", label: "Art & Leisure" },
];

// The one call-to-action in the bars: drawn as a small outlined pill instead of
// a plain link, so it stands out from the navigation next to it.
export const workLink = { to: "/work-with-me", label: "Work with me" };

// Icons are shown on wider screens only; the footer lists the same places.
// The list itself lives in utils/site.ts.
export const socials = places;

// Every page, the blog included, uses the homepage's width (max-w-6xl with
// 1.5rem sides), so the bars always match the content under them.
export const navWidthClass = (_path: string) => "max-w-6xl px-6";

export const navFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
