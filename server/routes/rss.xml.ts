import { serverQueryContent } from "#content/server";
import { SITE } from "../../utils/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS feed of published posts (drafts left out). Readers and feed apps can
// follow the blog without email.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const base = String(config.public.siteUrl || SITE.url).replace(/\/$/, "");

  const posts = (
    await serverQueryContent(event, "/blog")
      .only(["_path", "title", "description", "date", "draft"])
      .sort({ date: -1 })
      .find()
  ).filter((p) => !p.draft);

  const items = posts
    .map(
      (p) =>
        `    <item>\n` +
        `      <title>${esc(String(p.title))}</title>\n` +
        `      <link>${base}${p._path}</link>\n` +
        `      <guid>${base}${p._path}</guid>\n` +
        `      <pubDate>${new Date(String(p.date)).toUTCString()}</pubDate>\n` +
        `      <description>${esc(String(p.description ?? ""))}</description>\n` +
        `    </item>`,
    )
    .join("\n");

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n  <channel>\n` +
    `    <title>${esc(SITE.name)} blog</title>\n` +
    `    <link>${base}/blog</link>\n` +
    `    <description>${esc("Notes from Amiw on technology and everyday life.")}</description>\n` +
    (items ? items + "\n" : "") +
    `  </channel>\n</rss>\n`
  );
});
