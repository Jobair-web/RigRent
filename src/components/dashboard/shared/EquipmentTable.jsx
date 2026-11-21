"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, formatDate, getErrorMessage, rentalUnit } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import PageHeader from "./PageHeader";

/** admin=false: owner's own equipment. admin=true: every listing with approve / reject controls. */
export default function EquipmentTable({ admin = false }) {
  const { data, loading, setData } = useAsync(() => (admin ? equipmentService.adminAll() : equipmentService.mine()), [admin]);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const base = admin ? "/dashboard/admin/equipment" : "/dashboard/owner";

  const setStatus = async (id, status) => {
    try {
      await equipmentService.setStatus(id, status);
      setData((l) => l.map((e) => (e._id === id ? { ...e, status } : e)));
      toast.success(`Equipment ${status}`);
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await equipmentService.remove(toDelete._id);
      setData((l) => l.filter((e) => e._id !== toDelete._id));
      toast.success("Equipment deleted");
      setToDelete(null);
    } catch (err) { toast.error(getErrorMessage(err)); } finally { setBusy(false); }
  };

  const columns = [
    { key: "name", header: "Equipment", render: (e) => <div><p className="font-semibold">{e.name}</p><p className="text-xs text-muted">{e.brand} {e.model}</p></div> },
    admin && { key: "owner", header: "Owner", render: (e) => <div><p>{e.ownerName}</p><p className="text-xs text-muted">{e.ownerEmail}</p></div> },
    { key: "category", header: "Category", render: (e) => e.category },
    { key: "price", header: "Price", render: (e) => `${formatCurrency(e.price)}/${rentalUnit(e.rentalType)}` },
    { key: "qty", header: "Available qty", render: (e) => e.quantity },
    { key: "status", header: "Status", render: (e) => <StatusBadge status={e.status} /> },
    { key: "added", header: "Added", render: (e) => formatDate(e.createdAt) },
    { key: "actions", header: "Actions", render: (e) => (
      <div className="flex flex-wrap gap-2">
        {admin && e.status !== "approved" && <Button size="sm" variant="success" onClick={() => setStatus(e._id, "approved")}>Approve</Button>}
        {admin && e.status !== "rejected" && <Button size="sm" variant="danger" onClick={() => setStatus(e._id, "rejected")}>Reject</Button>}
        <Button size="sm" variant="outline" href={`/equipment/${e._id}`}>View</Button>
        <Button size="sm" variant="outline" href={admin ? `${base}/${e._id}/edit` : `${base}/edit/${e._id}`}>Update</Button>
        <Button size="sm" variant="danger" onClick={() => setToDelete(e)}>Delete</Button>
      </div>) },
  ].filter(Boolean);

  return (
    <>
      <PageHeader title={admin ? "All equipment" : "My equipment"} description={admin ? "Review, approve and manage every listing." : "Manage the equipment you list for rent."}
        action={!admin && <Button href="/dashboard/owner/add-equipment" variant="accent">Add equipment</Button>} />
      <DataTable columns={columns} rows={data || []} loading={loading} pageSize={8}
        empty={<EmptyState title="No equipment yet" description={admin ? "Listings will appear here." : "Add your first item to start earning."} />} />
      <ConfirmDialog open={!!toDelete} danger loading={busy} title="Delete equipment" confirmLabel="Delete equipment"
        message={`“${toDelete?.name}” and its favorites will be permanently removed.`} onConfirm={remove} onClose={() => setToDelete(null)} />
    </>
  );
}
