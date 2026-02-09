import { NextResponse } from "next/server";

export async function GET() {
  const t = Date.now() / 1000;

  // Big, obvious waveform (0..~450-ish)
  const base = 200;
  const wave = 180 * Math.abs(Math.sin(t * 1.4));
  const jitter = 30 * Math.sin(t * 8);

  const magnitude = Math.max(0, base + wave + jitter);

  const res = NextResponse.json({
    magnitude: Number(magnitude.toFixed(2)),
  });

  // prevent caching
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");

  return res;
}
