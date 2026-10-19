// Things arrive when you scroll to them: a pink marker draws under a heading
// (".heading-marker"), and rows or cards fade up a little ("data-reveal").
// The look is all CSS (assets/css/tailwind.css); this only adds the attribute
// "data-in" the first time something comes into view.
//
// It is an attribute, not a class, on purpose: Vue rewrites an element's class
// whenever a bound class changes (for example a highlighted fact), which would
// wipe a class added from here and hide the element again. Vue never touches an
// attribute it doesn't know about.
//
// To make a list arrive one after another, put data-reveal-group on the list
// and data-reveal on each direct child.
//
// Nothing stays hidden if this does not run: the page is only prepared for it
// (class "reveal-on" on <html>, set by a tiny script in nuxt.config.ts), and
// until this adds "reveal-ready", a CSS fallback shows everything after 3 seconds.
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement;
  if (typeof IntersectionObserver === "undefined") {
    root.classList.remove("reveal-on");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-in", "");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  const scan = () => {
    // Stagger: 80 ms between the children of a group (at most 8 steps).
    document.querySelectorAll("[data-reveal-group]").forEach((group) => {
      group.querySelectorAll(":scope > [data-reveal]").forEach((el, i) => {
        (el as HTMLElement).style.setProperty("--d", `${Math.min(i, 8) * 80}ms`);
      });
    });
    document.querySelectorAll(".heading-marker, [data-reveal]").forEach((el) => {
      if (!el.hasAttribute("data-in")) observer.observe(el);
    });
  };

  // Items added later (a filtered list, a section that loads late) need to be
  // noticed too, or they would stay hidden. Looking again is cheap.
  let queued = false;
  const scanSoon = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  };

  nuxtApp.hook("app:mounted", () => {
    scan();
    new MutationObserver(scanSoon).observe(document.body, { childList: true, subtree: true });
    // Running: switches off the CSS safety net (see the end of tailwind.css).
    root.classList.add("reveal-ready");
  });
  // After every page change the new page's content is on screen: look again.
  nuxtApp.hook("page:finish", scanSoon);
});
