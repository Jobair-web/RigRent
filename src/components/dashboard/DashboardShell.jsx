"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { DASHBOARD_HOME, DASHBOARD_NAV } from "@/lib/constants";
import { cn, capitalize } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import UserAvatar from "@/components/layout/UserAvatar";
import { Skeleton } from "@/components/ui/Skeleton";

/** Full-width dashboard frame + role guard (the API enforces roles again with verifyRenter/Owner/Admin). */
export default function DashboardShell({ children }) {
  const { user, role, isPending, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) return router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    const allowed = pathname.startsWith(`/dashboard/${role}`) || pathname === "/dashboard/profile";
    if (!allowed) router.replace(DASHBOARD_HOME[role] || "/");
  }, [isPending, user, role, pathname, router]);

  useEffect(() => {
    if (user && sessionStorage.getItem("rr-welcome")) {
      sessionStorage.removeItem("rr-welcome");
      toast.success("Logged in successfully");
    }
  }, [user]);

  useEffect(() => setOpen(false), [pathname]);

  const allowed = user && (pathname.startsWith(`/dashboard/${role}`) || pathname === "/dashboard/profile");
  if (isPending || !allowed)
    return <div className="space-y-4 p-8"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-40" /><Skeleton className="h-64" /></div>;

  const nav = DASHBOARD_NAV[role] || [];
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-border p-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/" className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold hover:bg-tint sm:flex"><Home className="h-4 w-4" />Home</Link>
          <UserAvatar user={user} />
          <button onClick={logout} aria-label="Logout" className="flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold hover:bg-tint"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Logout</span></button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[256px_1fr]">
        {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
        <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-navy p-4 text-slate-300 transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full")}>
          <div className="mb-4 flex items-center justify-between lg:hidden"><Logo light /><button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button></div>
          <div className="mb-5 flex items-center gap-3 px-2 text-white">
            <UserAvatar user={user} className="bg-accent text-navy" />
            <div className="min-w-0 text-sm"><p className="truncate font-semibold">{user.name}</p><p className="text-xs text-slate-400">{capitalize(role)}</p></div>
          </div>
          <nav aria-label="Dashboard" className="space-y-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}
                className={cn("flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 text-sm font-medium transition hover:bg-white/5", pathname === n.href && "border-accent bg-white/10 text-white")}>
                <n.icon className="h-4 w-4" />{n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
