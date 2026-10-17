import { SITE } from "~/utils/site";

// One call per page sets the title, description, canonical address and the
// social-preview tags, so every page says something specific about itself.
//
//   usePageSeo({ title: "Blog | Amiw", description: "..." });
//
// Pages that should stay out of search results pass `noindex: true`. (Do not
// also block them in robots.txt: a search engine has to be able to fetch the
// page to see the noindex.)
export function usePageSeo(opts: {
  title: string;
  description: string;
  // Defaults to the current route.
  path?: string;
  // A path under /public, defaults to the site-wide preview image.
  image?: string;
  noindex?: boolean;
}) {
  const route = useRoute();
  const config = useRuntimeConfig();
  const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");
  const path = opts.path ?? route.path;
  const url = base + (path === "/" ? "/" : path);
  const image = base + (opts.image ?? SITE.image);

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    robots: opts.noindex ? "noindex, nofollow" : "index, follow",
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogType: "website",
    ogSiteName: SITE.name,
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: "summary_large_image",
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: image,
  });

  if (!opts.noindex) {
    useHead({ link: [{ rel: "canonical", href: url }] });
  }
}
