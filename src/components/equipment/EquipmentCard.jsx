"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { formatCurrency, rentalUnit, capitalize } from "@/lib/utils";
import EquipmentImage from "./EquipmentImage";
import AvailabilityBadge from "./AvailabilityBadge";

export default function EquipmentCard({ item }) {
  const { data: session } = authClient.useSession();
  const details = `/equipment/${item._id}`;
  const href = session ? details : `/login?redirect=${encodeURIComponent(details)}`;

  return (
    <article className="group card-surface flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary">
      <div className="relative">
        <EquipmentImage src={item.imageUrl} alt={item.name} category={item.category} className="aspect-[4/3]" />
        <AvailabilityBadge quantity={item.quantity} className="absolute left-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold text-primary">{item.category}</p>
        <h3 className="line-clamp-1 text-lg font-bold">{item.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted"><MapPin className="h-3.5 w-3.5" />{item.location}<span className="mx-1">•</span>{capitalize(item.rentalType)} rental</p>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          <p><span className="font-heading text-2xl font-extrabold">{formatCurrency(item.price)}</span><span className="text-sm text-muted">/{rentalUnit(item.rentalType)}</span></p>
          <Link href={href} onClick={() => !session && toast.info("Please log in to view details")}
            className="inline-flex h-9 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:opacity-90">View Details</Link>
        </div>
      </div>
    </article>
  );
}
