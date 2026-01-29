"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

type Session = {
  id: string;
  startedAt: string;
  durationSec: number;
  notes?: string;
  exercises: Array<{
    exercise: string;
    peakPowerW: number;
    peakVelocity: number;
    peakAcceleration: number;
  }>;
};

export default function DataPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/api/sessions", { credentials: "include" });
        if (!res.ok) return;

        const data = await res.json();
        if (alive) setSessions(data.sessions ?? []);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Data</h1>
        <p className="text-sm text-muted-foreground">
          Session history (peaks only). No raw IMU data is stored long-term.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No sessions yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <p className="font-semibold text-foreground">
                  Session {s.id.toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(s.startedAt).toLocaleString()} • {(s.durationSec / 60).toFixed(0)} min
                </p>
              </div>

              {s.notes && (
                <p className="mt-2 text-sm text-muted-foreground">Notes: {s.notes}</p>
              )}

              <div className="mt-4 overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 pr-4">Exercise</th>
                      <th className="py-2 pr-4">Peak Power (W)</th>
                      <th className="py-2 pr-4">Peak Velocity (m/s)</th>
                      <th className="py-2 pr-4">Peak Accel (m/s²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.exercises.map((e, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 pr-4">{e.exercise}</td>
                        <td className="py-2 pr-4">{e.peakPowerW}</td>
                        <td className="py-2 pr-4">{e.peakVelocity}</td>
                        <td className="py-2 pr-4">{e.peakAcceleration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
