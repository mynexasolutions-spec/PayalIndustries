import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="relative h-[max(520px,calc(100svh_-_340px))] sm:h-[510px] lg:h-[595px] xl:h-[620px] w-full">
        <Image
          src="/mobilehero-hero.jpg"
          alt="Modern home with aluminium glass sliding doors overlooking an infinity pool at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom sm:hidden"
        />
        <Image
          src="/hero.png"
          alt="Modern home with aluminium glass sliding doors overlooking an infinity pool at sunset"
          fill
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/45 via-35% to-white/0 to-60% sm:bg-gradient-to-r sm:from-white/90 sm:via-white/50 sm:via-35% sm:to-transparent sm:to-60%" />

        <div className="relative z-10 h-full container-px mx-auto max-w-7xl flex items-start pt-9 sm:items-center sm:pt-0">
          <div className="max-w-xl">
            <span className="animate-fade-up mb-4 block h-1 w-14 rounded-full bg-gold" />
            <h1
              className="animate-fade-up text-[clamp(1.35rem,6.4vw,2rem)] sm:text-4xl lg:text-[2.6rem] font-medium leading-[1.2] tracking-tight text-navy-950 uppercase [text-shadow:0_0_16px_rgba(255,255,255,0.95)] sm:[text-shadow:none]"
              style={{ animationDelay: "80ms" }}
            >
              A <span className="font-extrabold">Window</span>
              <br />
              Reflects the Essence
              <br />
              of <span className="font-extrabold">Architecture</span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-[17rem] text-sm font-semibold leading-relaxed text-ink [text-shadow:0_0_12px_rgba(255,255,255,0.95)] sm:font-medium sm:text-ink/80 sm:[text-shadow:none]"
              style={{ animationDelay: "220ms" }}
            >
              Premium Aluminium Window &amp; Door Systems for Modern Living
            </p>

            <div
              className="animate-fade-up mt-7 flex flex-row flex-nowrap items-center gap-2.5 sm:gap-3"
              style={{ animationDelay: "360ms" }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-navy-900 text-white text-sm font-semibold px-4 py-3 shadow-lg shadow-navy-900/25 hover:bg-navy-800 transition-colors sm:gap-2 sm:px-6"
              >
                Our Products
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-white text-navy-900 text-sm font-semibold px-4 py-3 shadow-md shadow-navy-900/10 hover:bg-surface transition-colors sm:px-6"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
