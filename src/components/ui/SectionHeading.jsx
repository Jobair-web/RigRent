import { cn } from "@/lib/utils";

/** The ONE heading used by every section, so size/weight/spacing never drift. */
export default function SectionHeading({ eyebrow, title, subtitle, align = "left", className }) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-2 text-sm font-semibold text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-7 text-muted">{subtitle}</p>}
    </div>
  );
}
