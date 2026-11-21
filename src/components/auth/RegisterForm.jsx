"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { validatePassword } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControls";
import ImageUploadField from "@/components/ui/ImageUploadField";
import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/dashboard";
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    const pw = validatePassword(form.password);
    if (pw) err.password = pw;
    setErrors(err);
    if (Object.keys(err).length) return toast.error(Object.values(err)[0]);

    setLoading(true);
    const { error } = await authClient.signUp.email({ name: form.name.trim(), email: form.email, password: form.password, image: form.image || undefined });
    if (error) {
      toast.error(error.message || "Registration failed");
      setLoading(false);
      return;
    }
    clearToken();
    toast.success("Account created successfully");
    router.push(redirect);
    router.refresh();
  };

  return (
    <AuthCard title="Create your account" subtitle="Join RigRent as a customer. Owners are upgraded by an admin."
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Login</Link></>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Input label="Full name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
        <Input label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <ImageUploadField label="Photo (optional)" value={form.image} onChange={(image) => setForm((f) => ({ ...f, image }))} />
        <PasswordInput label="Password" autoComplete="new-password" value={form.password} onChange={set("password")} error={errors.password}
          hint="6+ characters with an uppercase and a lowercase letter" />
        <Button type="submit" size="lg" className="w-full" loading={loading}>Register</Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" /></div>
      <GoogleButton redirect={redirect} />
    </AuthCard>
  );
}
