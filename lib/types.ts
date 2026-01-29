export type ExerciseType = "Curls" | "Squat" | "Deadlift" | "Jump" | "Bench Press";

export type ExerciseSummary = {
  exercise: ExerciseType;
  peakPowerW: number;
  peakVelocity: number;       // m/s
  peakAcceleration: number;   // m/s^2
};

export type SessionSummary = {
  id: string;
  userId: string;
  startedAt: string;          // ISO string
  durationSec: number;
  notes?: string;
  exercises: ExerciseSummary[];
};
