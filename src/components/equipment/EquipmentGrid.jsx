import { PackageSearch } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { GridSkeleton } from "@/components/ui/Skeleton";
import Reveal from "@/components/ui/Reveal";
import EquipmentCard from "./EquipmentCard";

/** Always a 3-column grid on desktop (2 tablet, 1 mobile). */
export default function EquipmentGrid({ items, loading, count = 6, animate, emptyAction }) {
  if (loading) return <GridSkeleton count={count} />;
  if (!items?.length)
    return <EmptyState icon={PackageSearch} title="No equipment found" description="Try different filters or check back later." action={emptyAction} />;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => animate
        ? <Reveal key={item._id} delay={(i % 3) * 0.08} className="h-full"><EquipmentCard item={item} /></Reveal>
        : <EquipmentCard key={item._id} item={item} />)}
    </div>
  );
}
