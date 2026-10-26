"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight, Expand } from "lucide-react";
import { workCategories } from "@/lib/work-gallery";

const tag = (c) => c.items.map((item) => ({ ...item, cat: c.label }));

const allItems = workCategories
  .filter((c) => c.id !== "aluminium-window-sample")
  .flatMap(tag);

const categories = [
  { id: "all", label: "All", items: allItems },
  ...workCategories.map((c) => ({ ...c, items: tag(c) })),
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

export default function Gallery({ preview = false }) {
  const [activeId, setActiveId] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items = preview ? featured : categories.find((c) => c.id === activeId).items;

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + items.length) % items.length);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, items.length]);

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

        {!preview && (
          <div className="sticky top-[72px] z-20 -mx-4 mt-8 bg-surface/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible">
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
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div
          key={preview ? "preview" : activeId}
          className={`mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 ${
            preview
              ? ""
              : "auto-rows-[190px] grid-flow-dense sm:auto-rows-[230px] lg:auto-rows-[250px]"
          }`}
        >
          {items.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden rounded-2xl bg-white text-left shadow-lg shadow-navy-900/5 ring-1 ring-border ${
                preview ? "aspect-[4/3]" : isTall(idx) ? "row-span-2" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={`${item.cat} project`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
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

        {!preview && (
          <p className="mt-6 text-center text-sm text-muted">
            Showing {items.length} {items.length === 1 ? "project" : "projects"}
          </p>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 sm:p-10"
          onClick={() => setLightboxIndex(null)}
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
              setLightboxIndex((i) => (i - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            className="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="relative h-[72vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[lightboxIndex].src}
              alt={`${items[lightboxIndex].cat} project`}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            {items[lightboxIndex].cat}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % items.length);
            }}
            aria-label="Next"
            className="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
