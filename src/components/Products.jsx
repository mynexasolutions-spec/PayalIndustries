import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allProducts, tagStyles } from "@/lib/products";

export default function Products() {
  const products = allProducts.slice(0, 6);

  return (
    <section id="products" className="bg-surface py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 section-eyebrow">
              <span className="h-0.5 w-9 rounded-full bg-gold" />
              Our Products
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              UPVC, Aluminium &amp; <span className="text-gold">Glass Systems</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Windows, doors and glass work made to measure for your space.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800 sm:self-auto"
          >
            View All Products
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
