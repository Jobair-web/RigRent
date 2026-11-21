"use client";
import { useState } from "react";
import { bookingService } from "@/services/bookingService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import PageHeader from "../shared/PageHeader";

export const rentalColumns = {
  equipment: { key: "equipment", header: "Equipment", render: (b) => <span className="font-semibold">{b.equipmentName}</span> },
  start: { key: "start", header: "Start date", render: (b) => formatDate(b.startDate) },
  end: { key: "end", header: "End date", render: (b) => formatDate(b.endDate) },
  booked: { key: "booked", header: "Booking date", render: (b) => formatDate(b.createdAt) },
  qty: { key: "qty", header: "Qty", render: (b) => b.quantity },
  total: { key: "total", header: "Total", render: (b) => formatCurrency(b.totalAmount) },
  payment: { key: "payment", header: "Payment", render: (b) => <StatusBadge status={b.paymentStatus} /> },
  status: { key: "status", header: "Booking status", render: (b) => <StatusBadge status={b.bookingStatus} /> },
};

export default function MyRentals() {
  const [page, setPage] = useState(1);
  const { data, loading } = useAsync(() => bookingService.mine({ page }), [page]);
  const c = rentalColumns;
  return (
    <>
      <PageHeader title="My rentals" description="Your booking history and payment status." action={<Button href="/equipment" variant="accent">Browse equipment</Button>} />
      <DataTable columns={[c.equipment, c.start, c.end, c.booked, c.qty, c.total, c.payment, c.status]} rows={data?.items} loading={loading}
        page={page} pages={data?.pages || 1} onPageChange={setPage}
        empty={<EmptyState title="No rentals yet" description="Find equipment and make your first booking." action={<Button href="/equipment">Browse equipment</Button>} />} />
    </>
  );
}
