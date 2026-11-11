(function () {
  // Hashnode's RSS has no CORS header, so a browser fetch always fails and logs a
  // console error. The static posts in the markup are the source of truth.

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const navLinks = Array.from(document.querySelectorAll('.site-header nav a[href^="#"]'));
  const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function applyActive(current) {
    navLinks.forEach((link) => {
      const on = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  // Layout position, ignoring the reveal transform that shifts sections while they fade in.
  function topOf(el) {
    let y = 0;
    for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
    return y - window.scrollY;
  }

  function setActiveNav() {
    if (!navTargets.length) return;
    const header = document.querySelector(".site-header");
    const offset = (header ? header.getBoundingClientRect().height : 72) + 20;
    const scrollBottom = window.scrollY + window.innerHeight;
    const atBottom = window.scrollY > 8 && scrollBottom >= document.documentElement.scrollHeight - 16;

    // The contact block often can't reach the offset line because the footer is short.
    if (atBottom) {
      applyActive(navTargets[navTargets.length - 1]);
      return;
    }

    // A few px of slack so a section scrolled to the offset line still counts.
    const slack = 4;
    if (topOf(navTargets[0]) > offset + slack) {
      applyActive(null);
      return;
    }

    let current = navTargets[0];
    navTargets.forEach((section) => {
      if (topOf(section) <= offset + slack) current = section;
    });
    applyActive(current);
  }

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("resize", setActiveNav);

})();
