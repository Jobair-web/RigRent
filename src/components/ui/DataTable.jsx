"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

/**
 * columns: [{ key, header, render?(row), className? }]
 * Server pagination: pass page/pages/onPageChange. Client pagination: pass pageSize.
 */
export default function DataTable({ columns, rows = [], loading, pageSize, page, pages, onPageChange, empty }) {
  const [local, setLocal] = useState(1);
  const server = !!onPageChange;
  const current = server ? page : local;
  const total = server ? pages : Math.max(1, Math.ceil(rows.length / (pageSize || rows.length || 1)));
  const visible = server || !pageSize ? rows : rows.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="sticky top-0 border-b border-border bg-tint/60 text-xs uppercase tracking-wide text-muted">
            <tr>{columns.map((c) => <th key={c.key} className={cn("whitespace-nowrap px-4 py-3 font-semibold", c.className)}>{c.header}</th>)}</tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {columns.map((c) => <td key={c.key} className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>)}
                  </tr>
                ))
              : visible.map((row, i) => (
                  <tr key={row._id || i} className="border-b border-border transition-colors last:border-0 hover:bg-tint/50">
                    {columns.map((c) => <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>{c.render ? c.render(row) : row[c.key]}</td>)}
                  </tr>
                ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && (empty || <EmptyState title="Nothing here yet" description="Records will appear here once available." />)}
      </div>
      <Pagination page={current} pages={total} onChange={server ? onPageChange : setLocal} />
    </div>
  );
}
