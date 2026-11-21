"use client";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";

export default function FeaturedEquipment() {
  const { data, loading } = useAsync(() => equipmentService.featured(6), []);
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="Featured" title="Featured equipment" subtitle="Six approved rigs ready to rent this week." />
        <EquipmentGrid items={data} loading={loading} count={6} animate />
        <div className="mt-10 text-center"><Button href="/equipment" variant="outline">View all equipment</Button></div>
      </div>
    </section>
  );
}
