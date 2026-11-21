"use client";
import { CATEGORIES, RENTAL_TYPES, SORT_OPTIONS } from "@/lib/constants";
import { Input, Select } from "@/components/ui/FormControls";
import Button from "@/components/ui/Button";

export default function EquipmentFilters({ values, search, onSearch, onChange, onClear }) {
  return (
    <aside aria-label="Filters" className="card-surface space-y-4 p-5 lg:sticky lg:top-24">
      <Input label="Search" placeholder="Name, location or category" value={search} onChange={(e) => onSearch(e.target.value)} />
      <Select label="Category" value={values.category || ""} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="">All categories</option>
        {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
      </Select>
      <Select label="Rental type" value={values.rentalType || ""} onChange={(e) => onChange({ rentalType: e.target.value })}>
        <option value="">Any</option>
        {RENTAL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </Select>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Min price" type="number" min="0" placeholder="0" value={values.minPrice || ""} onChange={(e) => onChange({ minPrice: e.target.value })} />
        <Input label="Max price" type="number" min="0" placeholder="Any" value={values.maxPrice || ""} onChange={(e) => onChange({ maxPrice: e.target.value })} />
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
        <input type="checkbox" className="h-4 w-4 accent-[rgb(var(--primary))]" checked={values.availability === "available"}
          onChange={(e) => onChange({ availability: e.target.checked ? "available" : "" })} />
        Available now
      </label>
      <Select label="Sort by" value={values.sort || "recent"} onChange={(e) => onChange({ sort: e.target.value })}>
        {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </Select>
      <Button variant="outline" className="w-full" onClick={onClear}>Clear filters</Button>
    </aside>
  );
}
