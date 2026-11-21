"use client";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const tip = { background: "rgb(var(--card))", border: "1px solid rgb(var(--border))", borderRadius: 12, color: "rgb(var(--foreground))" };
const COLORS = { completed: "#64748B", active: "#2563EB", confirmed: "#10B981", pending: "#F59E0B", cancelled: "#EF4444" };

export function MonthlyBarChart({ title, data, prefix = "" }) {
  return (
    <div className="card-surface p-5">
      <h3 className="mb-4 text-base font-bold">{title}</h3>
      <div className="h-72" role="img" aria-label={`${title}, last 12 months`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted))", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted))", fontSize: 12 }} />
            <Tooltip contentStyle={tip} cursor={{ fill: "rgb(var(--tint))" }} formatter={(v) => `${prefix}${v}`} />
            <Bar dataKey="value" fill="rgb(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatusDonut({ title = "Booking status", data = [] }) {
  const rows = data.map((d) => ({ name: d.status, value: d.count }));
  return (
    <div className="card-surface p-5">
      <h3 className="mb-4 text-base font-bold">{title}</h3>
      <div className="h-72">
        {rows.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={rows} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {rows.map((r) => <Cell key={r.name} fill={COLORS[r.name] || "#94A3B8"} />)}
              </Pie>
              <Tooltip contentStyle={tip} /><Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : <p className="flex h-full items-center justify-center text-sm text-muted">No bookings yet</p>}
      </div>
    </div>
  );
}
