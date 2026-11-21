import { cn, capitalize } from "@/lib/utils";

const styles = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  active: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  completed: "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
  unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
};

/** Dot + text, so status never relies on colour alone. */
export default function StatusBadge({ status }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[status] || styles.completed)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {capitalize(status)}
    </span>
  );
}
