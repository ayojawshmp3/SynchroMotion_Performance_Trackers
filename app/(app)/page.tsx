// app/(app)/page.tsx
"use client";

import { useMe } from "@/hooks/useMe";
import CurrentSessionPanel from "@/components/CurrentSessionPanel";
import { useActiveSession } from "@/hooks/useActiveSession";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { user, loading } = useMe();
  const { active, durationSec } = useActiveSession();
  const current = active?.currentExercise;

  return (
    <main className="space-y-6 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-foreground">
          Welcome to your Dashboard{loading ? "" : `, ${user?.name ?? ""}`}
        </h1>
      </header>

        {/* Right column stack */}
        <div className="space-y-6">
          {/* ✅ Session workflow panel */}
          <CurrentSessionPanel />
        </div>

      {/* Top row: Graph (left) + Session Info + Current Session (right) */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr,1fr]">
        {/* Graph card placeholder */}
        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium text-secondary-foreground">
              {current
                ? `${current.exercise} Live Output – ${new Date(active!.startedAt).toLocaleDateString()}`
                : `No active exercise – ${new Date().toLocaleDateString()}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex h-64 items-center justify-center rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 text-sm text-secondary-foreground/80">
              Power graph goes here
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Bottom row: Metrics tiles */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
          <CardContent className="flex min-h-32 flex-col justify-between">
            <div className="text-sm text-secondary-foreground/80">
              Peak Power Output (watts)
            </div>
            <div className="text-2xl font-bold">
              {current ? `${Math.round(current.livePowerW)}W` : "--"}
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
            <div className="text-sm text-accent-foreground/80">
              Acceleration
            </div>
              <div className="text-2xl font-semibold">
                {current ? `${current.liveAcceleration.toFixed(2)} m/s²` : "--"}
              </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
