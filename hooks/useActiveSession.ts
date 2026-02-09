// hooks/useActiveSession.ts
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ExerciseSummary, ExerciseType } from "@/lib/types";
import type { ActiveSession } from "@/lib/activeSessionStore";

const EXERCISES: ExerciseType[] = ["Curls", "Squat", "Deadlift", "Jump", "Bench Press"];

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function notifySessionUpdated() {
  if (typeof window !== "undefined") {
    console.log("[event] session-updated dispatched");
    window.dispatchEvent(new Event("session-updated"));
  }
}

export function useActiveSession() {
  const [active, setActive] = useState<ActiveSession | null>(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback(async (next: ActiveSession | null) => {
    setActive(next);

    // Notify any listeners (like the dashboard graph) that session state changed
    notifySessionUpdated();

    await fetch("/api/session/active", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ active: next }),
    });
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/api/session/active", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        if (alive) setActive(data.active ?? null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const inSession = !!active;

  const durationSec = useMemo(() => {
    if (!active?.startedAt) return 0;
    const start = new Date(active.startedAt).getTime();
    return Math.max(0, Math.floor((Date.now() - start) / 1000));
  }, [active?.startedAt]);

  // Actions
  const startSession = useCallback(async (userId: string) => {
    const session: ActiveSession = {
      id: makeId("session"),
      userId,
      startedAt: new Date().toISOString(),
      notes: "",
      currentExercise: null,
      completedExercises: [],
    };
    await persist(session);
  }, [persist]);

  const setNotes = useCallback(async (notes: string) => {
    if (!active) return;
    await persist({ ...active, notes });
  }, [active, persist]);

  const startExercise = useCallback(async (exercise: ExerciseType) => {
    if (!active) return;

    await persist({
      ...active,
      currentExercise: {
        exercise,
        startedAt: new Date().toISOString(),
        livePowerW: 0,
        liveVelocity: 0,
        liveAcceleration: 0,
        peakPowerW: 0,
        peakVelocity: 0,
        peakAcceleration: 0,
      },
    });
  }, [active, persist]);

  // This will be called by WebSockets later.
  // For now you can feed it mock values.
  const updateLive = useCallback(async (vals: { powerW: number; velocity: number; accel: number }) => {
    if (!active?.currentExercise) return;

    const ce = active.currentExercise;

    const next = {
      ...active,
      currentExercise: {
        ...ce,
        livePowerW: vals.powerW,
        liveVelocity: vals.velocity,
        liveAcceleration: vals.accel,
        peakPowerW: Math.max(ce.peakPowerW, vals.powerW),
        peakVelocity: Math.max(ce.peakVelocity, vals.velocity),
        peakAcceleration: Math.max(ce.peakAcceleration, vals.accel),
      },
    };

    await persist(next);
  }, [active, persist]);

  const endExercise = useCallback(async () => {
    if (!active?.currentExercise) return;

    const ce = active.currentExercise;

    const summary: ExerciseSummary = {
      exercise: ce.exercise,
      peakPowerW: Math.round(ce.peakPowerW),
      peakVelocity: Number(ce.peakVelocity.toFixed(2)),
      peakAcceleration: Number(ce.peakAcceleration.toFixed(2)),
    };

    await persist({
      ...active,
      currentExercise: null,
      completedExercises: [...active.completedExercises, summary],
    });
  }, [active, persist]);

  const cancelSession = useCallback(async () => {
    await persist(null);
  }, [persist]);

  return {
    loading,
    active,
    inSession,
    durationSec,
    exercises: EXERCISES,

    // actions
    startSession,
    setNotes,
    startExercise,
    updateLive,
    endExercise,
    cancelSession,
    persistActive: persist,
  };
}
