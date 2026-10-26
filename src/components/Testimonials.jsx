"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews } from "@/lib/reviews";

const INTERVAL = 4500;

function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

export default function Testimonials() {
  const perView = usePerView();
  const total = reviews.length;
  const slides = [...reviews, ...reviews.slice(0, perView)];
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  const current = index % total;

  useEffect(() => {
    setAnimate(false);
    setIndex(0);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [perView]);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (index === 0) {
      setAnimate(false);
      setIndex(total);
      setTimeout(() => {
        setAnimate(true);
        setIndex(total - 1);
      }, 50);
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [index, total]);

  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (index >= total) {
        setAnimate(false);
        setIndex(index - total);
        setTimeout(() => setAnimate(true), 50);
      }
    },
    [index, total]
  );

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    const start = touchStart.current;
    touchStart.current = null;
    setPaused(false);
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-surface py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-900/5 blur-3xl" />

      <div className="relative container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              What Our Clients Say
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Trusted by <span className="text-gold">Homeowners</span> and Professionals
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-navy-900 shadow-md shadow-navy-900/5 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-navy-900 shadow-md shadow-navy-900/5 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="-mx-3 mt-10 touch-pan-y overflow-hidden px-0 py-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStart.current = null;
            setPaused(false);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex ${
              animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
            }`}
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {slides.map((r, n) => (
              <div
                key={`${r.name}-${n}`}
                className="shrink-0 px-3"
                style={{ flexBasis: `${100 / perView}%` }}
              >
                <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-xl shadow-navy-900/8 ring-1 ring-border">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-gold shadow-md shadow-navy-900/25">
                    <Quote size={20} fill="currentColor" strokeWidth={0} />
                  </span>

                  <div className="mt-5 flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink/80">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-900 to-navy-700 text-sm font-bold text-white">
                      {r.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="leading-tight">
                      <p className="text-base font-bold text-ink">{r.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{r.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(i);
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-navy-900" : "w-2.5 bg-navy-900/20 hover:bg-navy-900/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
