import { FaWhatsapp } from "react-icons/fa6";
import { primaryPhone, waHref } from "@/lib/business";

const message =
  "Hello Payal Industries! 👋 I found your website and I'm interested in your UPVC / aluminium windows, doors and glass work. Could you please share more details and a free quote? Thank you!";

export default function WhatsAppFloat() {
  return (
    <a
      href={`${waHref(primaryPhone)}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-4 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink opacity-0 shadow-lg shadow-navy-950/15 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 motion-reduce:hidden" />
        <FaWhatsapp size={30} />
      </span>
    </a>
  );
}
