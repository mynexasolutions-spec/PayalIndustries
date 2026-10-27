"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    desktop: "/hero.png",
    mobile: "/mobilehero-hero.jpg",
    alt: "Modern home with aluminium glass sliding doors overlooking an infinity pool at sunset",
    headline: ["A **Window**", "Reflects the Essence", "of **Architecture**"],
    subtitle: "Premium Aluminium Window & Door Systems for Modern Living",
  },
  {
    desktop: "/hero2.png",
    mobile: "/mobilehero2.png",
    alt: "Modern white home with a balcony and floor-to-ceiling aluminium sliding glass doors",
    headline: ["Aluminium **Sliding**", "**Doors** That Open Up", "Your **Home**"],
    subtitle: "Slim-frame sliding systems for balconies, patios and living rooms.",
  },
  {
    desktop: "/hero3.png",
    mobile: "/mobilehero3.png",
    alt: "Glass-walled modern building with slim black aluminium frames",
    headline: ["Glass **Facades**", "Built for Modern", "**Spaces**"],
    subtitle: "Structural glazing for villas, offices and showrooms.",
  },
  {
    desktop: "/hero4.png",
    mobile: "/mobilehero4.png",
    alt: "White multi-panel glass doors opening onto a sunlit terrace",
    headline: ["**UPVC** Doors", "Made for Every", "**Season**"],
    subtitle: "Weather-sealed UPVC folding and sliding doors for every home.",
  },
  {
    desktop: "/hero5.png",
    mobile: "/mobilehero5.png",
    alt: "Black-framed glass partition in a bright modern interior",
    headline: ["Glass **Partitions**", "for Open, Elegant", "**Interiors**"],
    subtitle: "Black-frame aluminium partitions that divide space, not light.",
  },
  {
    desktop: "/hero6.png",
    mobile: "/mobilehero6.png",
    alt: "Aluminium awning windows on a modern white house",
    headline: ["Aluminium **Awning**", "**Windows** That Let", "Air In, Rain **Out**"],
    subtitle: "Top-hung windows with clean, modern lines and easy ventilation.",
  },
];

// Renders "plain **bold** plain" with the marked words in extra-bold.
function Marked({ text }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <span key={i} className="font-extrabold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const n = slides.length;
// Clones of the last and first slide on either end make the loop seamless in both directions.
const track = [slides[n - 1], ...slides, slides[0]];
const SLIDE_MS = 5000;
const SLIDE_TRANSITION = "transform 600ms cubic-bezier(0.22, 0.61, 0.36, 1)";

export default function Hero() {
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);

  const active = (((pos - 1) % n) + n) % n;

  const go = (delta) => {
    setAnimate(true);
    setPos((p) => Math.max(0, Math.min(n + 1, p + delta)));
  };
  const goTo = (i) => {
    setAnimate(true);
    setPos(i + 1);
  };

  // Landing on a clone: jump (without animation) to the matching real slide.
  const settle = () => {
    if (pos !== 0 && pos !== n + 1) return;
    setAnimate(false);
    setPos(pos === 0 ? n : 1);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  };

  useEffect(() => {
    if (pos !== 0 && pos !== n + 1) return;
    const t = setTimeout(settle, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);

  useEffect(() => {
    if (paused || dragging) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [pos, paused, dragging]);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      x: e.clientX,
      id: e.pointerId,
      width: e.currentTarget.offsetWidth,
      moved: false,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    setDragX(dx);
  };
  const endDrag = (e, allowNavigate) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    const dx = e.clientX - d.x;
    const threshold = Math.min(80, d.width * 0.15);
    setDragging(false);
    setDragX(0);
    if (allowNavigate && dx < -threshold) go(1);
    else if (allowNavigate && dx > threshold) go(-1);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-white"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[max(570px,calc(100svh_-_290px))] sm:h-[510px] lg:h-[595px] xl:h-[620px] w-full">
        <div
          className="absolute inset-0 flex cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{
            transform: `translateX(calc(${-pos * 100}% + ${dragX}px))`,
            transition: dragging || !animate ? "none" : SLIDE_TRANSITION,
          }}
          onTransitionEnd={(e) => e.target === e.currentTarget && settle()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e, true)}
          onPointerCancel={(e) => endDrag(e, false)}
        >
          {track.map((s, i) => {
            const isClone = i === 0 || i === n + 1;
            const isFirst = i === 1;
            return (
              <div
                key={i}
                className="relative h-full w-full flex-none"
                aria-hidden={isClone || i - 1 !== active}
                role="group"
                aria-roledescription="slide"
              >
                <Image
                  src={s.mobile}
                  alt={isClone ? "" : s.alt}
                  fill
                  priority={isFirst}
                  sizes="100vw"
                  draggable={false}
                  className="object-cover object-bottom sm:hidden"
                />
                <Image
                  src={s.desktop}
                  alt={isClone ? "" : s.alt}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="hidden object-cover object-center sm:block"
                />
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/45 via-35% to-white/0 to-60% sm:bg-gradient-to-r sm:from-white/90 sm:via-white/50 sm:via-35% sm:to-transparent sm:to-60%" />

        <div className="pointer-events-none relative z-10 h-full container-px mx-auto max-w-7xl flex items-start pt-9 sm:items-center sm:pt-0">
          <div key={active} className="max-w-xl">
            <span className="animate-fade-up mb-4 block h-1 w-14 rounded-full bg-gold" />
            <h1
              className="animate-fade-up text-[clamp(1.35rem,6.4vw,2rem)] sm:text-4xl lg:text-[2.6rem] font-medium leading-[1.2] tracking-tight text-navy-950 uppercase [text-shadow:0_0_16px_rgba(255,255,255,0.95)] sm:[text-shadow:none]"
              style={{ animationDelay: "80ms" }}
            >
              {slides[active].headline.map((line, i) => (
                <span key={i} className="block">
                  <Marked text={line} />
                </span>
              ))}
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-[17rem] text-sm font-semibold leading-relaxed text-ink [text-shadow:0_0_12px_rgba(255,255,255,0.95)] sm:max-w-sm sm:font-medium sm:text-ink/80 sm:[text-shadow:none]"
              style={{ animationDelay: "220ms" }}
            >
              {slides[active].subtitle}
            </p>

            <div
              className="animate-fade-up pointer-events-auto mt-7 flex flex-row flex-nowrap items-center gap-2.5 sm:gap-3"
              style={{ animationDelay: "360ms" }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-navy-900 text-white text-sm font-semibold px-4 py-3 shadow-lg shadow-navy-900/25 hover:bg-navy-800 transition-colors sm:gap-2 sm:px-6"
              >
                Our Products
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-white text-navy-900 text-sm font-semibold px-4 py-3 shadow-md shadow-navy-900/10 hover:bg-surface transition-colors sm:px-6"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy-900 shadow-lg ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-white sm:inline-flex"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy-900 shadow-lg ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-white sm:inline-flex"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-[4.5rem] right-3 z-20 flex gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/40 text-white shadow-lg shadow-black/20 ring-1 ring-white/70 backdrop-blur-sm transition active:scale-95 active:bg-navy-950/60"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/40 text-white shadow-lg shadow-black/20 ring-1 ring-white/70 backdrop-blur-sm transition active:scale-95 active:bg-navy-950/60"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[4.5rem] z-20 flex h-10 items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`pointer-events-auto h-2 rounded-full shadow ring-1 ring-black/10 transition-all duration-300 ${
                i === active ? "w-7 bg-gold" : "w-2 bg-white/80 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
