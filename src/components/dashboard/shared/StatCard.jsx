import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, tone = "text-primary" }) {
  return (
    <div className="card-surface flex items-center gap-4 p-5">
      <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tint", tone)}><Icon className="h-6 w-6" /></span>
      <div className="min-w-0"><p className="truncate text-sm text-muted">{label}</p><p className="font-heading text-2xl font-extrabold tabular-nums">{value}</p></div>
    </div>
  );
}
