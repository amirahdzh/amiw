---
title: "How I Built My Website (Part 3): A Real-Time Canvas with tldraw"
description: "Mounting a React library inside Vue, self-hosting multiplayer sync on Cloudflare Workers, and the licensing mystery that took way longer to find than it should have."
date: "2026-08-27"
tags: [technology, web-development]
image: /img/blog/placeholder.svg   # swap for this post's own picture (a path under public/)
draft: true
---

<!--
Draft. Write the full post below, then delete `draft: true` above to publish it.
See docs/writing-blog-posts.md.

Beats worth hitting, roughly in the order they actually happened:
1. Mounting a React library (tldraw) inside Vue via a .client.vue wrapper plus
   manual createRoot/createElement. No Vue-React bridge library.
2. The .client.vue onMounted/nextTick ref-timing bug: onMounted fires one tick
   before the template ref is populated, so the board silently never mounted
   until `await nextTick()` was added.
3. Self-hosting multiplayer sync on a Cloudflare Worker (Durable Objects + R2)
   instead of paying for someone else's, adapted from tldraw's official
   sync-cloudflare template.
4. The false lead: added a React ErrorBoundary assuming an uncaught crash was
   blanking the board after a while. Reasonable diagnosis, wrong. Worth
   including as "here's how I was confidently wrong."
5. The actual culprit, found by live-debugging the deployed site: tldraw's SDK
   deliberately hides the whole editor 5 seconds after mount when unlicensed on
   a real domain (LicenseProvider.tsx, shouldHideEditorAfterDelay +
   LICENSE_TIMEOUT). No crash, no error, just intentional silence. It looked
   intermittent because early remounts kept resetting the 5s timer, until
   things settled and it finally ran to completion.
6. Fixed with a real tldraw license key threaded through as an env var, same
   pattern as the sync worker URL.

Skeleton to start from (copy it below this comment, then replace the prompts):

## What I wanted
A shared canvas on the site, and why.

## The React-in-Vue wrapper
Beats 1 and 2 above. Include the nextTick bug.

## Multiplayer on a Cloudflare Worker
Beat 3. Why self-host, and what I adapted from tldraw's template.

## The false lead
Beat 4. How I was confidently wrong.

## The real cause
Beat 5. The 5-second license timeout, and why it looked intermittent.

## The fix
Beat 6, plus what I'd tell someone about to do the same.
-->

Mounting a React library inside Vue, self-hosting multiplayer sync on Cloudflare Workers, and the licensing mystery that took way longer to find than it should have.
