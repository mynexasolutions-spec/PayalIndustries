"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { reels } from "@/lib/reels";

// Full-size player. Always muted, with no way to turn sound on.
function ReelLightbox({ index, onClose, onStep }) {
  const reel = reels[index];
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const touchRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const nav =
    "absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-gold hover:text-navy-950 sm:h-12 sm:w-12";

  // Horizontal swipe on touch screens steps between clips.
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) onStep(dx < 0 ? 1 : -1);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-gold hover:text-navy-950 sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      <button type="button" aria-label="Previous clip" onClick={(e) => { e.stopPropagation(); onStep(-1); }} className={`${nav} left-2 sm:left-6`}>
        <ChevronLeft size={22} />
      </button>
      <button type="button" aria-label="Next clip" onClick={(e) => { e.stopPropagation(); onStep(1); }} className={`${nav} right-2 sm:right-6`}>
        <ChevronRight size={22} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[9/16] w-[min(100%,calc(82dvh*9/16))] overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
      >
        {/* No native controls: they carry a volume button. Tap to pause/play instead. */}
        <video
          key={reel.src}
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onVolumeChange={(e) => {
            e.currentTarget.muted = true;
          }}
          onContextMenu={(e) => e.preventDefault()}
          onClick={togglePlay}
          aria-label={reel.title}
          className="h-full w-full cursor-pointer object-cover"
        />
        {paused && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md">
              <Play size={26} className="ml-0.5 fill-current" />
            </span>
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-navy-950/60 via-navy-950/20 to-transparent px-4 pb-8 pt-4">
          <h3 className="text-base font-bold leading-tight text-white">{reel.title}</h3>
          {reel.place && <p className="mt-0.5 text-xs font-medium text-white/75">{reel.place}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
}

// One muted, endlessly looping 9:16 card. Plays only while it is on screen.
function ReelCard({ reel, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <article className="group relative aspect-[9/16] w-[64vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-navy-950 shadow-lg shadow-navy-900/10 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/20 sm:w-60 lg:w-[17rem]">
      <video
        ref={ref}
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noremoteplayback"
        aria-label={reel.title}
        onVolumeChange={(e) => {
          e.currentTarget.muted = true;
        }}
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/20" />

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Watch ${reel.title}`}
        className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white opacity-0 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-950 group-hover:opacity-100 max-sm:opacity-100">
          <Play size={22} className="ml-0.5 fill-current" />
        </span>
      </button>

      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/25">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        Live work
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <span className="mb-2 block h-0.5 w-8 rounded-full bg-gold" />
        <h3 className="text-base font-bold leading-tight text-white">{reel.title}</h3>
        {reel.place && <p className="mt-0.5 text-xs font-medium text-white/75">{reel.place}</p>}
      </div>
    </article>
  );
}

export default function ReelsShowcase() {
  const trackRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [active, setActive] = useState(null);

  const closeLightbox = useCallback(() => setActive(null), []);
  const stepLightbox = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + reels.length) % reels.length)),
    []
  );

  const updateEdge = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setEdge({
      start: t.scrollLeft <= 4,
      end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdge();
    window.addEventListener("resize", updateEdge);
    return () => window.removeEventListener("resize", updateEdge);
  }, [updateEdge]);

  if (reels.length === 0) return null;

  const scrollBy = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-900 shadow-md shadow-navy-900/10 ring-1 ring-border transition-colors hover:bg-gold hover:text-navy-950 disabled:pointer-events-none disabled:opacity-40";

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              Watch Our Work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Real Installations, <span className="text-gold">In Motion</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Short clips from our recent UPVC, aluminium and glass projects across Hubli.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button type="button" aria-label="Previous clips" disabled={edge.start} onClick={() => scrollBy(-1)} className={arrow}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Next clips" disabled={edge.end} onClick={() => scrollBy(1)} className={arrow}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateEdge}
          className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-8 pt-3 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:-mx-10 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {reels.map((reel, i) => (
            <ReelCard key={reel.src} reel={reel} onOpen={() => setActive(i)} />
          ))}
        </div>
      </div>

      {active !== null && <ReelLightbox index={active} onClose={closeLightbox} onStep={stepLightbox} />}
    </section>
  );
}
