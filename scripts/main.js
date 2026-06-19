document.addEventListener("DOMContentLoaded", () => {
  // ---- Copy-to-clipboard for BibTeX (any element with data-copy-target) ----
  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });
  });

  // ---- Carousels: single slide shown at a time, prev/next arrows ----
  // Used by Task Examples and by each Rollout category panel.
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = carousel.querySelectorAll("[data-carousel-slide]");
    const counter = carousel.parentElement.querySelector("[data-carousel-counter]");
    let index = 0;

    function show(i) {
      index = (i + slides.length) % slides.length; // wrap around
      slides.forEach((slide, n) => {
        const isActive = n === index;
        slide.classList.toggle("is-active", isActive);
        slide.querySelectorAll("video").forEach((v) => {
          // Only play when the slide is active AND actually visible on screen
          // (a slide inside a hidden category panel has no offsetParent).
          if (isActive && carousel.offsetParent !== null) v.play().catch(() => {});
          else v.pause();
        });
      });
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    }

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(index + 1));

    // Expose a refresh so parent panels can re-trigger playback when shown.
    carousel._refresh = () => show(index);
    show(0);
  });

  // ---- Rollout demos: category tabs (Simulation / Real World) ----
  const tabs = document.querySelectorAll(".rollout-tab");
  const panels = document.querySelectorAll(".rollout-panel");

  function activate(id) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.rolloutTab === id));
    panels.forEach((p) => {
      const isActive = p.dataset.rolloutPanel === id;
      p.classList.toggle("is-active", isActive);
      if (isActive) {
        // Re-trigger the panel's carousel so its current slide starts playing.
        p.querySelectorAll("[data-carousel]").forEach((c) => c._refresh && c._refresh());
      } else {
        p.querySelectorAll("video").forEach((v) => v.pause());
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.rolloutTab));
  });
});
