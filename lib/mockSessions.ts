import type { SessionSummary } from "@/lib/types";

export const MOCK_SESSIONS: SessionSummary[] = [
  {
    id: "s1",
    userId: "u1",
    startedAt: "2026-01-28T18:20:00.000Z",
    durationSec: 1800,
    notes: "Leg day",
    exercises: [
      { exercise: "Squat", peakPowerW: 820, peakVelocity: 1.4, peakAcceleration: 4.2 },
      { exercise: "Jump", peakPowerW: 1200, peakVelocity: 2.2, peakAcceleration: 6.8 },
    ],
  },
  {
    id: "s2",
    userId: "u2",
    startedAt: "2026-01-27T20:10:00.000Z",
    durationSec: 1400,
    notes: "Upper body",
    exercises: [
      { exercise: "Bench Press", peakPowerW: 640, peakVelocity: 1.1, peakAcceleration: 3.6 },
      { exercise: "Curls", peakPowerW: 210, peakVelocity: 0.9, peakAcceleration: 2.1 },
    ],
  },
  {
    id: "s3",
    userId: "u1",
    startedAt: "2026-01-25T19:00:00.000Z",
    durationSec: 1600,
    exercises: [
      { exercise: "Deadlift", peakPowerW: 980, peakVelocity: 1.3, peakAcceleration: 4.9 },
    ],
  },
];
