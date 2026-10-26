import { ListChecks, Gem, Wrench, LifeBuoy } from "lucide-react";

const values = [
  {
    icon: ListChecks,
    title: "Tailored Selection",
    desc: "The right system for your space, size and budget.",
  },
  {
    icon: Gem,
    title: "Quality Materials",
    desc: "Good profiles, glass and hardware with attention to detail.",
  },
  {
    icon: Wrench,
    title: "Expert Fitting",
    desc: "Precise measurement and neat installation by skilled hands.",
  },
  {
    icon: LifeBuoy,
    title: "Support Throughout",
    desc: "Help from first enquiry right through to installation.",
  },
];

export default function AboutValues() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-navy-900/5 blur-3xl" />

      <div className="relative container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Why Choose Payal Industries
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            A partner for better <span className="text-gold">living spaces</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-navy-900/5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 hover:ring-navy-900/30"
            >
              <span className="absolute right-5 top-3 text-5xl font-extrabold text-navy-900/5 transition-colors group-hover:text-navy-900/10">
                0{i + 1}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white shadow-md shadow-navy-900/25 transition-transform duration-300 group-hover:scale-105">
                <Icon size={21} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy-900 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
