"use client";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { bookingService } from "@/services/bookingService";
import { calcRentalAmount, formatCurrency, getErrorMessage, rentalUnit, todayISO } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/FormControls";

export default function BookingModal({ open, onClose, equipment, user }) {
  const [form, setForm] = useState({ startDate: "", endDate: "", quantity: 1, contactNumber: user?.phone || "", deliveryAddress: user?.address || "", notes: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const total = useMemo(
    () => calcRentalAmount({ rentalType: equipment.rentalType, price: equipment.price, startDate: form.startDate, endDate: form.endDate, quantity: Number(form.quantity) || 0 }),
    [form.startDate, form.endDate, form.quantity, equipment]
  );

  const validate = () => {
    const e = {};
    if (!form.startDate) e.startDate = "Choose a start date";
    if (!form.endDate) e.endDate = "Choose an end date";
    else if (form.endDate < form.startDate) e.endDate = "End date must be after start date";
    const q = Number(form.quantity);
    if (!Number.isInteger(q) || q < 1) e.quantity = "At least 1";
    else if (q > equipment.quantity) e.quantity = `Only ${equipment.quantity} available`;
    if (!form.contactNumber.trim()) e.contactNumber = "Contact number is required";
    if (!form.deliveryAddress.trim()) e.deliveryAddress = "Delivery address is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { url } = await bookingService.checkout({ ...form, quantity: Number(form.quantity), equipmentId: equipment._id });
      toast.info("Redirecting to secure payment…");
      window.location.href = url; // Stripe Checkout
    } catch (err) {
      toast.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Book ${equipment.name}`}>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
        <Input label="Rental start date" type="date" min={todayISO()} value={form.startDate} onChange={set("startDate")} error={errors.startDate} />
        <Input label="Rental end date" type="date" min={form.startDate || todayISO()} value={form.endDate} onChange={set("endDate")} error={errors.endDate} />
        <Input label="Required quantity" type="number" min="1" max={equipment.quantity} value={form.quantity} onChange={set("quantity")} error={errors.quantity} hint={`${equipment.quantity} available`} />
        <Input label="Contact number" type="tel" value={form.contactNumber} onChange={set("contactNumber")} error={errors.contactNumber} />
        <Input className="sm:col-span-2" label="Delivery address" value={form.deliveryAddress} onChange={set("deliveryAddress")} error={errors.deliveryAddress} />
        <Textarea className="sm:col-span-2" label="Additional notes (optional)" value={form.notes} onChange={set("notes")} />
        <div className="space-y-1 rounded-xl bg-tint p-4 text-sm sm:col-span-2">
          <div className="flex justify-between text-muted"><span>Rate</span><span>{formatCurrency(equipment.price)}/{rentalUnit(equipment.rentalType)}</span></div>
          <div className="flex justify-between text-base font-bold"><span>Estimated total</span><span>{total ? formatCurrency(total) : "-"}</span></div>
        </div>
        <div className="flex justify-end gap-3 sm:col-span-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="accent" loading={loading}>Confirm and pay</Button>
        </div>
      </form>
    </Modal>
  );
}
