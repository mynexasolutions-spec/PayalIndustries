"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  House,
  Images,
  Info,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  X,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { business, primaryPhone, telHref, waHref } from "@/lib/business";

const links = [
  { label: "Home", href: "/", icon: House },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Products", href: "/products", icon: Package },
  { label: "Applications", href: "/applications", icon: Building2 },
  { label: "Projects", href: "/projects", icon: Images },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-border bg-white/90 shadow-lg shadow-navy-900/8"
            : "border-transparent bg-white/95"
        }`}
      >
        <div
          className={`container-px mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? "py-1" : "py-1.5"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center" aria-label="Payal Industries Hubli - Home">
            <Image
              src="/navbar-logo.png"
              alt="Payal Industries Hubli"
              width={2172}
              height={724}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-14" : "h-16 sm:h-[4.5rem]"}`}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-navy-900 text-white shadow-md shadow-navy-900/20"
                      : "text-ink/75 hover:bg-surface hover:text-navy-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/25 transition-colors hover:bg-navy-800"
            >
              Get a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-navy-900 ring-1 ring-border transition-colors hover:bg-navy-900 hover:text-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white shadow-2xl shadow-navy-950/40 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Home">
            <Image
              src="/navbar-logo.png"
              alt="Payal Industries Hubli"
              width={2172}
              height={724}
              className="h-12 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-navy-900 ring-1 ring-border transition-colors hover:bg-navy-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1.5">
            {links.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-navy-900 text-white shadow-md shadow-navy-900/20"
                        : "text-ink/80 hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                        isActive ? "bg-white/15 text-white" : "bg-surface text-navy-900 ring-1 ring-border"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex-1">{label}</span>
                    <ChevronRight size={18} className={isActive ? "text-white/70" : "text-muted"} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-navy-900/25"
          >
            Get a Free Quote
            <ArrowRight size={16} />
          </Link>
        </nav>

        <div className="border-t border-border bg-surface px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={telHref(primaryPhone)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-border"
            >
              <Phone size={16} />
              Call Us
            </a>
            <a
              href={waHref(primaryPhone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </a>
          </div>

          <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-navy-900" />
              {business.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-navy-900" />
              <a href={`mailto:${business.email}`} className="break-all">
                {business.email}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-2">
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 ring-1 ring-border transition-colors hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 ring-1 ring-border transition-colors hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram size={15} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
