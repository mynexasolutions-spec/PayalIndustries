import { Settings2, LayoutGrid, Building2, Headphones } from "lucide-react";

const features = [
  {
    icon: Settings2,
    title: "Precision Engineering",
    desc: "Thoughtful design in every detail",
  },
  {
    icon: LayoutGrid,
    title: "Modern Design",
    desc: "Aesthetic solutions for today's spaces",
  },
  {
    icon: Building2,
    title: "Durable Aluminium",
    desc: "Built for long-lasting performance",
  },
  {
    icon: Headphones,
    title: "Project Support",
    desc: "Guidance at every step",
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative z-10 -mt-14 pb-6 sm:-mt-16">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/15 ring-1 ring-border lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`group relative flex flex-col items-center gap-3 px-3 py-6 text-center transition-colors hover:bg-surface sm:px-5 lg:flex-row lg:gap-3.5 lg:px-5 lg:text-left xl:px-7 ${
                i % 2 === 1 ? "border-l border-border" : ""
              } ${i >= 2 ? "border-t border-border lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-border" : ""
              }`}
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-navy-900 shadow-md shadow-navy-900/10 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                <Icon size={21} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-sm font-bold text-ink sm:text-base">{title}</p>
                <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{desc}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy-900 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
