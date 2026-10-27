"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Layers,
  MessageSquare,
  Send,
  ShieldCheck,
  Zap,
  BadgeCheck,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { business, mapEmbedSrc, mapsHref, waHref } from "@/lib/business";

const projectTypes = [
  { value: "UPVC Window", label: "UPVC Window" },
  { value: "Aluminium Window", label: "Aluminium Window" },
  { value: "Profile Door", label: "Profile Door" },
  { value: "Office Partition", label: "Office Partition" },
  { value: "Glass Work", label: "Glass Work" },
  { value: "Other", label: "Other" },
];

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-navy-900 focus:bg-white focus:ring-4 focus:ring-navy-900/10";

function Field({ label, icon: Icon, className = "", children }) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-semibold text-ink ${className}`}>
      {label}
      <span className="relative block">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-3.5 text-navy-700/60"
        />
        {children}
      </span>
    </label>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "Hello Payal Industries, I'd like to make an enquiry.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Project: ${data.get("type")}`,
      data.get("message") ? `Message: ${data.get("message")}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.open(
      `${waHref(business.contacts[0].phone)}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-white py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-2xl shadow-navy-900/10 ring-1 ring-border">

          <p className="section-eyebrow">Send an Enquiry</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
            Get your <span className="text-gold">free quote</span>
          </h2>
          <p className="mt-3 text-sm text-muted max-w-md">
            Fill in the details below and your enquiry will open in WhatsApp,
            ready to send to our team.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" icon={User}>
              <input
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </Field>
            <Field label="Phone Number" icon={Phone}>
              <input
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className={inputClass}
              />
            </Field>
            <Field label="Email Address" icon={Mail}>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
            <Field label="Project Type" icon={Layers}>
              <select
                name="type"
                required
                defaultValue=""
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {projectTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message (Optional)" icon={MessageSquare} className="sm:col-span-2">
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your project, size, location..."
                className={`${inputClass} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="sm:col-span-2 group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-navy-900 to-navy-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-navy-900/30 transition-all hover:shadow-xl hover:shadow-navy-900/40 hover:brightness-110 active:scale-[0.99]"
            >
              {sent ? "Sent! Send another enquiry" : "Send Enquiry via WhatsApp"}
              <Send
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </button>
          </form>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted">
            <li className="flex items-center gap-2">
              <Zap size={15} className="text-gold" /> Quick response
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-gold" /> No obligation quote
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-gold" /> Serving all Karnataka
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/10 ring-1 ring-border">
            <iframe
              title="Payal Industries location"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 lg:h-80"
            />
            <div className="bg-white p-5">
              <p className="text-sm font-bold text-ink">Our Workshop</p>
              <p className="mt-1 text-sm text-muted">{business.address}</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 p-7 text-white shadow-2xl shadow-navy-900/30">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              Payal Industries
            </p>
            <p className="mt-3 text-lg font-bold leading-snug">
              UPVC Windows, Aluminium Windows, Profile Doors &amp; All Glass Work
            </p>
            <p className="mt-4 text-xs text-white/60">GSTIN: {business.gstin}</p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={waHref(business.contacts[0].phone)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-emerald-500"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-blue-600"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-pink-600"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
