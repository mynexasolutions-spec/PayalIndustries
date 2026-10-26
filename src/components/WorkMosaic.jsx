import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tiles = [
  { src: "/work-glazing/03.jpg", label: "Glass Facades", big: true },
  { src: "/work-aluminium-window/02.jpg", label: "Aluminium Sliding Doors" },
  { src: "/work-aluminium-partition/01.jpg", label: "Office Partitions" },
  { src: "/work-upvc-window/05.jpg", label: "UPVC French Doors" },
  { src: "/work-glazing/09.jpg", label: "Structural Glazing" },
];

export default function WorkMosaic() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              Our Work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Our work <span className="text-gold">speaks for itself</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800 sm:self-auto"
          >
            See All Projects
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:auto-rows-[250px] lg:grid-cols-4">
          {tiles.map((t) => (
            <Link
              key={t.src}
              href="/projects"
              className={`group relative overflow-hidden rounded-2xl shadow-lg shadow-navy-900/10 ring-1 ring-border ${
                t.big ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={t.src}
                alt={t.label}
                fill
                sizes={t.big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white sm:text-base">
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
