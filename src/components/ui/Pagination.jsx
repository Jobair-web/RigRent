import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const btn = "flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-2 text-sm font-medium hover:bg-tint disabled:opacity-40";
  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onChange(p)} aria-current={p === page ? "page" : undefined}
          className={cn(btn, p === page && "border-primary bg-primary text-primary-fg hover:bg-primary")}>{p}</button>
      ))}
      <button className={btn} disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
    </nav>
  );
}
