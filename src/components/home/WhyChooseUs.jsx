import { BadgeDollarSign, CalendarClock, Lock, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const ITEMS = [
  { icon: BadgeDollarSign, title: "Affordable prices", text: "Daily, weekly and monthly rates with no hidden fees." },
  { icon: ShieldCheck, title: "Verified owners", text: "Every owner and listing is reviewed by our team." },
  { icon: CalendarClock, title: "Flexible periods", text: "Rent for a day or a season and pay only for what you use." },
  { icon: Lock, title: "Secure payments", text: "Stripe-powered checkout with instant confirmation." },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="About us" title="Why choose RigRent" subtitle="Everything you need to rent with confidence." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07} className="h-full">
              <div className="card-surface h-full p-6">
                <it.icon className="h-7 w-7 text-primary" />
                <h3 className="mb-1 mt-3 text-lg font-bold">{it.title}</h3>
                <p className="text-sm text-muted">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
