import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  ["Find equipment", "Search by name or location and filter by price, category and availability."],
  ["Book and pay", "Pick your dates and quantity, then pay securely with Stripe."],
  ["Pick up or get delivery", "Meet the owner or receive the equipment at your address."],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-y bg-tint/60">
      <div className="container-x">
        <SectionHeading eyebrow="Simple" title="How it works" subtitle="From search to pickup in three steps." />
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="h-full">
              <div className="card-surface h-full p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading font-extrabold text-navy">{i + 1}</span>
                <h3 className="mb-1 mt-4 text-lg font-bold">{t}</h3>
                <p className="text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
