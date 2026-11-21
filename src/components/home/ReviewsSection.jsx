import { BadgeCheck, Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import UserAvatar from "@/components/layout/UserAvatar";

export default function ReviewsSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="Reviews" title="Loved by renters and owners" subtitle="4.9 out of 5 from 1,200+ verified rentals." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07} className="h-full">
              <figure className="card-surface flex h-full flex-col p-6">
                <div className="flex gap-0.5" role="img" aria-label={`Rated ${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, s) => <Star key={s} className={s < r.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"} />)}
                </div>
                <blockquote className="my-4 flex-1 text-sm leading-6">“{r.text}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <UserAvatar user={{ name: r.name }} />
                  <div className="text-sm"><p className="font-semibold">{r.name}</p><p className="flex items-center gap-1 text-xs text-success"><BadgeCheck className="h-3.5 w-3.5" />Verified · {r.role}</p></div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
