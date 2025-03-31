import { defineStore } from "pinia";

interface Post {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
}

export const useBlogStore = defineStore("blog", {
  state: () => ({
    posts: [] as Post[],
    error: null as string | null,
    isLoading: true,
    selectedCategory: "All",
    RSS_API_URL:
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40amiwdzh",
    DEFAULT_THUMBNAIL: "/img/maple_circle.png",
  }),

  getters: {
    allCategories(state) {
      const categories = new Set<string>();
      return [
        "All",
        "How I Built My Website (Series)",
        "Contemplating",
        "Web Development",
        ...Array.from(categories),
      ];
    },

    filteredPosts(state) {
      if (state.selectedCategory === "All") return state.posts;
      if (state.selectedCategory === "How I Built My Website (Series)") {
        return state.posts.filter((post) =>
          post.title.startsWith("How I Built My Website")
        );
      }
      if (state.selectedCategory === "Contemplating") {
        return state.posts.filter(
          (post) =>
            !post.title.startsWith("How I Built My Website") &&
            !post.categories.includes("technology")
        );
      }
      if (state.selectedCategory === "Web Development") {
        return state.posts.filter((post) =>
          post.categories.includes("web-development")
        );
      }
      return [];
    },
  },

  actions: {
    async fetchPosts() {
      try {
        const response = await fetch(this.RSS_API_URL);
        const data = await response.json();
        if (data.status === "ok") {
          this.posts = data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            description: item.content,
            pubDate: item.pubDate,
            categories: item.categories,
            thumbnail: this.getMediumImage(item.content) || this.DEFAULT_THUMBNAIL,
          }));
        }
      } catch (e) {
        this.error = "Failed to load posts";
      } finally {
        this.isLoading = false;
      }
    },

    getMediumImage(description: string): string {
      if (!description) return this.DEFAULT_THUMBNAIL;
      const imageMatch = description.match(/<img.*?src=["'](.*?)["']/);
      return imageMatch ? imageMatch[1] : this.DEFAULT_THUMBNAIL;
    },

    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    decodeHTMLEntities(text: string): string {
      const parser = new DOMParser();
      return parser.parseFromString(text, "text/html").body.textContent || "";
    },

    getExcerpt(text: string): string {
      const clean = text.replace(/<[^>]+>/g, "");
      return clean.length > 100 ? clean.slice(0, 100) + "..." : clean;
    },

    setCategory(category: string) {
        this.selectedCategory = category;
        localStorage.setItem('selectedCategory', category);
      }
      
  },
});
