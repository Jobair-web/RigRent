"use client";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", danger, loading, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title={title} className="sm:max-w-md">
      <p className="text-sm text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant={danger ? "danger" : "primary"} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
