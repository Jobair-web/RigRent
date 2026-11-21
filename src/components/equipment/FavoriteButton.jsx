"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { favoriteService } from "@/services/favoriteService";
import { getErrorMessage } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function FavoriteButton({ equipmentId }) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    favoriteService.list().then((list) => setSaved(list.some((e) => e._id === equipmentId))).catch(() => {});
  }, [equipmentId]);

  const toggle = async () => {
    const next = !saved;
    setSaved(next); // optimistic
    setBusy(true);
    try {
      await (next ? favoriteService.add(equipmentId) : favoriteService.remove(equipmentId));
      toast.success(next ? "Added to favorites" : "Removed from favorites");
    } catch (err) {
      setSaved(!next);
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={toggle} disabled={busy} aria-pressed={saved}>
      <Heart className={saved ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"} />
      {saved ? "Saved to favorites" : "Add to favorites"}
    </Button>
  );
}
