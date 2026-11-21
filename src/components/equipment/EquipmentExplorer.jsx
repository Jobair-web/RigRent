"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { equipmentService } from "@/services/equipmentService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import EquipmentFilters from "./EquipmentFilters";
import EquipmentGrid from "./EquipmentGrid";

/** Filters live in the URL, so every view is shareable and back-button safe. Filtering runs on the server. */
export default function EquipmentExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qs = sp.toString();
  const query = Object.fromEntries(sp.entries());

  const [search, setSearch] = useState(query.search || "");
  const [showFilters, setShowFilters] = useState(false);
  const debounced = useDebounce(search, 400);

  const setParams = useCallback((patch) => {
    const p = new URLSearchParams(qs);
    Object.entries(patch).forEach(([k, v]) => (v === "" || v == null ? p.delete(k) : p.set(k, String(v))));
    if (!("page" in patch)) p.delete("page");
    router.replace(`${pathname}${p.toString() ? `?${p}` : ""}`, { scroll: false });
  }, [qs, router, pathname]);

  useEffect(() => {
    if ((query.search || "") !== debounced) setParams({ search: debounced });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const { data, loading, error } = useAsync(() => equipmentService.list({ ...query, limit: 9 }), [qs]);
  const clear = () => { setSearch(""); router.replace(pathname, { scroll: false }); };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <Button variant="outline" className="mb-4 w-full lg:hidden" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
          <SlidersHorizontal className="h-4 w-4" />Filters
        </Button>
        <div className={showFilters ? "block" : "hidden lg:block"}>
          <EquipmentFilters values={query} search={search} onSearch={setSearch} onChange={setParams} onClear={clear} />
        </div>
      </div>
      <div>
        <p className="mb-4 text-sm text-muted" aria-live="polite">
          {loading ? "Loading equipment…" : error ? error : `Showing ${data?.items?.length || 0} of ${data?.total || 0} items`}
        </p>
        <EquipmentGrid items={data?.items} loading={loading} count={9} emptyAction={<Button onClick={clear}>Reset filters</Button>} />
        {data && <Pagination page={data.page} pages={data.pages} onChange={(p) => setParams({ page: p })} />}
      </div>
    </div>
  );
}
