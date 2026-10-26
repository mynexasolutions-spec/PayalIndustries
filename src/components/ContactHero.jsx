import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30" />

      <div className="relative container-px mx-auto max-w-7xl pt-16 pb-32 sm:pt-20 sm:pb-36">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={13} />
          <span className="text-gold">Contact</span>
        </nav>

        <p className="mt-6 text-xs font-semibold tracking-[0.25em] uppercase text-gold">
          Get In Touch
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white max-w-2xl">
          Let&apos;s Make Your <span className="text-gold">View Wider</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl">
          Tell us about your UPVC, aluminium or glass project. Our team will
          get back to you with expert advice and a free quote.
        </p>
      </div>
    </section>
  );
}
