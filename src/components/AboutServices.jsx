import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "UPVC Windows & Doors",
    desc: "Energy-efficient, low-maintenance sliding and casement UPVC systems.",
    img: "/work-upvc-window/01.jpg",
  },
  {
    title: "Aluminium Windows & Doors",
    desc: "Slim-frame sliding, casement and awning systems in modern finishes.",
    img: "/work-aluminium-window/01.jpg",
  },
  {
    title: "Partitions & Glass Work",
    desc: "Office partitions, glass doors, facades and all types of glazing.",
    img: "/work-aluminium-partition/01.jpg",
  },
];

export default function AboutServices() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            Three specialities, <span className="text-gold">one workshop</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href="/products"
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-900/10 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-all group-hover:gap-2.5">
                  View products <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
