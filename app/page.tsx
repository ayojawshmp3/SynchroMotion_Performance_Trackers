// app/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// notes:
// have a preset page with different settings for measurable outputs:
// - ex: if doing bench: power output, height, velocity
export default function Home() {
  return (
    <main className="space-y-6 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Welcome to your Dashboard, <span className="text-primary">Chester</span>
        </h1>
      </header>

      {/* Main grid: graph + session info */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr,1fr]">
        {/* Graph card placeholder */}
        <Card className="rounded-3xl border-none bg-primary text-primary-foreground shadow-lg">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium text-primary-foreground">
              Session 12 Live Power Output – 10/30/2025
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex h-64 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground/80">
              Power graph goes here
            </div>
          </CardContent>
        </Card>

        {/* Metrics */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="rounded-3xl border-none bg-primary text-primary-foreground shadow-lg">
            <CardContent className="flex min-h-32 flex-col justify-between">
              <div className="text-sm text-primary-foreground/80">Peak Power Output (watts)</div>
              <div className="text-4xl font-bold">250W</div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-none bg-secondary text-secondary-foreground shadow-lg">
            <CardContent className="flex min-h-32 flex-col justify-between">
              <div className="text-sm text-secondary-foreground/80">Velocity</div>
              <div className="text-2xl font-semibold">1.2 m/s</div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-none bg-accent text-accent-foreground shadow-lg">
            <CardContent className="flex min-h-32 flex-col justify-between">
              <div className="text-sm text-accent-foreground/80">Acceleration</div>
              <div className="text-2xl font-semibold">3.6 m/s²</div>
            </CardContent>
          </Card>
        </section>
        
        {/* Session info card */}
        <Card className="rounded-3xl border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Session Information
            </CardTitle>
            <CardDescription>Quick reference for your current workout block.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-foreground">Title</dt>
                <dd className="text-foreground">Session 12</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Duration</dt>
                <dd className="text-foreground">8 minutes</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Device</dt>
                <dd className="text-foreground">SynchroFit V1</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Notes</dt>
                <dd className="text-foreground">
                  3 sets of squats, began with 225, up 1 plate on 2nd set, went
                  down on 3rd set.
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
