import type { ExerciseType, SessionSummary } from "@/lib/types";

// NOTE: In-memory store resets when dev server restarts.
// Later this becomes Postgres via FastAPI.
let sessions: SessionSummary[] = [];

export function getSessionsByUser(userId: string) {
  return sessions
    .filter((s) => s.userId === userId)
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));
}

export function addSession(session: SessionSummary) {
  sessions.push(session);
}

export function clearAllSessions() {
  sessions = [];
}

export const EXERCISES: ExerciseType[] = [
  "Curls",
  "Squat",
  "Deadlift",
  "Jump",
  "Bench Press",
];
