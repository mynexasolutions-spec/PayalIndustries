import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { business, primaryPhone, telHref } from "@/lib/business";

export default function CtaBanner() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-12 text-center shadow-2xl shadow-navy-900/30 sm:px-14 sm:py-16">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Planning a project? <span className="text-gold">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Get a free quote on UPVC, aluminium and glass work from the
              {" "}{business.name} team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-950 transition hover:brightness-110"
              >
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href={telHref(primaryPhone)}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone size={16} /> {primaryPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
