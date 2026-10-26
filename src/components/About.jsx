import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";

const chips = ["UPVC Windows", "Aluminium Windows", "Profile Doors", "Glass Work"];

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
        <Image
          src="/aboutmobilebg.png"
          alt="Modern white home with aluminium glass doors and infinity pool at sunset"
          fill
          sizes="100vw"
          className="object-cover object-bottom lg:hidden"
        />
        <Image
          src="/aboutpayal.png"
          alt="Modern white home with aluminium glass doors and infinity pool at sunset"
          fill
          sizes="60vw"
          className="hidden object-cover object-[65%_60%] lg:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 via-45% to-transparent to-70% lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:from-5% lg:via-white/70 lg:via-30% lg:to-transparent lg:to-60%" />

        <div className="absolute bottom-6 left-5 right-5 flex max-w-xs items-center gap-2.5 rounded-xl bg-white/85 px-4 py-3 shadow-xl shadow-navy-900/20 ring-1 ring-white/60 backdrop-blur-md sm:left-auto sm:right-5 lg:right-10 lg:bottom-8">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-gold">
            <MapPin size={17} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">Hubballi, Karnataka</p>
            <p className="text-xs text-muted">Serving all of Karnataka</p>
          </div>
        </div>
      </div>

      <div className="relative container-px mx-auto max-w-7xl pt-14 pb-[26rem] sm:pt-16 sm:pb-[30rem] lg:py-24">
        <div className="max-w-xl lg:max-w-[34rem]">
          <p className="flex items-center gap-3 section-eyebrow !text-navy-950">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            About Payal Industries
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] text-navy-950 sm:text-4xl">
            Designing Better Spaces
            <br />
            with <span className="text-gold">UPVC &amp; Aluminium</span>
            <br className="hidden sm:block" /> Systems
          </h2>
          <p className="mt-5 max-w-md font-medium leading-relaxed text-navy-950">
            Payal Industries is a trusted UPVC and aluminium fabrication
            company based in Hubli, specializing in windows, profile doors and
            all types of glass work for residential, commercial and
            architectural projects across Karnataka.
          </p>

          <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-3 gap-y-2.5 sm:gap-x-4">
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-navy-950 sm:gap-2 sm:text-sm">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-gold">
                  <Check size={12} strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800"
          >
            Learn More About Us
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
