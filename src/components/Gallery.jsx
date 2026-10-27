"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight, Expand, Play, Images, LayoutGrid } from "lucide-react";
import { workCategories } from "@/lib/work-gallery";
import { reels } from "@/lib/reels";

const tag = (c) => c.items.map((item) => ({ ...item, cat: c.label }));

const catalogOnly = ["aluminium-window-sample", "slim-window"];

const photoItems = workCategories
  .filter((c) => !catalogOnly.includes(c.id))
  .flatMap(tag);

const videoItems = reels.map((r) => ({
  type: "video",
  src: r.src,
  poster: r.poster,
  alt: r.title,
  cat: r.title,
}));

// Videos are spread through the "All" grid, evenly and clear of the last few tiles.
const TAIL = 4;
const VIDEO_EVERY = Math.max(1, Math.floor((photoItems.length - TAIL) / Math.max(1, videoItems.length)));
const allItems = photoItems.flatMap((item, i) => {
  const v = (i + 1) % VIDEO_EVERY === 0 ? videoItems[(i + 1) / VIDEO_EVERY - 1] : null;
  return v ? [item, v] : [item];
});

const categories = [
  { id: "all", label: "All", items: allItems },
  ...workCategories.map((c) => ({ ...c, items: tag(c) })),
];

const mediaTabs = [
  { id: "all", label: "All", icon: LayoutGrid, count: allItems.length },
  { id: "photos", label: "Photos", icon: Images, count: photoItems.length },
  { id: "videos", label: "Videos", icon: Play, count: videoItems.length },
];

const featuredSrc = [
  "/work-aluminium-window/02.jpg",
  "/work-glazing/03.jpg",
  "/work-aluminium-partition/01.jpg",
  "/work-upvc-window/05.jpg",
  "/work-aluminium-window/09.jpg",
  "/work-glazing/09.jpg",
  "/work-aluminium-partition/10.jpg",
  "/work-upvc-window/08.jpg",
];
const featured = featuredSrc
  .map((src) => allItems.find((i) => i.src === src))
  .filter(Boolean);

const isTall = (i) => i % 7 === 0 || i % 7 === 4;

// Which tiles span two rows. Videos always do (that is what makes them 9:16, see rowH below).
// The grid is 2 or 4 columns wide, so tiles + one extra per tall tile must be a multiple of 4
// and the last few photos stay single, or the final row is left with empty cells.
function tallIndices(list) {
  const videos = [];
  const photos = [];
  list.forEach((item, i) => {
    if (item.type === "video") videos.push(i);
    else if (i < list.length - TAIL && isTall(i)) photos.push(i);
  });
  while (photos.length && (list.length + videos.length + photos.length) % 4 !== 0) photos.pop();
  return new Set([...videos, ...photos]);
}

// Muted, looping clip inside a grid tile. Plays only while it is on screen.
function GalleryVideo({ item }) {
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
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={item.alt}
      onVolumeChange={(e) => {
        e.currentTarget.muted = true;
      }}
      onContextMenu={(e) => e.preventDefault()}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  );
}

export default function Gallery({ preview = false }) {
  const [activeId, setActiveId] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStart = useRef(null);

  const [media, setMedia] = useState("all");

  // The "All" category follows the media tab; videos have no category, so that tab skips them.
  const catItems = (cat) => (cat.id === "all" && media === "photos" ? photoItems : cat.items);
  const items = preview
    ? featured
    : media === "videos"
      ? videoItems
      : catItems(categories.find((c) => c.id === activeId));
  const videosOnly = !preview && media === "videos";

  // Category chips scroll sideways on mobile; track the edges so the arrows/fades only show
  // when there is more to see in that direction.
  const chipsRef = useRef(null);
  const [chipEdge, setChipEdge] = useState({ start: true, end: true });
  const updateChipEdge = () => {
    const el = chipsRef.current;
    if (!el) return;
    setChipEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };
  const scrollChips = (dir) => {
    chipsRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };
  useEffect(() => {
    updateChipEdge();
    window.addEventListener("resize", updateChipEdge);
    return () => window.removeEventListener("resize", updateChipEdge);
  }, [media, preview]);

  // Row height that makes a two-row tile exactly 9:16, so videos are never cropped.
  // The class-based row heights above are the fallback until this has measured.
  const wrapRef = useRef(null);
  const [rowH, setRowH] = useState(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const cols = window.innerWidth >= 1024 ? 4 : 2;
      const gap = window.innerWidth >= 640 ? 16 : 12;
      const w = el.clientWidth;
      if (w > 0) setRowH((((w - (cols - 1) * gap) / cols) * 16) / 9 / 2 - gap / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const tall = tallIndices(items);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + items.length) % items.length);    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, items.length]);

  const showPrev = () => setLightboxIndex((i) => (i - 1 + items.length) % items.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % items.length);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Horizontal swipe only: ignore short drags and mostly-vertical gestures.
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  return (
    <section id="projects" className="bg-surface py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              Our Work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Real Projects, <span className="text-gold">Real Installations</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              A look at UPVC, aluminium and glass work completed by Payal
              Industries across Hubli and Karnataka.
            </p>
          </div>
          {preview && (
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800 sm:self-auto"
            >
              View All Projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {!preview && videoItems.length > 0 && (
          <div className="mt-8 flex w-full rounded-full bg-white p-1 shadow-sm ring-1 ring-border sm:inline-flex sm:w-auto">
            {mediaTabs.map((tab) => {
              const active = tab.id === media;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMedia(tab.id)}
                  aria-pressed={active}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold transition-all sm:flex-none sm:gap-2 sm:px-5 ${
                    active ? "bg-navy-900 text-white shadow-md shadow-navy-900/25" : "text-ink/70 hover:text-navy-900"
                  }`}
                >
                  <Icon size={15} className={`hidden sm:block ${tab.id === "videos" ? "fill-current" : ""}`} />
                  {tab.label}
                  <span className={`text-xs font-bold ${active ? "text-white/70" : "text-muted"}`}>{tab.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {!preview && media !== "videos" && (
          <div className="sticky top-16 z-20 -mx-4 mt-4 bg-surface/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
            <div className="relative">
            {/* Mobile only: edge fades + arrows show that the chip row scrolls sideways. */}
            {!chipEdge.start && (
              <button
                type="button"
                aria-label="Scroll categories left"
                onClick={() => scrollChips(-1)}
                className="absolute -left-4 bottom-1 top-0 z-10 flex w-14 items-center justify-start bg-gradient-to-r from-surface via-surface/90 to-transparent pl-4 sm:hidden"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-border">
                  <ChevronLeft size={18} />
                </span>
              </button>
            )}
            {!chipEdge.end && (
              <button
                type="button"
                aria-label="Scroll categories right"
                onClick={() => scrollChips(1)}
                className="absolute -right-4 bottom-1 top-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-surface via-surface/90 to-transparent pr-4 sm:hidden"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-border">
                  <ChevronRight size={18} />
                </span>
              </button>
            )}
            <div
              ref={chipsRef}
              onScroll={updateChipEdge}
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible"
            >
              {categories.map((cat) => {
                const active = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      active
                        ? "bg-navy-900 text-white shadow-lg shadow-navy-900/25"
                        : "border border-border bg-white text-ink/70 hover:border-navy-900 hover:text-navy-900"
                    }`}
                  >
                    {cat.label}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        active ? "bg-white/20 text-white" : "bg-surface text-muted"
                      }`}
                    >
                      {catItems(cat).length}
                    </span>
                  </button>
                );
              })}
            </div>
            </div>
          </div>
        )}

        <div ref={wrapRef} className="mt-6">
        <div
          key={preview ? "preview" : `${media}-${activeId}`}
          style={!preview && rowH ? { gridAutoRows: `${rowH}px` } : undefined}
          className={`gap-3 sm:gap-4 ${
            videosOnly
              ? "flex flex-wrap justify-center"
              : `grid grid-cols-2 lg:grid-cols-4 ${
                  preview ? "" : "auto-rows-[190px] grid-flow-dense sm:auto-rows-[230px] lg:auto-rows-[250px]"
                }`
          }`}
        >
          {items.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden rounded-2xl bg-white text-left shadow-lg shadow-navy-900/5 ring-1 ring-border ${
                videosOnly
                  ? "aspect-[9/16] w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                  : preview
                    ? "aspect-[4/3]"
                    : tall.has(idx)
                      ? "row-span-2"
                      : ""
              }`}
            >
              {item.type === "video" ? (
                <GalleryVideo item={item} />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              {item.type === "video" && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white ring-1 ring-white/25 backdrop-blur-md">
                  <Play size={10} className="fill-current" />
                  Video
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/90 text-navy-900 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Expand size={16} />
              </span>
              <span className="absolute inset-x-3 bottom-3 translate-y-2 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.cat}
              </span>
            </button>
          ))}
        </div>
        </div>

        {!preview && (
          <p className="mt-6 text-center text-sm text-muted">
            Showing {items.length} {items.length === 1 ? "project" : "projects"}
          </p>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex touch-pan-y items-center justify-center bg-navy-950/95 p-4 sm:p-10"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute left-5 top-5 text-sm font-semibold text-white/80">
            {lightboxIndex + 1} / {items.length}
          </div>
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-5 top-5 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-950/70 text-white shadow-lg ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25 sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="relative h-[72vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {items[lightboxIndex].type === "video" ? (
              <video
                key={items[lightboxIndex].src}
                src={items[lightboxIndex].src}
                poster={items[lightboxIndex].poster}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                aria-label={items[lightboxIndex].alt}
                onVolumeChange={(e) => {
                  e.currentTarget.muted = true;
                }}
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            )}
          </div>
          <p className="absolute bottom-6 left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 truncate rounded-full bg-white/15 px-4 py-1.5 text-center text-xs font-semibold text-white backdrop-blur sm:text-sm">
            {items[lightboxIndex].cat}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-950/70 text-white shadow-lg ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25 sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
