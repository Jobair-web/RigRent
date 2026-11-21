"use client";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import SectionHeading from "@/components/ui/SectionHeading";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";

export default function RecentlyAdded() {
  const { data, loading } = useAsync(() => equipmentService.list({ sort: "recent", limit: 3 }), []);
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="New" title="Recently added" subtitle="Fresh listings from our trusted owners." />
        <EquipmentGrid items={data?.items} loading={loading} count={3} animate />
      </div>
    </section>
  );
}
