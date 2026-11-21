import { cn } from "@/lib/utils";

export default function AvailabilityBadge({ quantity, className }) {
  const ok = quantity > 0;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
      ok ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {ok ? "Available" : "Unavailable"}
    </span>
  );
}
