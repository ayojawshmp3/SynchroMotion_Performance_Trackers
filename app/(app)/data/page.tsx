"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SessionRecord = {
  id: string;
  createdAt?: string;
  endedAt?: string;
  notes?: string;
  completedExercises?: Array<{ exercise: string }>;
};

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function safeCountExercises(s: SessionRecord) {
  return s.completedExercises?.length ?? 0;
}

// Turn "session_df6f..._1770..." into something readable
function prettySessionName(id: string) {
  // If you keep your current id format, just shorten it
  if (!id) return "Session";
  const parts = id.split("_");
  const tail = parts[1]?.slice(0, 6) ?? id.slice(0, 6);
  return `Session ${tail.toUpperCase()}`;
}

export default function DataPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/sessions", { credentials: "include" });
        const data = await res.json();
        setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sorted = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return tb - ta;
    });
  }, [sessions]);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalExercises = sessions.reduce((acc, s) => acc + safeCountExercises(s), 0);
    const latest = sorted[0]?.createdAt;
    return { totalSessions, totalExercises, latest };
  }, [sessions, sorted]);

  return (
    <main className="space-y-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-foreground">Data</h1>
        <p className="text-sm text-muted-foreground">
          Sessions saved for the currently signed-in user.
        </p>
      </header>

      {/* Summary row */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardContent className="flex min-h-28 flex-col justify-between p-6">
            <div className="text-sm text-secondary-foreground/70">Total sessions</div>
            <div className="text-3xl font-bold">{loading ? "—" : stats.totalSessions}</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardContent className="flex min-h-28 flex-col justify-between p-6">
            <div className="text-sm text-secondary-foreground/70">Total exercises logged</div>
            <div className="text-3xl font-bold">{loading ? "—" : stats.totalExercises}</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-accent text-accent-foreground shadow-lg">
          <CardContent className="flex min-h-28 flex-col justify-between p-6">
            <div className="text-sm text-accent-foreground/70">Most recent session</div>
            <div className="text-2xl font-semibold">{loading ? "—" : formatShortDate(stats.latest)}</div>
          </CardContent>
        </Card>
      </section>

      {/* Sessions list */}
      <Card className="rounded-3xl border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Saved Sessions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : sorted.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              No saved sessions yet.
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((s) => {
                const exCount = safeCountExercises(s);
                const title = prettySessionName(s.id);

                return (
                  <div
                    key={s.id}
                    className={cn(
                      "rounded-2xl border bg-background/40 p-5",
                      "transition hover:bg-background/60"
                    )}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-foreground">{title}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDateTime(s.createdAt)} → {formatDateTime(s.endedAt)}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">
                          Exercises: {exCount}
                        </Badge>
                        {/* You can add more badges later, like device, duration, etc */}
                      </div>
                    </div>

                    {s.notes ? (
                      <>
                        <Separator className="my-4 opacity-40" />
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Notes: </span>
                          {s.notes}
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
