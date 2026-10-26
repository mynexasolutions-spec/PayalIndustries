"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  "main section .container-px > *",
  "main section .container-px .grid > *",
  "footer .grid > *",
].join(",");

export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);
          el.classList.add("is-visible");
          timers.push(
            setTimeout(() => {
              el.classList.remove("reveal", "is-visible");
              el.style.transitionDelay = "";
            }, 1400)
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
      (el) => !el.closest("[data-no-reveal]") && getComputedStyle(el).position !== "fixed"
    );

    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.remove("reveal", "is-visible");
        el.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
