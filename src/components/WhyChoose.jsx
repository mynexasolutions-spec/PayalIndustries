import Link from "next/link";
import { ListChecks, Gem, Wrench, LifeBuoy, ArrowRight, Phone } from "lucide-react";
import { primaryPhone, telHref } from "@/lib/business";

const reasons = [
  {
    icon: ListChecks,
    title: "Tailored System Selection",
    desc: "Solutions for your unique project requirements.",
  },
  {
    icon: Gem,
    title: "Quality-Focused Materials",
    desc: "Premium aluminium systems with attention to detail.",
  },
  {
    icon: Wrench,
    title: "Technical Guidance",
    desc: "Expert support for architects, builders and homeowners.",
  },
  {
    icon: LifeBuoy,
    title: "Support from Selection to Installation",
    desc: "Assistance throughout your project journey.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-navy-900/5 blur-3xl" />

      <div className="relative container-px mx-auto max-w-7xl grid items-center gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Why Choose Payal Industries
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] text-ink sm:text-4xl lg:text-[2.6rem]">
            A Partner for Better <span className="text-gold">Living Spaces</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            From the first measurement to the final fitting, our team stays
            with you so every window, door and glass panel is right.
          </p>

          <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-navy-900 px-4 py-3 text-[13px] font-semibold text-white shadow-lg sm:gap-2 sm:px-6 sm:text-sm shadow-navy-900/25 transition-colors hover:bg-navy-800"
            >
              Talk to Our Team
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={telHref(primaryPhone)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border bg-white px-3 py-3 text-[13px] font-semibold text-navy-900 sm:gap-2 sm:px-5 sm:text-sm shadow-md shadow-navy-900/5 transition-colors hover:border-navy-900"
            >
              <Phone size={15} />
              {primaryPhone}
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-navy-900/5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 hover:ring-navy-900/30"
            >
              <span className="absolute right-5 top-3 text-5xl font-extrabold text-navy-900/5 transition-colors group-hover:text-navy-900/10">
                0{i + 1}
              </span>
              <span className="inline-flex h-13 w-13 items-center justify-center rounded-xl bg-navy-900 text-white shadow-md shadow-navy-900/25 transition-transform duration-300 group-hover:scale-105">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy-900 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
