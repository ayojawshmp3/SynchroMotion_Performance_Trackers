// app/page.tsx

// notes:
// have a preset page with different settings for measurable outputs:
// - ex: if doing bench: power output, height, velocity
export default function Home() {
  return (
    <main className="p-8 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Welcome to your Dashboard, <span className="text-emerald-700">Chester</span>
        </h1>
      </header>

      {/* Main grid: graph + session info */}
      <section className="grid gap-6 grid-cols-1 xl:grid-cols-[2fr,1fr]">
        {/* Graph card placeholder */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-lg">
          <h2 className="text-lg font-medium mb-4">
            Session 12 Live Power Output – 10/30/2025
          </h2>
          <div className="h-64 bg-slate-800 rounded-2xl border border-white/10 flex items-center justify-center text-sm text-white/60">
            Power graph goes here
          </div>
        </div>

        {/* Session info card */}
        <aside className="rounded-3xl bg-slate-100 p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Session Information</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-900">Session 12</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Duration</dt>
              <dd className="text-gray-900">8 minutes</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Device</dt>
              <dd className="text-gray-900">SynchroFit V1</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Notes</dt>
              <dd className="text-gray-900">
                3 sets of squats, began with 225, up 1 plate on 2nd set, went
                down on 3rd set.
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Bottom metrics */}
      <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white p-6 shadow-lg flex flex-col justify-between">
          <div className="text-sm text-white/80">Peak Power Output (watts)</div>
          <div className="text-4xl font-bold mt-2">250W</div>
        </div>
        <div className="rounded-3xl bg-slate-900 text-emerald-300 p-6 shadow-lg flex flex-col justify-between">
          <div className="text-sm text-emerald-100/80">Velocity</div>
          <div className="text-2xl font-semibold mt-2">1.2 m/s</div>
        </div>
        <div className="rounded-3xl bg-slate-900 text-emerald-300 p-6 shadow-lg flex flex-col justify-between">
          <div className="text-sm text-emerald-100/80">Acceleration</div>
          <div className="text-2xl font-semibold mt-2">3.6 m/s²</div>
        </div>
      </section>
    </main>
  );
}
