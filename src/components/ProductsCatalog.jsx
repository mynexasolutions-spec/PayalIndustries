"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allProducts, tagStyles } from "@/lib/products";

const filters = ["All", "UPVC", "Aluminium", "Doors", "Glass"];

export default function ProductsCatalog() {
  const [active, setActive] = useState("All");
  const products = active === "All" ? allProducts : allProducts.filter((p) => p.tag === active);
  const count = (f) => (f === "All" ? allProducts.length : allProducts.filter((p) => p.tag === f).length);

  return (
    <section id="products" className="bg-surface py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Product Range
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Find the <span className="text-gold">right system</span>
          </h2>
          <p className="mt-3 text-muted">
            Filter by material or type. Every product is made to measure.
          </p>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mt-8 bg-surface/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible">
            {filters.map((f) => {
              const on = f === active;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm ${
                    on
                      ? "bg-navy-900 text-white shadow-lg shadow-navy-900/25"
                      : "border border-border bg-white text-ink/70 hover:border-navy-900 hover:text-navy-900"
                  }`}
                >
                  {f}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold sm:px-2 sm:text-xs ${
                      on ? "bg-white/20 text-white" : "bg-surface text-muted"
                    }`}
                  >
                    {count(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={active}
          className="animate-fade-up mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((p) => (
            <Link
              key={p.name}
              href="/contact"
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl shadow-navy-900/5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/15"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span
                  className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs backdrop-blur ${tagStyles[p.tag]}`}
                >
                  {p.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <h3 className="text-sm font-bold leading-snug text-ink sm:text-lg">{p.name}</h3>
                <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:mt-1.5 sm:line-clamp-none sm:text-sm">{p.desc}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 sm:mt-4 sm:pt-4">
                  <span className="text-xs font-semibold text-navy-900 sm:text-sm">Get a Quote</span>
                  <span className="inline-flex h-7 w-7 items-center sm:h-8 sm:w-8 justify-center rounded-full bg-surface text-navy-900 transition-colors group-hover:bg-gold group-hover:text-navy-950">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
