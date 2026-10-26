import { MapPin, Layers, Route, ShieldCheck } from "lucide-react";
import { business } from "@/lib/business";

const facts = [
  { icon: MapPin, label: "Based in", value: "Hubballi", note: "Gamangatti workshop" },
  { icon: Layers, label: "Specialities", value: "UPVC · Aluminium · Glass", note: "Windows, doors, partitions" },
  { icon: Route, label: "Service area", value: "All Karnataka", note: "Projects across the state" },
  { icon: ShieldCheck, label: "GST registered", value: "GSTIN", note: business.gstin },
];

export default function AboutFacts() {
  return (
    <section className="relative z-10 -mt-14 sm:-mt-16">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/15 ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, label, value, note }, i) => (
            <div
              key={label}
              className={`group flex items-center gap-4 px-6 py-6 transition-colors hover:bg-surface ${
                i > 0 ? "border-t border-border sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${
                i >= 2 ? "sm:border-t sm:border-border lg:border-t-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-border" : ""}`}
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-navy-900 shadow-md shadow-navy-900/10 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                <Icon size={21} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
                <p className="mt-1 text-base font-bold text-ink">{value}</p>
                <p className="mt-0.5 break-all text-sm text-muted">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
