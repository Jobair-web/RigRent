"use client";
import { Boxes, CircleDollarSign, ClipboardCheck, ClipboardList, Hourglass, PackageCheck, Users, Wallet } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import StatCard from "./StatCard";
import PageHeader from "./PageHeader";
import { MonthlyBarChart, StatusDonut } from "./Charts";

export default function AnalyticsOverview({ variant }) {
  const admin = variant === "admin";
  const { data, loading, error } = useAsync(() => (admin ? analyticsService.admin() : analyticsService.owner()), [admin]);

  if (loading) return <div className="space-y-4"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-24" />)}</div><Skeleton className="h-80" /></div>;
  if (error || !data) return <EmptyState title="Could not load analytics" description={error} />;

  const cards = admin
    ? [[Users, "Total users", data.totalUsers], [Boxes, "Total equipment", data.totalEquipment], [ClipboardList, "Total bookings", data.totalBookings],
       [Hourglass, "Pending approvals", data.pendingApprovals, "text-amber-500"], [ClipboardCheck, "Completed rentals", data.completedRentals, "text-success"],
       [CircleDollarSign, "Total revenue", formatCurrency(data.totalRevenue), "text-success"]]
    : [[PackageCheck, "Total listed equipment", data.totalEquipment], [ClipboardList, "Total bookings", data.totalBookings],
       [ClipboardCheck, "Completed rentals", data.completedRentals, "text-success"], [Wallet, "Total earnings", formatCurrency(data.totalEarnings), "text-success"]];

  return (
    <>
      <PageHeader title="Analytics" description={admin ? "Platform-wide performance." : "How your equipment is performing."} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([icon, label, value, tone]) => <StatCard key={label} icon={icon} label={label} value={value} tone={tone} />)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <MonthlyBarChart title={admin ? "Monthly bookings" : "Monthly earnings"} data={admin ? data.monthlyBookings : data.monthlyEarnings} prefix={admin ? "" : "$"} />
          {admin && <MonthlyBarChart title="Monthly revenue" data={data.monthlyRevenue} prefix="$" />}
          {!admin && <MonthlyBarChart title="Monthly bookings" data={data.monthlyBookings} />}
        </div>
        <StatusDonut data={data.statusBreakdown} />
      </div>
    </>
  );
}
