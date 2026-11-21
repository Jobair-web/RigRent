import EquipmentForm from "@/components/equipment/EquipmentForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader title="Add equipment" description="New listings are reviewed by an admin before going live." />
      <EquipmentForm backTo="/dashboard/owner/my-equipment" />
    </>
  );
}
