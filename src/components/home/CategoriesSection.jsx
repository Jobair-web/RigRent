"use client";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function CategoriesSection() {
  const { data: counts } = useAsync(() => equipmentService.categoryCounts(), []);
  return (
    <section className="section-y bg-tint/60">
      <div className="container-x">
        <SectionHeading eyebrow="Categories" title="Browse by category" subtitle="Find the right tool for any job." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <Link href={`/equipment?category=${encodeURIComponent(c.name)}`}
                className="group card-surface flex h-full flex-col items-center gap-3 p-6 text-center transition hover:border-primary hover:bg-primary hover:text-primary-fg">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-white/20 group-hover:text-inherit"><c.icon className="h-7 w-7" /></span>
                <span className="font-semibold">{c.short}</span>
                <span className="text-xs text-muted transition group-hover:text-inherit">{counts?.[c.name] ?? 0} items</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
