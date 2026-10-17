export interface BlogPostMeta {
  _path: string;
  title: string;
  description: string;
  // "2026-08-27", a calendar date
  date: string;
  tags?: string[];
  // Drafts are listed but not linked, and their page stays out of search.
  draft?: boolean;
  // Optional picture for the list row. Rows without one show no picture.
  image?: string;
}

// Every post in content/blog, newest first. Shared by the blog list and the
// "Latest on the blog" teaser on the homepage.
export function useBlogPosts() {
  return useAsyncData<BlogPostMeta[]>(
    "blog-posts",
    () =>
      queryContent<BlogPostMeta>("/blog")
        .only(["_path", "title", "description", "date", "tags", "draft", "image"])
        .sort({ date: -1 })
        .find() as Promise<BlogPostMeta[]>,
    { default: () => [] },
  );
}

// UTC on purpose: "2026-08-27" is a calendar date, and formatting it in a
// negative-offset timezone would show the 26th.
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
