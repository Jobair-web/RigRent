"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constants";
import { capitalize, formatCurrency, formatDate, rentalUnit } from "@/lib/utils";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import UserAvatar from "@/components/layout/UserAvatar";
import EquipmentImage from "./EquipmentImage";
import AvailabilityBadge from "./AvailabilityBadge";
import FavoriteButton from "./FavoriteButton";
import BookingModal from "./BookingModal";

export default function EquipmentDetails() {
  const { id } = useParams();
  const { user, role } = useAuth();
  const { data: item, loading, error } = useAsync(() => equipmentService.getById(id), [id]);
  const [booking, setBooking] = useState(false);

  if (loading)
    return (
      <div className="container-x grid gap-8 py-10 lg:grid-cols-3">
        <Skeleton className="aspect-[16/10] lg:col-span-2" /><Skeleton className="h-80" />
      </div>
    );
  if (error || !item)
    return <div className="container-x py-20"><EmptyState title="Equipment not found" description={error} action={<Button href="/equipment">Browse equipment</Button>} /></div>;

  const isCustomer = role === ROLES.CUSTOMER;
  const specs = [
    ["Category", item.category], ["Rental type", capitalize(item.rentalType)], ["Location", item.location],
    ["Available quantity", item.quantity], ["Brand", item.brand], ["Model", item.model], ["Condition", item.condition], ["Listed on", formatDate(item.createdAt)],
  ];

  return (
    <div className="container-x py-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted"><Link href="/equipment" className="hover:text-foreground">All equipment</Link> / {item.name}</nav>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <EquipmentImage src={item.imageUrl} alt={item.name} category={item.category} className="aspect-[16/10] rounded-2xl" priority />
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <AvailabilityBadge quantity={item.quantity} />
              <span className="flex items-center gap-1 text-sm text-muted"><MapPin className="h-4 w-4" />{item.location}</span>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">{item.name}</h1>
            <p className="mt-3 leading-7 text-muted">{item.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {specs.map(([k, v]) => (
              <div key={k} className="card-surface p-4"><p className="text-xs text-muted">{k}</p><p className="font-semibold">{v}</p></div>
            ))}
          </div>
          <div className="card-surface p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><ShieldCheck className="h-5 w-5 text-primary" />Rental terms and conditions</h2>
            <p className="leading-7 text-muted">{item.terms || "Standard RigRent terms apply: refundable deposit, 48-hour free cancellation, and renter responsibility for damage beyond normal wear."}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface space-y-5 p-6">
            <p><span className="font-heading text-4xl font-extrabold">{formatCurrency(item.price)}</span><span className="text-muted">/{rentalUnit(item.rentalType)}</span></p>
            {isCustomer ? (
              <div className="space-y-3">
                <Button variant="accent" size="lg" className="w-full" disabled={item.quantity < 1} onClick={() => setBooking(true)}>Book Now</Button>
                <FavoriteButton equipmentId={item._id} />
              </div>
            ) : (
              <p className="rounded-xl bg-tint p-3 text-sm text-muted">Booking is available for customer accounts.</p>
            )}
            <div className="flex items-center gap-3 border-t border-border pt-5">
              <UserAvatar user={{ name: item.ownerName, image: item.ownerPhoto }} className="h-11 w-11" />
              <div className="text-sm">
                <p className="font-semibold">{item.ownerName}</p>
                <p className="flex items-center gap-1 text-xs font-semibold text-success"><BadgeCheck className="h-3.5 w-3.5" />Verified owner</p>
                <p className="text-xs text-muted">{item.ownerEmail}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {booking && <BookingModal open={booking} onClose={() => setBooking(false)} equipment={item} user={user} />}
    </div>
  );
}
