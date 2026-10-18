// Things arrive when you scroll to them: a pink marker draws under a heading
// (".heading-marker"), and rows or cards fade up a little ("data-reveal").
// The look is all CSS (assets/css/tailwind.css); this only adds the class
// "is-in" the first time something comes into view.
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
        entry.target.classList.add("is-in");
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
      if (!el.classList.contains("is-in")) observer.observe(el);
    });
  };

  nuxtApp.hook("app:mounted", () => {
    scan();
    // Running: switches off the CSS safety net (see the end of tailwind.css).
    root.classList.add("reveal-ready");
  });
  // After every page change the new page's content is on screen: look again.
  nuxtApp.hook("page:finish", () => requestAnimationFrame(scan));
});
