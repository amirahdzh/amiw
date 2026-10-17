import { defineStore } from "pinia";

export type HeroVibe = "diary" | "professional";

export const useHeroVibeStore = defineStore("heroVibe", {
  state: () => ({
    vibe: "professional" as HeroVibe,
  }),

  actions: {
    toggle() {
      this.vibe = this.vibe === "diary" ? "professional" : "diary";
    },
  },
});
