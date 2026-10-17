// Single source of truth for projects. The homepage section and the
// per-project pages (/projects/<slug>) both read this list, so add or edit a
// project here only.
//
// To add a project, copy an entry below and fill in:
//   slug (lowercase, hyphens, used in the URL), title, description (1-2
//   sentences), tech (3-4 items), and at least one of website / source.
// Optional: still (a small 16:9 image in /public/img/projects, ~800px wide)
//   with alt (what it shows). Without an image the row shows a neutral tile
//   with the project's initials, and the project page has no big image.
// Also optional: gif (plays on hover), period, thumbBg + pixelated (for
// square pixel art that should be shown whole).
//
// To give a project its own page, add a `details` object. Every field inside
// is optional and a missing one is simply not shown. A project without
// `details` has no page and no "Details" button.

export interface DetailItem {
  title: string;
  text: string;
}

export interface ProjectDetails {
  // Small label above the title, e.g. "Personal project".
  kind: string;
  tagline: string;
  role?: string;
  status?: string;
  problem?: string;
  // A real sequence, so these are shown numbered. `stepsTitle` renames the
  // heading above them (default "How it works").
  stepsTitle?: string;
  steps?: DetailItem[];
  built?: DetailItem[];
  decisions?: DetailItem[];
  privacy?: string;
  // Shown under the main image, e.g. to say it is an illustration.
  imageCaption?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  still?: string;
  gif?: string;
  alt?: string;
  // For square pixel art: show it whole (contain) on a matching background
  // instead of cropping it to the 16:9 thumbnail frame.
  pixelated?: boolean;
  thumbBg?: string;
  website?: string;
  source?: string;
  period?: string;
  details?: ProjectDetails;
}

export const projects: Project[] = [
  {
    slug: "mindful-app",
    title: "Mindful App",
    description:
      "Android app that makes me say why before I open a distracting app. Each attempt is saved on the phone and synced to a small Go backend on my own server.",
    tech: ["Kotlin", "Jetpack Compose", "Go", "Docker"],
    // No real screenshot yet: this is an illustration of the two guard
    // screens, using the app's own wording. Swap in a screenshot when ready.
    still: "/img/projects/mindful.webp",
    alt: "Illustration of the Mindful App's two guard screens: \"Why would you open this app?\" and \"Are you sure?\"",
    source: "https://github.com/amirahdzh/amiw-mindful",
    period: "Sep 2026",
    details: {
      kind: "Personal project",
      tagline:
        "An Android app that makes me say why before I open a distracting app.",
      role: "Solo: design, app, backend, deploy",
      status: "Running on my phone, syncing to my own server",
      imageCaption: "Illustration of the two guard screens.",
      problem:
        "I open apps on autopilot. I wanted a small pause that asks me why before they open.",
      steps: [
        {
          title: "It asks why",
          text: "When I open a guarded app, a screen asks \"Why would you open this app?\" and won't continue until I type a reason.",
        },
        {
          title: "It gives me a way out",
          text: "Then \"Are you sure?\": a large \"I'll do it later\" button, or a small \"Open anyway\" that lets me in for a few minutes.",
        },
        {
          title: "It keeps a record",
          text: "Every attempt is saved on the phone first and synced to my server in the background, so I can look back at my reasons.",
        },
      ],
      built: [
        {
          title: "Android app",
          text: "Kotlin and Jetpack Compose. An accessibility service notices when a guarded app comes to the front, and Room keeps the records on the phone.",
        },
        {
          title: "Backend",
          text: "A small Go API with a SQLite database and token check, built from a written API contract.",
        },
        {
          title: "Deployment",
          text: "A Docker image on my own Ubuntu server behind HTTPS, with backup and rollback steps written down.",
        },
      ],
      decisions: [
        {
          title: "Go for the backend",
          text: "A small static binary and a ~15 MB image, against ~200 MB for a JVM option. Cheap to run, and no new framework to learn.",
        },
        {
          title: "SQLite, not Postgres",
          text: "One file in a volume, and a backup is a file copy. Enough for one user, and one less service to secure.",
        },
        {
          title: "Accessibility service, not polling",
          text: "Launch events arrive instantly, with no loop running in the background and no battery cost.",
        },
        {
          title: "Phone first, sync later",
          text: "Records are saved on the phone before anything is sent, and sync retries with backoff, so it works offline.",
        },
      ],
      privacy:
        "The accessibility service only reads the name of the app that comes to the front. It does not read the screen or what I type.",
    },
  },
  {
    slug: "daarul-ummahaat",
    title: "Daarul Ummahaat Website",
    description:
      "Website for a non-profit foundation, with a CMS its administrator can run without a developer: programs, events, gallery and donation details.",
    tech: ["Next.js", "Payload CMS", "PostgreSQL", "Docker"],
    // No image for now. Add `still` + `alt` (a screenshot of the finished
    // site) when there is one.
    website: "https://daarulummahaat.com",
    source: "https://github.com/amirahdzh/daarul-ummahaat",
    period: "Sep 2026",
    details: {
      kind: "Non-profit project",
      tagline:
        "A website a foundation's administrator can run without a developer.",
      role: "Solo developer: build and deployment",
      status: "Live at daarulummahaat.com",
      problem:
        "The people who run the foundation are not developers. The site has to show their programs, events and donation details, and stay easy for them to update.",
      built: [
        {
          title: "Public site",
          text: "Home, about, programs, events, a gallery with filters, donation details (bank accounts, QRIS and e-wallets) and a contact form. The interface is in Indonesian.",
        },
        {
          title: "Admin",
          text: "Payload CMS inside the same Next.js app, so the administrator edits programs, events and photos in a generated admin panel. There is an admin guide in Indonesian, and a draft preview before anything goes public.",
        },
        {
          title: "Deployment",
          text: "Docker Compose on a VPS behind Caddy and Cloudflare. Pushing to the main branch runs the checks and deploys. Encrypted nightly backups to Cloudflare R2 are scripted, with a restore script.",
        },
      ],
      decisions: [
        {
          title: "One app instead of a separate CMS",
          text: "Payload embeds in Next.js, so the site and the admin are one TypeScript codebase and one deploy, and the admin screens are generated from the content model.",
        },
        {
          title: "PostgreSQL, not SQLite",
          text: "A little more to run, but it suits the donor data the foundation may want later.",
        },
        {
          title: "Self-hosted, with Cloudflare in front",
          text: "Caddy handles TLS on the server, and Cloudflare handles DNS, caching and DDoS protection.",
        },
        {
          title: "Built around the administrator",
          text: "Sections with no content are hidden instead of showing empty headings, the admin guide is written for a non-technical reader, and the sitemap is built from published content only.",
        },
      ],
    },
  },
  {
    slug: "miaw-discord-bot",
    title: "Miaw Discord Bot",
    description:
      "Discord bot with slash and prefix commands, reaction roles, team-sorting and quizzes, and a workflow that turns new words into Anki flashcards with an LLM.",
    tech: ["TypeScript", "discord.js", "SQLite", "LLM APIs"],
    still: "/img/miaw.jpg",
    alt: "Pixel-art cat, the Miaw bot's avatar",
    pixelated: true,
    thumbBg: "#f4dfe6",
    source: "https://github.com/amirahdzh/amiw-bot",
    period: "Aug 2025 – present",
    details: {
      kind: "Personal project",
      tagline:
        "A Discord bot that sorts teams, runs quizzes and turns new words into flashcards.",
      role: "Solo developer: code and deployment",
      status: "Deploys to my own server on every push",
      stepsTitle: "The vocabulary workflow",
      steps: [
        {
          title: "Type a word",
          text: "I run /addword with an English or Japanese word. Inflected Japanese input still finds the dictionary form.",
        },
        {
          title: "A language model drafts the card",
          text: "It turns the word into a structured vocabulary card.",
        },
        {
          title: "I review it in Discord",
          text: "Buttons let me add the card to a queue, edit it, regenerate it or cancel.",
        },
        {
          title: "Export for Anki",
          text: "/export turns the queue into a .tsv file, one per language, ready to import into AnkiDroid.",
        },
      ],
      built: [
        {
          title: "Commands",
          text: "Slash and prefix commands for team assignment, a geography quiz, a suggestion board and reaction roles. Each one is a single file.",
        },
        {
          title: "Web pages",
          text: "A small Express server for the bot's own pages and their API, with rate limiting.",
        },
        {
          title: "Deployment",
          text: "GitHub Actions deploys to my VPS on every push to main and restarts the bot under PM2.",
        },
      ],
      decisions: [
        {
          title: "One file per command",
          text: "Commands and events load automatically from their folders, so adding one means adding a file, with nothing to wire up by hand.",
        },
        {
          title: "A provider interface for the language model",
          text: "Gemini and DeepSeek sit behind one interface and are chosen by a setting, so switching models doesn't touch the commands.",
        },
        {
          title: "SQLite for storage",
          text: "Quiz results, suggestions and the vocabulary queue live in one local database, so there is no database server to run.",
        },
        {
          title: "Tests where it gets tricky",
          text: "Over a hundred Vitest tests cover the Japanese handling, validation, the database and the export.",
        },
      ],
    },
  },
];

export const findProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
