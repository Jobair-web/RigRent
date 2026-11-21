"use client";
import { useParams } from "next/navigation";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import { Skeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import EquipmentForm from "@/components/equipment/EquipmentForm";
import PageHeader from "./PageHeader";

export default function EditEquipment({ backTo }) {
  const { id } = useParams();
  const { data, loading, error } = useAsync(() => equipmentService.getById(id), [id]);
  if (loading) return <Skeleton className="h-96" />;
  if (error || !data) return <EmptyState title="Equipment not found" description={error} />;
  return (
    <>
      <PageHeader title="Update equipment" description={data.name} />
      <EquipmentForm id={id} initial={data} backTo={backTo} />
    </>
  );
}
