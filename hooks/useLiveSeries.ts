"use client";

import { useCallback, useMemo, useRef, useState } from "react";

export type LivePoint = {
  t: number; // timestamp (ms)
  v: number; // magnitude/power
};

type Options = {
  windowMs?: number; // how much time to show (e.g., last 30s)
  maxPoints?: number; // hard cap
};

export function useLiveSeries(opts: Options = {}) {
  const windowMs = opts.windowMs ?? 30_000; // 30 seconds
  const maxPoints = opts.maxPoints ?? 600; // e.g., 20Hz * 30s

  const [raw, setRaw] = useState<LivePoint[]>([]);
  const rawRef = useRef<LivePoint[]>([]);
  rawRef.current = raw;

  const pushPoint = useCallback(
    (value: number) => {
      const now = Date.now();
      const next = [...rawRef.current, { t: now, v: value }];

      // trim by time window
      const cutoff = now - windowMs;
      let trimmed = next.filter((p) => p.t >= cutoff);

      // trim by count
      if (trimmed.length > maxPoints) {
        trimmed = trimmed.slice(trimmed.length - maxPoints);
      }

      setRaw(trimmed);
    },
    [windowMs, maxPoints]
  );

  const clear = useCallback(() => setRaw([]), []);

  // Convert timestamps to seconds for the chart
  const data = useMemo(() => {
    if (raw.length === 0) return [];
    const t0 = raw[0].t;
    return raw.map((p) => ({
      t: (p.t - t0) / 1000, // seconds since first point
      v: p.v,
    }));
  }, [raw]);

  return { data, pushPoint, clear };
}
