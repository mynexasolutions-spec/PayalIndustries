import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { business, mapsHref, primaryPhone, telHref, waHref } from "@/lib/business";

const cardClass =
  "group relative flex flex-col rounded-2xl bg-white p-6 shadow-xl shadow-navy-900/10 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy-900/15";

const iconClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg";

function CardFooter({ href, children, external = false, tone = "text-navy-900" }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold transition-all ${tone}`}
    >
      {children}
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface transition-colors group-hover:bg-navy-900 group-hover:text-white">
        <ArrowUpRight size={16} />
      </span>
    </a>
  );
}

export default function ContactCards() {
  return (
    <section className="relative z-10 -mt-20 sm:-mt-24">
      <div className="container-px mx-auto max-w-7xl grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className={cardClass}>
          <span className={`${iconClass} bg-gradient-to-br from-navy-900 to-navy-700 shadow-navy-900/25`}>
            <Phone size={20} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-ink">Call Us</h3>
          <ul className="mt-3 flex-1 space-y-3">
            {business.contacts.map((c) => (
              <li key={c.phone}>
                <a
                  href={telHref(c.phone)}
                  className="block leading-tight transition-colors hover:text-navy-900"
                >
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gold">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block font-semibold text-ink">+91 {c.phone}</span>
                </a>
              </li>
            ))}
          </ul>
          <CardFooter href={telHref(primaryPhone)}>Call now</CardFooter>
        </div>

        <div className={cardClass}>
          <span className={`${iconClass} bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-600/25`}>
            <FaWhatsapp size={22} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-ink">WhatsApp</h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">
            Share photos or measurements and get a quick reply.
          </p>
          <CardFooter href={waHref(primaryPhone)} external tone="text-emerald-600">
            Chat now
          </CardFooter>
        </div>

        <div className={cardClass}>
          <span className={`${iconClass} bg-gradient-to-br from-navy-900 to-navy-700 shadow-navy-900/25`}>
            <Mail size={20} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-ink">Email</h3>
          <p className="mt-3 flex-1 break-all leading-relaxed text-muted">{business.email}</p>
          <CardFooter href={`mailto:${business.email}`}>Send an email</CardFooter>
        </div>

        <div className={cardClass}>
          <span className={`${iconClass} bg-gradient-to-br from-navy-900 to-navy-700 shadow-navy-900/25`}>
            <MapPin size={20} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-ink">Visit Us</h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{business.address}</p>
          <CardFooter href={mapsHref} external>
            Get directions
          </CardFooter>
        </div>
      </div>
    </section>
  );
}
