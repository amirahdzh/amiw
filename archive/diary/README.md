# Archived: diary side (2026-10-17)

Set aside while the homepage is reworked professional-first. Nothing here is
imported anywhere; Nuxt only scans `components/`, `pages/`, `stores/` etc., so
this folder is inert.

| File | What it was |
| --- | --- |
| `HeroDiary.vue` | The diary hero: boxed note card, round avatar, cycling "MY SPACE / PAGE / DIARY" headline, Essence/Journey nav. Standalone; emits `peek` from the avatar button. |
| `EssenceSection.vue` | Was `components/Memoir/EssenceSection.vue` (rendered as `<MemoirEssenceSection />`). |
| `JourneySection.vue` | Was `components/Memoir/JourneySection.vue` (rendered as `<MemoirJourneySection />`). |
| `heroVibe.ts` | Was `stores/heroVibe.ts`, the `professional` / `diary` toggle store. |

The peek drawer (`components/Memoir/PeekDrawer.vue`) was deleted on purpose,
not archived. It was untracked, so it is not in git history.

## Restoring
1. Move `EssenceSection.vue` / `JourneySection.vue` back to `components/Memoir/`
   and `heroVibe.ts` back to `stores/`.
2. Move `HeroDiary.vue` into `components/` (e.g. `components/Memoir/DiaryHero.vue`)
   and render it wherever the diary entry point ends up.
3. Check `tailwind.config.js` `content` covers wherever the files land, so
   their utility classes are generated.
