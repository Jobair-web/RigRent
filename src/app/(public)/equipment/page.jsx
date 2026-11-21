import { Suspense } from "react";
import EquipmentExplorer from "@/components/equipment/EquipmentExplorer";
import { GridSkeleton } from "@/components/ui/Skeleton";

export const metadata = { title: "All Equipment" };

export default function EquipmentPage() {
  return (
    <div className="container-x py-12">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">All equipment</h1>
      <Suspense fallback={<GridSkeleton count={9} />}>
        <EquipmentExplorer />
      </Suspense>
    </div>
  );
}
