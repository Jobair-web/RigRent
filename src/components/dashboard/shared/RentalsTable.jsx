"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { bookingService } from "@/services/bookingService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, formatDate, getErrorMessage } from "@/lib/utils";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import PageHeader from "./PageHeader";

const STATUSES = ["confirmed", "active", "completed", "cancelled"];

/** variant: "owner" (rentals of my equipment) | "admin" (all rentals). */
export default function RentalsTable({ variant }) {
  const admin = variant === "admin";
  const [page, setPage] = useState(1);
  const { data, loading, refetch } = useAsync(() => (admin ? bookingService.all({ page }) : bookingService.owner({ page })), [page, admin]);

  const update = async (id, status) => {
    try {
      await bookingService.updateStatus(id, status);
      toast.success(`Booking marked ${status}`);
      refetch();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const columns = [
    { key: "customer", header: "Customer", render: (b) => <div><p className="font-semibold">{b.customerName}</p><p className="text-xs text-muted">{b.customerEmail}</p><p className="text-xs text-muted">{b.contactNumber}</p></div> },
    admin && { key: "owner", header: "Owner", render: (b) => <div><p>{b.ownerName}</p><p className="text-xs text-muted">{b.ownerEmail}</p></div> },
    { key: "equipment", header: "Equipment", render: (b) => b.equipmentName },
    { key: "duration", header: "Duration", render: (b) => `${formatDate(b.startDate)} - ${formatDate(b.endDate)}` },
    { key: "qty", header: "Qty", render: (b) => b.quantity },
    { key: "amount", header: "Amount", render: (b) => formatCurrency(b.totalAmount) },
    { key: "payment", header: "Payment", render: (b) => <StatusBadge status={b.paymentStatus} /> },
    { key: "status", header: "Booking status", render: (b) => (
      <div className="space-y-1.5">
        <StatusBadge status={b.bookingStatus} />
        {b.paymentStatus === "paid" && (
          <select aria-label="Update booking status" value="" onChange={(e) => e.target.value && update(b._id, e.target.value)} className="input-base !min-h-8 !py-1 text-xs">
            <option value="">Update…</option>
            {STATUSES.filter((s) => s !== b.bookingStatus).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>) },
  ].filter(Boolean);

  return (
    <>
      <PageHeader title={admin ? "All rentals" : "My equipment rentals"} description={admin ? "Monitor every rental across the platform." : "Bookings made on your equipment."} />
      <DataTable columns={columns} rows={data?.items} loading={loading} page={page} pages={data?.pages || 1} onPageChange={setPage}
        empty={<EmptyState title="No rentals yet" description="Bookings will show up here." />} />
    </>
  );
}
