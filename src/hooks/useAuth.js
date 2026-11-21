"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

/** Session + role helpers + logout in one place. */
export function useAuth() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user || null;

  const logout = async () => {
    await authClient.signOut();
    clearToken();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return { user, role: user?.role || null, isPending, isLoggedIn: !!user, logout };
}
