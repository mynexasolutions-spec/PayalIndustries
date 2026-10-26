import { MessageSquareText, Ruler, Hammer, BadgeCheck } from "lucide-react";

const steps = [
  { icon: MessageSquareText, title: "Enquiry", desc: "Tell us about your space and what you need." },
  { icon: Ruler, title: "Site Visit & Measurement", desc: "We measure on site and suggest the right system." },
  { icon: Hammer, title: "Fabrication", desc: "Your windows, doors and glass are made to size." },
  { icon: BadgeCheck, title: "Installation", desc: "Neat fitting and a final check before handover." },
];

export default function ProcessSteps() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            From enquiry to <span className="text-gold">installation</span>
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-navy-900/25 to-transparent lg:block" />
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative rounded-2xl bg-white p-6 text-center shadow-lg shadow-navy-900/5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              <span className="relative mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-white shadow-lg shadow-navy-900/25 transition-transform duration-300 group-hover:scale-105">
                <Icon size={26} strokeWidth={1.75} />
                <span className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-extrabold text-navy-950">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
