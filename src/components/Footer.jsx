import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight, ArrowUp } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { business, telHref, waHref } from "@/lib/business";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "UPVC Windows", href: "/products" },
  { label: "Aluminium Windows", href: "/products" },
  { label: "Profile Doors", href: "/products" },
  { label: "Glass Partitions", href: "/products" },
  { label: "Glazing & Facades", href: "/products" },
];

const headingClass =
  "mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white";

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-white/70 transition-all hover:translate-x-1 hover:text-white"
    >
      <ChevronRight
        size={14}
        className="text-gold opacity-60 transition-opacity group-hover:opacity-100"
      />
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white/70">
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-navy-700/30 blur-3xl" />

      <div className="relative container-px mx-auto max-w-7xl grid gap-12 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.3fr] lg:gap-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-xl bg-white p-2 shadow-lg shadow-black/30">
              <Image
                src="/brand/logo-icon.png"
                alt="Payal Industries logo"
                width={500}
                height={411}
                className="h-11 w-auto"
              />
            </span>
            <span className="leading-none">
              <span className="block text-xl font-extrabold tracking-tight text-white">
                PAYAL <span className="text-gold">INDUSTRIES</span>
              </span>
              <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Hubli
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed">
            UPVC &amp; aluminium windows, profile doors and all glass work
            &mdash; built for modern living, serving all of Karnataka.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={waHref(business.contacts[0].phone)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              <FaWhatsapp size={19} />
            </a>
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
            >
              <FaFacebookF size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className={headingClass}>
            <span className="h-0.5 w-6 rounded-full bg-gold" />
            Quick Links
          </p>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={headingClass}>
            <span className="h-0.5 w-6 rounded-full bg-gold" />
            Our Products
          </p>
          <ul className="space-y-3">
            {productLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={headingClass}>
            <span className="h-0.5 w-6 rounded-full bg-gold" />
            Contact Us
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold">
                <MapPin size={17} />
              </span>
              <span className="leading-snug">{business.address}</span>
            </li>
            {business.contacts.map((c) => (
              <li key={c.phone}>
                <a
                  href={telHref(c.phone)}
                  className="group flex items-center gap-3 transition-colors hover:text-white"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-950">
                    <Phone size={16} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs uppercase tracking-wider text-white/45">
                      {c.name}
                    </span>
                    <span className="font-semibold text-white">{c.phone}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${business.email}`}
                className="group flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-950">
                  <Mail size={16} />
                </span>
                <span className="break-all">{business.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/55 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Payal Industries. All Rights Reserved.
            <span className="mx-2 hidden text-white/25 sm:inline">|</span>
            <span className="block sm:inline">GSTIN: {business.gstin}</span>
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-navy-950"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
