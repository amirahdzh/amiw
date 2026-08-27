import { defineStore } from "pinia";

interface Post {
  id: string;
  title: string;
  link: string | null;
  description: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
  badge: string;
  accentBg: string;
}

const PLACEHOLDER_POSTS: Post[] = [
  {
    id: "how-i-built-my-website-1",
    title: "How I Built My Website (Part 1): Choosing Nuxt 3",
    link: null,
    description:
      "Why I picked Nuxt 3 over a plain Vue SPA, and the first few decisions that shaped everything that came after — routing, content, and keeping deploys boring.",
    pubDate: "2026-06-02",
    categories: ["technology", "web-development"],
    thumbnail: "/img/amiw.jpeg",
    badge: "Series",
    accentBg: "bg-terracotta",
  },
  {
    id: "how-i-built-my-website-2",
    title: "How I Built My Website (Part 2): A Garden & Bake Palette",
    link: null,
    description:
      "Retiring the neubrutalist pink-and-black look for something warmer — sage, terracotta, honey, and a pink that finally gets to be an accent instead of the whole page.",
    pubDate: "2026-08-15",
    categories: ["technology", "web-development", "design"],
    thumbnail: "/img/amiw.jpeg",
    badge: "Series",
    accentBg: "bg-bloom",
  },
  {
    // TODO: write this one. Beats worth hitting, roughly in the order they
    // actually happened:
    // 1. Mounting a React library (tldraw) inside Vue via a .client.vue
    //    wrapper + manual createRoot/createElement — no Vue-React bridge lib.
    // 2. The .client.vue onMounted/nextTick ref-timing bug: onMounted fires
    //    one tick before the template ref is populated, so the board
    //    silently never mounted until `await nextTick()` was added.
    // 3. Self-hosting multiplayer sync on a Cloudflare Worker (Durable
    //    Objects + R2) instead of paying for someone else's, adapted from
    //    tldraw's official sync-cloudflare template.
    // 4. The false lead: added a React ErrorBoundary assuming an uncaught
    //    crash was blanking the board after a while. Reasonable diagnosis,
    //    wrong — worth including as "here's how I was confidently wrong."
    // 5. The actual culprit, found by live-debugging the deployed site:
    //    tldraw's SDK deliberately hides the whole editor 5 seconds after
    //    mount when unlicensed on a real domain (LicenseProvider.tsx,
    //    shouldHideEditorAfterDelay + LICENSE_TIMEOUT) — no crash, no
    //    error, just intentional silence. It *looked* intermittent because
    //    early remounts kept resetting the 5s timer, until things settled
    //    and it finally ran to completion.
    // 6. Fixed with a real tldraw license key threaded through as an env
    //    var, same pattern as the sync worker URL.
    id: "how-i-built-my-website-3",
    title: "How I Built My Website (Part 3): A Real-Time Canvas with tldraw",
    link: null,
    description:
      "Mounting a React library inside Vue, self-hosting multiplayer sync on Cloudflare Workers, and the licensing mystery that took way longer to find than it should have.",
    pubDate: "2026-08-27",
    categories: ["technology", "web-development"],
    thumbnail: "/img/amiw.jpeg",
    badge: "Series",
    accentBg: "bg-sage",
  },
  {
    id: "why-i-chose-minimalism",
    title: "Why I Chose Minimalism",
    link: null,
    description:
      "Less stuff, less noise, more room to notice things. A short note on what changed when I stopped trying to fill every shelf and every hour.",
    pubDate: "2026-05-10",
    categories: ["life", "minimalism"],
    thumbnail: "/img/amiw.jpeg",
    badge: "Life",
    accentBg: "bg-sage",
  },
  {
    id: "debugging-at-2am",
    title: "Debugging at 2AM: Lessons from a Stubborn Bug",
    link: null,
    description:
      "A production bug, a pot of tea, and the one console.log I should have added three hours earlier. What it taught me about slowing down instead of guessing.",
    pubDate: "2026-04-22",
    categories: ["technology", "web-development", "debugging"],
    thumbnail: "/img/amiw.jpeg",
    badge: "Dev",
    accentBg: "bg-honey",
  },
  {
    id: "slow-mornings-and-quiet-code",
    title: "Slow Mornings and Quiet Code",
    link: null,
    description:
      "The best code I write is rarely the code I write first thing after opening my laptop in a panic. A small ritual that's made mornings feel less like a race.",
    thumbnail: "/img/amiw.jpeg",
    badge: "Life",
    accentBg: "bg-sage",
    pubDate: "2026-03-01",
    categories: ["life", "reflection"],
  },
];

export const useBlogStore = defineStore("blog", {
  state: () => ({
    posts: [] as Post[],
    selectedCategory: "All",
  }),

  getters: {
    allCategories(state) {
      return [
        "All",
        "How I Built My Website (Series)",
        "Contemplating",
        "Web Development",
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
    loadPosts() {
      this.posts = PLACEHOLDER_POSTS;
    },

    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    getExcerpt(text: string): string {
      return text.length > 140 ? text.slice(0, 140) + "..." : text;
    },

    setCategory(category: string) {
      this.selectedCategory = category;
      localStorage.setItem("selectedCategory", category);
    },
  },
});
