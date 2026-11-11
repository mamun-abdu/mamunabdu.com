(function () {
  const fallback = [
    {
      title: "Ultimate Guide to Claiming the GitHub Student Developer Pack",
      brief:
        "Unlock premium developer tools for free. A step-by-step guide to claiming the GitHub Student Developer Pack.",
      url: "https://mamunabdu.hashnode.dev/ultimate-guide-to-claiming-the-github-student-developer-pack",
      date: "2025-07-25",
    },
    {
      title: "Best Platforms to Learn Programming for Free",
      brief:
        "Free, beginner-friendly places to start coding, including freeCodeCamp, Codecademy, Coursera, edX, and more.",
      url: "https://mamunabdu.hashnode.dev/best-platforms-to-learn-programming-for-free",
      date: "2025-07-19",
    },
    {
      title: "Discover the Top 5 Free AI Tools for Students",
      brief:
        "Free AI tools for students, including ChatGPT, Grammarly, and Notion AI, to help with studying and productivity.",
      url: "https://mamunabdu.hashnode.dev/discover-the-top-5-free-ai-tools-for-students",
      date: "2025-07-15",
    },
    {
      title: "How to Get Notion’s Education Plus Plan for Free (as a Student)",
      brief:
        "How students can unlock Notion’s Education Plus plan with an education email.",
      url: "https://mamunabdu.hashnode.dev/how-to-get-notions-education-plus-plan-for-free-as-a-student",
      date: "2025-07-12",
    },
    {
      title: "Free Notion Templates for Students to Boost Productivity",
      brief:
        "Five free Notion templates for managing classes and organizing study time.",
      url: "https://mamunabdu.hashnode.dev/free-notion-templates-for-students-to-boost-productivity",
      date: "2025-07-09",
    },
  ];

  const list = document.getElementById("posts");
  if (!list) return;

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function render(posts) {
    if (!posts || !posts.length) return;
    const html = posts
      .slice(0, 5)
      .map((post) => {
        const title = escapeHtml(post.title);
        const brief = escapeHtml(post.brief || "");
        const url = post.url;
        const date = post.date;
        return (
          "<li><a href=\"" +
          escapeAttr(url) +
          "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
          "<time datetime=\"" +
          escapeAttr(date) +
          "\">" +
          escapeHtml(formatDate(date)) +
          "</time>" +
          "<span class=\"post-title\">" +
          title +
          "</span>" +
          (brief ? "<span class=\"post-brief\">" + brief + "</span>" : "") +
          "</a></li>"
        );
      })
      .join("");
    list.innerHTML = html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function textOf(el, name) {
    const node = el.getElementsByTagName(name)[0];
    return node ? (node.textContent || "").trim() : "";
  }

  function toIso(pubDate) {
    const d = new Date(pubDate);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  function stripTags(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || "").trim();
  }

  fetch("https://mamunabdu.hashnode.dev/rss.xml", { mode: "cors" })
    .then((res) => {
      if (!res.ok) throw new Error("RSS " + res.status);
      return res.text();
    })
    .then((xmlText) => {
      const xml = new DOMParser().parseFromString(xmlText, "text/xml");
      if (xml.querySelector("parsererror")) throw new Error("RSS parse error");
      const items = Array.from(xml.getElementsByTagName("item")).map((item) => {
        const title = textOf(item, "title");
        const url = textOf(item, "link");
        const brief = stripTags(textOf(item, "description"));
        const date = toIso(textOf(item, "pubDate"));
        return { title, url, brief, date };
      }).filter((p) => p.title && p.url);
      if (!items.length) throw new Error("No posts");
      render(items);
    })
    .catch(() => {
      // Hashnode's public GraphQL API is no longer free, and RSS may be blocked by CORS.
      // The static posts already in the page remain as the fallback.
    });

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

  function setActiveNav() {
    if (!navTargets.length) return;
    const offset = 96;
    if (navTargets[0].getBoundingClientRect().top > offset) {
      navLinks.forEach((link) => {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      });
      return;
    }
    let current = navTargets[0];
    navTargets.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });
    navLinks.forEach((link) => {
      const on = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("resize", setActiveNav);

})();
