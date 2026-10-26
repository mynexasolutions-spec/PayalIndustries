import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

const applications = [
  {
    name: "Luxury Homes",
    desc: "Slim-frame sliding and casement systems for premium villas.",
    img: images.applications.luxuryHomes,
  },
  {
    name: "Apartments & High-Rise",
    desc: "Durable, tight-sealing windows built for multi-storey living.",
    img: images.applications.apartments,
  },
  {
    name: "Commercial Buildings",
    desc: "Glass facades, partitions and glazing for offices and retail.",
    img: "/work-glazing/01.jpg",
  },
  {
    name: "Renovation Projects",
    desc: "Upgrade old frames to modern UPVC and aluminium systems.",
    img: images.applications.renovation,
  },
];

export default function Applications() {
  return (
    <section id="applications" className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              Applications
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Versatile Solutions for <span className="text-gold">Every Space</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              From private homes to commercial towers, we fit the right system
              to the space.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800 sm:self-auto"
          >
            See Our Work
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {applications.map((a, i) => (
            <Link
              key={a.name}
              href="/projects"
              className="group relative block h-[250px] overflow-hidden rounded-2xl shadow-xl shadow-navy-900/10 ring-1 ring-border sm:h-[420px] sm:rounded-3xl"
            >
              <Image
                src={a.img}
                alt={a.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent transition-opacity duration-300 group-hover:from-navy-950" />

              <span className="absolute left-3 top-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-white/90 px-2 text-xs font-bold sm:left-4 sm:top-4 sm:h-9 sm:min-w-9 sm:text-sm text-navy-900 backdrop-blur">
                0{i + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                <h3 className="text-base font-bold leading-tight text-white sm:text-xl">{a.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-snug text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                  {a.desc}
                </p>
                <span className="mt-2 inline-flex h-8 w-8 items-center sm:mt-3 sm:h-9 sm:w-9 justify-center rounded-full bg-white text-navy-900 transition-colors group-hover:bg-gold">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
