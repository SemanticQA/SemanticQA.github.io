// SemanticQA blog — interactions (animations disabled for perf)
(function () {
  // Active nav link
  const path = location.pathname.replace(/\/$/, "").split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === path || (path === "" && href === "index.html") ||
        (path === "index.html" && (href === "./" || href === "index.html"))) {
      a.classList.add("active");
    }
  });

  // Sticky-header scrolled state
  const header = document.querySelector(".site-header");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      if (header) header.classList.toggle("scrolled", y > 8);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navEl = document.querySelector(".nav");
  if (navToggle && navEl) {
    const closeNav = () => {
      navEl.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    };
    navToggle.addEventListener("click", e => {
      e.stopPropagation();
      const open = navEl.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    document.addEventListener("click", e => {
      if (navEl.classList.contains("open") && !navEl.contains(e.target) && e.target !== navToggle) closeNav();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });
    matchMedia("(min-width: 761px)").addEventListener("change", e => { if (e.matches) closeNav(); });
  }

  // Reveal — set everything visible immediately (no animation)
  document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => el.classList.add("visible"));

  // Mini-bar — paint final widths immediately
  document.querySelectorAll(".mini-bar .fill").forEach(fill => {
    const w = fill.getAttribute("data-w") || fill.style.width;
    if (w) {
      fill.style.setProperty("--w", w);
      fill.style.width = w;
    }
  });

  // Scrollspy for TOC (active state only, no animation)
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    const targets = [...tocLinks].map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const sIo = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(l => l.classList.toggle("active",
            l.getAttribute("href") === "#" + e.target.id));
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    targets.forEach(t => sIo.observe(t));
  }

  // Copy citation
  document.querySelectorAll(".cite .copy").forEach(btn => {
    btn.addEventListener("click", () => {
      const pre = btn.parentElement;
      const text = pre.querySelector(".bib").textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const old = btn.textContent;
        btn.textContent = "copied";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = old;
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  });

  // Chip filter (tasks page) — instant toggle
  const chipRow = document.querySelector("[data-chips]");
  if (chipRow) {
    chipRow.addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      const filter = chip.dataset.filter;
      chipRow.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === chip));
      document.querySelectorAll("[data-task]").forEach(card => {
        const match = filter === "all" || card.dataset.task === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  }

  // Smooth-anchor offset compensation for sticky header (no smooth scroll)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", evt => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const tgt = document.getElementById(id);
      if (!tgt) return;
      evt.preventDefault();
      const y = tgt.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: "auto" });
      history.pushState(null, "", "#" + id);
    });
  });
})();
