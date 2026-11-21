"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "@/lib/utils";

/** Tiny data-fetching hook: { data, loading, error, refetch, setData } */
export function useAsync(fn, deps = [], { immediate = true } = {}) {
  const [state, setState] = useState({ data: null, loading: immediate, error: null });
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(async (...args) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fn(...args);
      if (alive.current) setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      if (alive.current) setState((s) => ({ ...s, loading: false, error: getErrorMessage(err) }));
      return null;
    }
  }, deps);

  useEffect(() => {
    if (immediate) run();
  }, [run, immediate]);

  const setData = useCallback((updater) =>
    setState((s) => ({ ...s, data: typeof updater === "function" ? updater(s.data) : updater })), []);

  return { ...state, refetch: run, setData };
}
