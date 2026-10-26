import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import { business, primaryPhone, telHref, waHref } from "@/lib/business";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.address
)}`;

export default function TopBar() {
  return (
    <div className="hidden bg-navy-950 text-sm text-white/80 lg:block">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-2.5">
        <div className="flex items-center gap-6">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <MapPin size={15} className="text-gold" />
            {business.address}
          </a>
          <span className="h-4 w-px bg-white/15" />
          <a
            href={`mailto:${business.email}`}
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail size={15} className="text-gold" />
            {business.email}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={telHref(primaryPhone)}
            className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-gold"
          >
            <Phone size={15} className="text-gold" />
            {primaryPhone}
          </a>
          <span className="h-4 w-px bg-white/15" />
          <a
            href={waHref(primaryPhone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white transition-colors hover:bg-emerald-600"
          >
            <FaWhatsapp size={14} />
            WhatsApp
          </a>
          <a
            href={business.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-blue-600"
          >
            <FaFacebookF size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
