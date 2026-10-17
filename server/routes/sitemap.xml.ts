import { projects } from "../../utils/projects";
import { SITE } from "../../utils/site";

// The pages worth finding in a search. Only projects that have their own page
// are listed. Old pages that are marked noindex are left out on purpose.
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");

  const paths = [
    "/",
    "/blog",
    "/art-leisure",
    "/links",
    ...projects.filter((p) => p.details).map((p) => `/projects/${p.slug}`),
  ];

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${base}${p === "/" ? "/" : p}</loc></url>`).join("\n") +
    `\n</urlset>\n`
  );
});
