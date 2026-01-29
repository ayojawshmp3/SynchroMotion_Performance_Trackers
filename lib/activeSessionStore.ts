// lib/activeSessionStore.ts
import type { ExerciseSummary, ExerciseType } from "@/lib/types";

export type ActiveExercise = {
  exercise: ExerciseType;
  startedAt: string; // ISO
  // current live values (updated repeatedly)
  livePowerW: number;
  liveVelocity: number;
  liveAcceleration: number;
  // peaks while exercise is active
  peakPowerW: number;
  peakVelocity: number;
  peakAcceleration: number;
};

export type ActiveSession = {
  id: string;
  userId: string;
  startedAt: string;
  notes?: string;
  currentExercise: ActiveExercise | null;
  completedExercises: ExerciseSummary[];
};

// In-memory per-user active session
const activeByUser = new Map<string, ActiveSession>();

export function getActiveSession(userId: string) {
  return activeByUser.get(userId) ?? null;
}

export function setActiveSession(userId: string, session: ActiveSession | null) {
  if (!session) activeByUser.delete(userId);
  else activeByUser.set(userId, session);
}
