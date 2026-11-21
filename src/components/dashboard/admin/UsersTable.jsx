"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { userService } from "@/services/userService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { ROLES } from "@/lib/constants";
import { capitalize, formatDate, getErrorMessage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import UserAvatar from "@/components/layout/UserAvatar";
import PageHeader from "../shared/PageHeader";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const q = useDebounce(search);
  const { data, loading, refetch } = useAsync(() => userService.list({ page, search: q }), [page, q]);
  const [roleChange, setRoleChange] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async (fn, okMsg, close) => {
    setBusy(true);
    try { await fn(); toast.success(okMsg); close(null); refetch(); }
    catch (err) { toast.error(getErrorMessage(err)); }
    finally { setBusy(false); }
  };

  const columns = [
    { key: "user", header: "User", render: (u) => <div className="flex items-center gap-3"><UserAvatar user={u} /><span className="font-semibold">{u.name}</span></div> },
    { key: "email", header: "Email", render: (u) => u.email },
    { key: "role", header: "Role", render: (u) => (
      <select aria-label={`Role for ${u.name}`} value={u.role} onChange={(e) => e.target.value !== u.role && setRoleChange({ user: u, role: e.target.value })} className="input-base !min-h-9 !w-auto !py-1">
        {Object.values(ROLES).map((r) => <option key={r} value={r}>{capitalize(r)}</option>)}
      </select>) },
    { key: "joined", header: "Registered", render: (u) => formatDate(u.createdAt) },
    { key: "actions", header: "Manage", render: (u) => <Button size="sm" variant="danger" onClick={() => setToDelete(u)}>Delete</Button> },
  ];

  return (
    <>
      <PageHeader title="All users" description="Change roles and manage accounts." />
      <input className="input-base mb-4 max-w-sm" placeholder="Search by name or email" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} aria-label="Search users" />
      <DataTable columns={columns} rows={data?.items} loading={loading} page={page} pages={data?.pages || 1} onPageChange={setPage}
        empty={<EmptyState title="No users found" />} />
      <ConfirmDialog open={!!roleChange} loading={busy} title="Change role" confirmLabel="Change role"
        message={`Change ${roleChange?.user.name} to ${roleChange?.role}? Their permissions update immediately.`}
        onConfirm={() => run(() => userService.changeRole(roleChange.user._id, roleChange.role), "Role updated", setRoleChange)} onClose={() => setRoleChange(null)} />
      <ConfirmDialog open={!!toDelete} danger loading={busy} title="Delete user" confirmLabel="Delete user"
        message={`${toDelete?.name} will be permanently removed.`}
        onConfirm={() => run(() => userService.remove(toDelete._id), "User deleted", setToDelete)} onClose={() => setToDelete(null)} />
    </>
  );
}
