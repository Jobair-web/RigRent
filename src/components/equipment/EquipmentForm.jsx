"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { equipmentService } from "@/services/equipmentService";
import { CATEGORIES, CONDITIONS, RENTAL_TYPES } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/FormControls";
import ImageUploadField from "@/components/ui/ImageUploadField";

const empty = { name: "", description: "", category: CATEGORIES[0].name, location: "", price: "", rentalType: "daily", quantity: 1, condition: CONDITIONS[1], brand: "", model: "", imageUrl: "", terms: "" };

/** Shared by Add (owner) and Edit (owner/admin). */
export default function EquipmentForm({ initial, id, backTo }) {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({ ...empty, ...initial });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    ["name", "description", "location", "brand", "model"].forEach((k) => { if (!String(form[k]).trim()) err[k] = "Required"; });
    if (!(Number(form.price) > 0)) err.price = "Enter a price above 0";
    if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 0) err.quantity = "Whole number, 0 or more";
    setErrors(err);
    if (Object.keys(err).length) return toast.error("Please fix the highlighted fields");

    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), quantity: Number(form.quantity) };
      if (id) await equipmentService.update(id, payload); else await equipmentService.create(payload);
      toast.success(id ? "Equipment updated" : "Equipment submitted for admin approval");
      router.push(backTo);
    } catch (e2) {
      toast.error(getErrorMessage(e2));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="card-surface space-y-6 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Equipment name" value={form.name} onChange={set("name")} error={errors.name} />
        <Select label="Category" value={form.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}</Select>
        <Input label="Brand" value={form.brand} onChange={set("brand")} error={errors.brand} />
        <Input label="Model" value={form.model} onChange={set("model")} error={errors.model} />
        <Input label="Location" value={form.location} onChange={set("location")} error={errors.location} />
        <Select label="Condition" value={form.condition} onChange={set("condition")}>{CONDITIONS.map((c) => <option key={c}>{c}</option>)}</Select>
        <Input label="Rental price ($)" type="number" min="1" step="0.01" value={form.price} onChange={set("price")} error={errors.price} />
        <Select label="Rental type" value={form.rentalType} onChange={set("rentalType")}>{RENTAL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</Select>
        <Input label="Available quantity" type="number" min="0" value={form.quantity} onChange={set("quantity")} error={errors.quantity} />
        <Input label="Status" value="Pending (set by admin review)" disabled readOnly />
      </div>
      <Textarea label="Description" rows={4} value={form.description} onChange={set("description")} error={errors.description} />
      <Textarea label="Rental terms and conditions" rows={3} value={form.terms} onChange={set("terms")} />
      <ImageUploadField label="Equipment image" value={form.imageUrl} onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))} />
      <div className="rounded-xl bg-tint p-4 text-sm text-muted">Owner: <b className="text-foreground">{initial?.ownerName || user?.name}</b> ({initial?.ownerEmail || user?.email})</div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push(backTo)}>Cancel</Button>
        <Button type="submit" variant="accent" loading={loading}>{id ? "Save changes" : "Submit for approval"}</Button>
      </div>
    </form>
  );
}
