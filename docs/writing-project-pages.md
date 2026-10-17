# Writing a project page

A guide for future me. Read this before filling in `details` for a project in
`utils/projects.ts`. A project only gets its own page (`/projects/<slug>`) when
it has a `details` object. Everything inside `details` is optional, and a
missing field simply isn't shown.

## The idea

A project page should read like a person telling you how it went, not like a
form that was filled in. The facts are easy: they are in the repo, the docs and
the commit history. What makes a page worth reading is the part only I know:
what annoyed me, what surprised me, what I'd change.

## Step 1: answer four questions

Write a line or two for each, even if the answer is "not really". Rough notes
are fine. They become the story sections below.

1. **What annoyed me most, and what did I try first?**
   Pick the one problem that cost real time. Include the first thing I tried,
   even if it was wrong.
2. **Has it changed what I actually do?**
   An honest "not really" is better than a nice-sounding "yes".
3. **If I started again, what would I do differently?**
4. **What did I decide not to build, and why?**

## Step 2: pick at most three story sections

Each question has a field. Use only the ones with a real answer.

| Question | Field in `details` | Heading on the page |
|---|---|---|
| 1 | `broke` | What broke |
| (the trade-offs I made) | `choices` | Choices I made |
| 2 | `worked` | Has it worked? |
| 3 | `again` | What I'd do differently |
| 4 | `leftOut` | What I left out |

Each field is a list of short paragraphs written in the first person.

The older `decisions` field (a list of bold titles with a sentence each) still
works, but prefer `choices`. Bold lead-ins on every bullet read like a template.
If both exist, `choices` is shown.

## Step 3: keep the basics short

These stay, and they are quick to write:

- `kind`, `tagline`, `role`, `status`: one line each.
- `problem` ("Why I built it"): one or two sentences, in my own words.
- `steps` ("How it works"): only if there is a real sequence of steps.
- `built` (the cards): usually leave it out. The Stack fact and the steps
  already say what it is made of. Keep it only if it adds something new.
- `privacy`: only if the project handles personal data.

## Rules

- **Three story sections at most.** If I have four real answers, drop the least
  interesting.
- **Vary the shape between projects.** One page can lead with a story, another
  with the person it was made for, another with the workflow.
- **No "X, not Y" titles** ("SQLite, not Postgres"). Say why instead.
- **Use "I".** "I wrote the backend in Go because I already knew it" beats
  "Go was chosen for the backend".
- **Be specific.** A permission name, an error message, a number. Not "various
  challenges".
- **Don't end with a summary.** Stop when the last real thing has been said.
- **Show something real.** A screenshot, a command, a small diagram. Every
  project should have at least one real image, not an illustration.
- **Only claim what I can back up.** If I can't point to where a number or a
  claim comes from, cut it.

## Step 4: run the humanize pass

My `humanize` skill lives in
`~/projects/klepon/klepon-licensing/.claude/skills/humanize/SKILL.md`. Run it on
the finished text, then read the page out loud once. If a sentence sounds like
something I would never say, change it.

## Template to paste

Copy this into a project in `utils/projects.ts` and delete what doesn't apply.

```ts
details: {
  kind: "Personal project", // or "Client project", "Non-profit project"
  tagline: "One sentence: what it is and who it is for.",
  role: "Solo developer: ...",
  status: "Running / in progress / archived, as of when?",
  problem: "Why I built it, in a sentence or two.",

  // Only if there really is a sequence of steps:
  steps: [{ title: "...", text: "..." }],

  // Story sections: at most three, each a few first-person paragraphs.
  broke: [
    "What went wrong first, what I tried, what finally worked.",
  ],
  choices: [
    "A choice I made and why, including what I gave up.",
  ],
  worked: [
    "Did it change what I do? An honest answer is enough.",
  ],
  again: [
    "What I would do differently if I started over.",
  ],
  leftOut: [
    "Something I decided not to build, and why.",
  ],

  imageCaption: "Say what the image is. Say so if it is an illustration.",
},
```

## Where the real material hides

If I get stuck, these usually hold the honest details:

- the project's `docs/DECISIONS.md` or `PROGRESS.md` (problems and fixes),
- commit messages that start with "fix",
- notes I wrote to myself while debugging,
- what I changed my mind about between the first and the last commit.
