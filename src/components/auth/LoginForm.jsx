"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControls";
import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.password) err.password = "Password is required";
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: form.email, password: form.password });
    if (error) {
      toast.error(error.message || "Invalid email or password");
      setLoading(false);
      return;
    }
    clearToken();
    toast.success("Logged in successfully");
    router.push(redirect);
    router.refresh();
  };

  return (
    <AuthCard title="Welcome back" subtitle="Log in to book equipment or manage your listings."
      footer={<>New to RigRent? <Link href={`/register${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="font-semibold text-primary hover:underline">Create an account</Link></>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Input label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <PasswordInput label="Password" autoComplete="current-password" value={form.password} onChange={set("password")} error={errors.password} />
        <Button type="submit" size="lg" className="w-full" loading={loading}>Login</Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" /></div>
      <GoogleButton redirect={redirect} />
    </AuthCard>
  );
}
