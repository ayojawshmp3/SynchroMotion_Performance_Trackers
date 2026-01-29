"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMe } from "@/hooks/useMe";
import { useActiveSession } from "@/hooks/useActiveSession";

export default function CurrentSessionPanel() {
  const router = useRouter();
  const { user, loading: meLoading } = useMe();
  const {
    loading,
    active,
    inSession,
    durationSec,
    exercises,
    startSession,
    setNotes,
    startExercise,
    updateLive,
    endExercise,
    cancelSession,
  } = useActiveSession();

  const isBusy = meLoading || loading;

  async function endAndSave() {
    if (!active) return;

    // Convert active session -> history session (peaks only)
    const historySession = {
      id: active.id,
      userId: active.userId, // server will enforce anyway
      startedAt: active.startedAt,
      durationSec,
      notes: active.notes?.trim() ? active.notes.trim() : undefined,
      exercises: active.completedExercises,
    };

    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(historySession),
    });

    if (!res.ok) {
      alert("Failed to save session.");
      return;
    }

    // clear active session server-side
    await fetch("/api/session/active", { method: "DELETE", credentials: "include" });

    router.refresh();
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-foreground">Current Session</p>
          <p className="text-sm text-muted-foreground">
            {!inSession ? "Not started" : `Active • ${Math.floor(durationSec / 60)}m ${durationSec % 60}s`}
          </p>
        </div>

        {!inSession ? (
          <Button
            disabled={isBusy || !user?.id}
            onClick={() => startSession(user!.id)}
          >
            Start Session
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={endAndSave}>
              End & Save
            </Button>
            <Button variant="ghost" onClick={cancelSession}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      {inSession && active && (
        <>
          <div className="grid gap-2">
            <p className="text-sm font-medium text-foreground">Session Notes</p>
            <Input
              value={active.notes ?? ""}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes (e.g., squats 3x5)..."
            />
          </div>

          <div className="grid gap-2">
            <p className="text-sm font-medium text-foreground">Exercise</p>

            {active.currentExercise ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div>
                  <p className="font-semibold text-foreground">{active.currentExercise.exercise}</p>
                  <p className="text-xs text-muted-foreground">
                    Live metrics (mock now, WebSocket later)
                  </p>
                </div>

                <Button onClick={endExercise}>End Exercise</Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {exercises.map((ex) => (
                  <Button key={ex} variant="outline" onClick={() => startExercise(ex)}>
                    Start {ex}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Mock live controls for now */}
          {active.currentExercise && (
            <div className="grid gap-3 rounded-lg border p-3">
              <p className="text-sm font-medium text-foreground">Mock Live Metrics</p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Power (W)</p>
                  <Input
                    type="number"
                    value={active.currentExercise.livePowerW}
                    onChange={(e) =>
                      updateLive({
                        powerW: Number(e.target.value),
                        velocity: active.currentExercise!.liveVelocity,
                        accel: active.currentExercise!.liveAcceleration,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Velocity (m/s)</p>
                  <Input
                    type="number"
                    value={active.currentExercise.liveVelocity}
                    onChange={(e) =>
                      updateLive({
                        powerW: active.currentExercise!.livePowerW,
                        velocity: Number(e.target.value),
                        accel: active.currentExercise!.liveAcceleration,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Acceleration (m/s²)</p>
                  <Input
                    type="number"
                    value={active.currentExercise.liveAcceleration}
                    onChange={(e) =>
                      updateLive({
                        powerW: active.currentExercise!.livePowerW,
                        velocity: active.currentExercise!.liveVelocity,
                        accel: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Peaks are tracked automatically while the exercise is active.
              </p>
            </div>
          )}

          <div className="grid gap-2">
            <p className="text-sm font-medium text-foreground">Completed Exercises</p>

            {active.completedExercises.length === 0 ? (
              <p className="text-sm text-muted-foreground">None yet.</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 pr-4">Exercise</th>
                      <th className="py-2 pr-4">Peak Power</th>
                      <th className="py-2 pr-4">Peak Vel</th>
                      <th className="py-2 pr-4">Peak Accel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.completedExercises.map((e, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 pr-4">{e.exercise}</td>
                        <td className="py-2 pr-4">{e.peakPowerW} W</td>
                        <td className="py-2 pr-4">{e.peakVelocity} m/s</td>
                        <td className="py-2 pr-4">{e.peakAcceleration} m/s²</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
