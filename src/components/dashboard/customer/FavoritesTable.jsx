"use client";
import { toast } from "react-toastify";
import { favoriteService } from "@/services/favoriteService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, getErrorMessage, rentalUnit } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import AvailabilityBadge from "@/components/equipment/AvailabilityBadge";
import PageHeader from "../shared/PageHeader";
import { Heart } from "lucide-react";

export default function FavoritesTable() {
  const { data, loading, setData } = useAsync(() => favoriteService.list(), []);

  const remove = async (id) => {
    try {
      await favoriteService.remove(id);
      setData((list) => list.filter((e) => e._id !== id));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const columns = [
    { key: "name", header: "Equipment", render: (e) => <span className="font-semibold">{e.name}</span> },
    { key: "category", header: "Category", render: (e) => e.category },
    { key: "price", header: "Price", render: (e) => `${formatCurrency(e.price)}/${rentalUnit(e.rentalType)}` },
    { key: "avail", header: "Availability", render: (e) => <AvailabilityBadge quantity={e.quantity} /> },
    { key: "actions", header: "Actions", render: (e) => (
      <div className="flex gap-2">
        <Button href={`/equipment/${e._id}`} size="sm">View Details</Button>
        <Button size="sm" variant="danger" onClick={() => remove(e._id)}>Remove</Button>
      </div>) },
  ];
  return (
    <>
      <PageHeader title="Favorites" description="Equipment you saved for later." />
      <DataTable columns={columns} rows={data || []} loading={loading} pageSize={8}
        empty={<EmptyState icon={Heart} title="No favorites yet" description="Tap the heart on any equipment page to save it." action={<Button href="/equipment">Browse equipment</Button>} />} />
    </>
  );
}
