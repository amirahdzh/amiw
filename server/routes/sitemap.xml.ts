import { serverQueryContent } from "#content/server";
import { projects } from "../../utils/projects";
import { SITE } from "../../utils/site";

// The pages worth finding in a search. Only projects that have their own page
// are listed. Old pages that are marked noindex are left out on purpose.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");

  // Published posts only. Drafts have no page worth finding yet.
  const posts = await serverQueryContent(event, "/blog").only(["_path", "draft"]).find();

  const paths = [
    "/",
    "/blog",
    "/newsletter",
    "/art-leisure",
    "/links",
    "/work-with-me",
    ...projects.filter((p) => p.details).map((p) => `/projects/${p.slug}`),
    ...posts.filter((p) => !p.draft).map((p) => p._path as string),
  ];

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${base}${p === "/" ? "/" : p}</loc></url>`).join("\n") +
    `\n</urlset>\n`
  );
});
