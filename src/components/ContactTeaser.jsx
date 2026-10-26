"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { business, telHref, waHref } from "@/lib/business";

const projectTypes = ["UPVC Window", "Aluminium Window", "Profile Door", "Office Partition", "Glass Work", "Other"];

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-navy-900 focus:bg-white focus:ring-4 focus:ring-navy-900/10";

export default function ContactTeaser() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `Hello Payal Industries, please call me back.\n\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nLooking for: ${d.get("type")}`;
    window.open(
      `${waHref(business.contacts[0].phone)}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-surface">
      <Image
        src="/work-aluminium-window/03.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-surface/80" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-900/5 blur-3xl" />

      <div className="relative container-px mx-auto max-w-7xl grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 section-eyebrow">
            <span className="h-0.5 w-9 rounded-full bg-gold" />
            Get In Touch
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
            Ready to build your <span className="text-gold">dream view?</span>
          </h2>
          <p className="mt-5 max-w-lg text-muted">
            Call us, message on WhatsApp or request a call back. We&apos;ll
            help you pick the right UPVC, aluminium or glass system.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {business.contacts.map((c) => (
              <a
                key={c.phone}
                href={telHref(c.phone)}
                className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-lg shadow-navy-900/5 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:ring-navy-900/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white transition-transform group-hover:scale-105">
                  <Phone size={18} />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    {c.name}
                  </span>
                  <span className="text-base font-bold text-ink">{c.phone}</span>
                </span>
              </a>
            ))}
            <a
              href={waHref(business.contacts[0].phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-emerald-500 px-4 py-3.5 shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600">
                <FaWhatsapp size={20} />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/85">
                  WhatsApp
                </span>
                <span className="text-base font-bold text-white">Chat now</span>
              </span>
            </a>
          </div>

          <ul className="mt-7 space-y-3 text-sm text-ink/75">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-navy-900 ring-1 ring-border">
                <Mail size={16} />
              </span>
              <a href={`mailto:${business.email}`} className="hover:text-navy-900">
                {business.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-navy-900 ring-1 ring-border">
                <MapPin size={16} />
              </span>
              {business.address}
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-2xl shadow-navy-900/10 ring-1 ring-border sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white shadow-md shadow-navy-900/25">
            <PhoneCall size={21} />
          </span>
          <h3 className="mt-5 text-2xl font-extrabold text-ink">Request a call back</h3>
          <p className="mt-1.5 text-sm text-muted">Share your number and we&apos;ll call you.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            <input name="name" required placeholder="Your name" className={fieldClass} />
            <input name="phone" type="tel" required placeholder="Phone number" className={fieldClass} />
            <select name="type" required defaultValue="" className={`${fieldClass} appearance-none`}>
              <option value="" disabled>
                What do you need?
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-navy-900/30 transition-colors hover:bg-navy-800"
            >
              {sent ? "Sent! Request again" : "Request Call Back"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-all hover:gap-2.5"
          >
            Need a detailed quote? Open full contact page <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
