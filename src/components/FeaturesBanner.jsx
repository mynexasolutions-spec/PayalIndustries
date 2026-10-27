import Image from "next/image";
import { SlidersVertical, Shrink, LayoutGrid, Grid3x3 } from "lucide-react";
import VideoBg from "@/components/VideoBg";

const features = [
  {
    icon: SlidersVertical,
    title: "Smooth Sliding",
    desc: "Effortless operation with refined performance.",
  },
  {
    icon: Shrink,
    title: "Slim Sightlines",
    desc: "Maximizes natural light and expansive views.",
  },
  {
    icon: LayoutGrid,
    title: "Multiple Configurations",
    desc: "Flexible options for diverse spaces.",
  },
  {
    icon: Grid3x3,
    title: "Mosquito Mesh Options",
    desc: "Integrated mesh solutions for added comfort.",
  },
];

export default function FeaturesBanner() {
  return (
    <section className="bg-surface-dark">
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[400px]">
          <Image
            src="/features.png"
            alt="Close-up of a black aluminium window frame"
            fill
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="object-cover"
          />
          <VideoBg src="/videos/features.mp4" />
        </div>

        <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-16 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Features
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-[1.15] text-ink">
            Engineered for
            <br />
            Modern Possibilities
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Our aluminium systems are designed to offer the perfect balance of
            aesthetics, functionality and long-term performance.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3.5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-navy-900 shadow-sm">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-ink">{title}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
