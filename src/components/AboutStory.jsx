import Image from "next/image";
import { MapPin, Hammer, ShieldCheck, Handshake } from "lucide-react";

const highlights = [
  { icon: MapPin, label: "Based in Hubballi" },
  { icon: Hammer, label: "Custom fabrication" },
  { icon: ShieldCheck, label: "Quality materials" },
  { icon: Handshake, label: "Serving all Karnataka" },
];

export default function AboutStory() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold/50" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/20">
            <Image
              src="/work-glazing/01.jpg"
              alt="Glass facade glazing work"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-right-8 sm:w-56">
            <div className="relative aspect-square">
              <Image
                src="/work-aluminium-window/08.jpg"
                alt="Aluminium sliding door"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="section-eyebrow">Our Story</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-ink">
            Crafting windows &amp; glass that <span className="text-gold">frame your view</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Payal Industries is a UPVC and aluminium fabrication company based
            in Gamangatti, Hubballi. We specialise in UPVC windows, aluminium
            windows, profile doors and all types of glass work for homes,
            offices and commercial buildings.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Every window and door is measured, cut and fitted to your space
            with skilled craftsmanship and quality profiles &mdash; so it
            looks sharp, runs smooth and lasts for years. We take projects
            across Karnataka.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-ink"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-gold">
                  <Icon size={17} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
