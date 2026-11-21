"use client";
import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { uploadToImgbb } from "@/lib/imgbb";
import { getErrorMessage } from "@/lib/utils";
import Button from "./Button";

/** Paste an image URL or upload a file to imgbb. */
export default function ImageUploadField({ label = "Image", value, onChange }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadToImgbb(file));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="flex gap-2">
        <input className="input-base" placeholder="https://… or upload" value={value || ""} onChange={(e) => onChange(e.target.value)} />
        <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />
        <Button type="button" variant="outline" loading={busy} onClick={() => ref.current?.click()}><ImagePlus className="h-4 w-4" />Upload</Button>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="mt-2 h-24 w-24 rounded-xl border border-border object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
      )}
    </div>
  );
}
