import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const materials = [
  {
    name: "UPVC",
    tagline: "Practical, low-maintenance comfort",
    points: [
      "Good heat and sound insulation",
      "Does not rust or need repainting",
      "Easy to clean and long-lasting",
      "A budget-friendly choice for homes",
    ],
  },
  {
    name: "Aluminium",
    tagline: "Slim, strong and modern",
    points: [
      "Slim frames with larger glass area",
      "Strong enough for big sliding doors",
      "Matte black and custom finishes",
      "Ideal for villas, offices and facades",
    ],
  },
];

export default function MaterialCompare() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Which Is Right For You
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            UPVC or <span className="text-gold">Aluminium?</span>
          </h2>
          <p className="mt-3 text-muted">
            Not sure which to pick? Here is a quick guide. We&apos;re happy to
            advise on your site.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {materials.map((m, i) => (
            <div
              key={m.name}
              className={`relative overflow-hidden rounded-3xl p-8 shadow-xl ring-1 sm:p-10 ${
                i === 0
                  ? "bg-surface shadow-navy-900/5 ring-border"
                  : "bg-navy-900 text-white shadow-navy-900/30 ring-navy-900"
              }`}
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl ${
                  i === 0 ? "bg-gold/20" : "bg-gold/25"
                }`}
              />
              <p className={`text-xs font-bold uppercase tracking-[0.25em] ${i === 0 ? "text-gold" : "text-gold"}`}>
                {m.tagline}
              </p>
              <h3 className={`mt-2 text-3xl font-extrabold ${i === 0 ? "text-ink" : "text-white"}`}>
                {m.name}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className={`flex items-center gap-3 font-medium ${i === 0 ? "text-ink/80" : "text-white/85"}`}
                  >
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        i === 0 ? "bg-navy-900 text-gold" : "bg-white text-navy-900"
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800"
          >
            Get Expert Advice
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
