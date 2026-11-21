"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/userService";
import { useAsync } from "@/hooks/useAsync";
import { capitalize, getErrorMessage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControls";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { Skeleton } from "@/components/ui/Skeleton";
import UserAvatar from "@/components/layout/UserAvatar";
import PageHeader from "./PageHeader";

export default function ProfileForm() {
  const { data, loading } = useAsync(() => userService.me(), []);
  const [form, setForm] = useState({ name: "", image: "", phone: "", address: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setForm({ name: data.name, image: data.image, phone: data.phone, address: data.address }); }, [data]);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      await userService.updateMe(form);
      await authClient.updateUser({ name: form.name.trim(), image: form.image || undefined });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Skeleton className="h-96 max-w-2xl" />;
  return (
    <>
      <PageHeader title="My profile" description="Manage your personal information." />
      <form onSubmit={save} className="card-surface max-w-2xl space-y-5 p-6">
        <div className="flex items-center gap-4">
          <UserAvatar user={form} className="h-16 w-16 text-2xl" />
          <div><p className="font-semibold">{data?.name}</p><p className="text-sm text-muted">{capitalize(data?.role)} account</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" value={form.name} onChange={set("name")} />
          <Input label="Email" value={data?.email || ""} readOnly disabled />
          <Input label="Phone number" type="tel" value={form.phone} onChange={set("phone")} />
          <Input label="Address" value={form.address} onChange={set("address")} />
        </div>
        <ImageUploadField label="Profile image" value={form.image} onChange={(image) => setForm((f) => ({ ...f, image }))} />
        <Button type="submit" loading={saving}>Save changes</Button>
      </form>
    </>
  );
}
