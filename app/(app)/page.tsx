// app/(app)/page.tsx
"use client";
import { useEffect, useState } from "react";

import { useMe } from "@/hooks/useMe";
import { useActiveSessionCtx } from "@/components/ActiveSessionProvider";
import { useLiveSeries } from "@/hooks/useLiveSeries";

import CurrentSessionPanel from "@/components/CurrentSessionPanel";
import PowerGraph from "@/components/charts/PowerGraph";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { user, loading } = useMe();
  const { active } = useActiveSessionCtx();
  const [chartDelaySec, setChartDelaySec] = useState(0); // Delay setting (seconds). We'll wire the button later, for now default 5s.

  const current = active?.currentExercise;

  // Rolling 30s window for the graph (auto-scroll)
  const {
    data: powerSeries,
    pushPoint,
    clear,
  } = useLiveSeries({
    windowMs: 30_000,
    maxPoints: 600,
  });

  const hasLiveData = powerSeries.length > 0;
  const graphData = hasLiveData ? powerSeries : [{ t: 0, v: 0 }];

  useEffect(() => {
    // no exercise selected = no chart data
    if (!current) {
      clear();
      return;
    }

    let alive = true;
    let pollId: ReturnType<typeof setInterval> | null = null;
    let delayTimeout: ReturnType<typeof setTimeout> | null = null;

    // restart the chart each time you start a new exercise
    clear();

    const delayMs = Math.max(0, chartDelaySec * 1000);

    // wait BEFORE collecting data
    delayTimeout = setTimeout(() => {
      // poll at 10 Hz
      pollId = setInterval(async () => {
        try {
          const res = await fetch("/api/pi/magnitude", {
            cache: "no-store",
            credentials: "include",
          });
          if (!res.ok) return;

          const json = await res.json();
          if (!alive) return;

          // IMPORTANT: make sure this is a number
          const mag = Number(json.magnitude);
          if (!Number.isFinite(mag)) return;

          // sanity log once in a while
          // console.log("magnitude:", mag);

          pushPoint(mag);
        } catch {
          // ignore transient errors
        }
      }, 100);
    }, delayMs);

    return () => {
      alive = false;
      if (delayTimeout) clearTimeout(delayTimeout);
      if (pollId) clearInterval(pollId);
    };
  }, [
    current?.exercise,   // rerun when exercise changes
    chartDelaySec,       // rerun when delay dropdown changes
    pushPoint,
    clear,
  ]);

  return (
    <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Welcome to your Dashboard{loading ? "" : `, ${user?.name ?? ""}`}
        </h1>
      </header>

      {/* Session workflow panel */}
      <div className="space-y-6">
        <CurrentSessionPanel
          chartDelaySec={chartDelaySec}
          onChangeDelay={(sec) => setChartDelaySec(sec)}
        />
      </div>

      {/* Graph */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr,1fr]">
        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium text-secondary-foreground">
              {current
                ? `${current.exercise} Movement Magnitude – ${new Date(
                    active?.startedAt ?? Date.now()
                  ).toLocaleDateString()}`
                : `Movement Magnitude – ${new Date().toLocaleDateString()}`}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="rounded-2xl bg-primary-foreground/10 p-3 sm:p-4">
              {/* DO NOT REMOVE THIS WRAPPER */}
              <div className="h-[300px] min-h-[300px] w-full min-w-0 sm:h-[360px] sm:min-h-[360px] lg:h-[420px] lg:min-h-[420px]">
                <PowerGraph data={graphData} showLine={hasLiveData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tiles can stay for now; later they’ll show backend peaks */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardContent className="flex min-h-32 flex-col justify-between">
            <div className="text-sm text-secondary-foreground/80">
              Peak Power Output (watts)
            </div>
            <div className="text-2xl font-bold">
              {current ? `${Math.round(current.peakPowerW)}W` : "--"}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardContent className="flex min-h-32 flex-col justify-between">
            <div className="text-sm text-secondary-foreground/80">Velocity</div>
            <div className="text-2xl font-semibold">
              {current ? `${current.liveVelocity.toFixed(2)} m/s` : "--"}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-accent text-accent-foreground shadow-lg">
          <CardContent className="flex min-h-32 flex-col justify-between">
            <div className="text-sm text-accent-foreground/80">Acceleration</div>
            <div className="text-2xl font-semibold">
              {current ? `${current.liveAcceleration.toFixed(2)} m/s²` : "--"}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
