import { cn } from "@/lib/utils";

export const Skeleton = ({ className }) => <div className={cn("animate-pulse rounded-lg bg-border", className)} />;

/** Mirrors EquipmentCard dimensions to avoid layout shift. */
export const CardSkeleton = () => (
  <div className="card-surface flex h-full flex-col overflow-hidden">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="space-y-3 p-5">
      <Skeleton className="h-3 w-1/3" /><Skeleton className="h-5 w-3/4" /><Skeleton className="h-3 w-1/2" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  </div>
);

export const GridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
  </div>
);
