import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { images } from "@/lib/images";

const rows = [
  {
    title: "Luxury Homes",
    desc: "Slim-frame sliding doors, awning windows and wide glass walls that open your villa to light and views.",
    points: ["Slim-frame sliding doors", "Large-format glass panels", "Matte black and custom finishes"],
    img: "/work-aluminium-window/02.jpg",
  },
  {
    title: "Apartments & High-Rise",
    desc: "Well-sealed sliding and casement windows and balcony doors built for multi-storey living.",
    points: ["Sliding and casement windows", "Tight sealing against dust and rain", "Balcony and French doors"],
    img: images.applications.apartments,
  },
  {
    title: "Commercial Buildings",
    desc: "Glass facades, storefronts and office partitions fabricated and fitted for offices, showrooms and retail.",
    points: ["Structural glazing and facades", "Office glass partitions", "Showroom and storefront glass"],
    img: "/work-glazing/01.jpg",
  },
  {
    title: "Renovation Projects",
    desc: "Replace old, worn-out frames with modern UPVC and aluminium systems without redoing the whole space.",
    points: ["Made-to-measure replacements", "Quick, tidy installation", "Better light, sound and security"],
    img: "/work-aluminium-window/04.jpg",
  },
];

export default function ApplicationsDetail() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Where We Work
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Built for <span className="text-gold">every kind of space</span>
          </h2>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {rows.map((r, i) => (
            <div
              key={r.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div
                  className={`absolute h-full w-full rounded-3xl border-2 border-gold/50 ${
                    i % 2 === 1 ? "-bottom-4 -right-4" : "-bottom-4 -left-4"
                  }`}
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/15">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div>
                <span className="text-6xl font-extrabold leading-none text-navy-900/10">
                  0{i + 1}
                </span>
                <h3 className="-mt-2 text-2xl font-extrabold text-ink sm:text-3xl">{r.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{r.desc}</p>
                <ul className="mt-5 space-y-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-semibold text-ink">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-gold">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800"
                >
                  Get a Quote
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
