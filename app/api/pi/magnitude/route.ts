import { NextResponse } from "next/server";

const PI_BASE =                                                                            
  process.env.NEXT_PUBLIC_PI_API_BASE_URL?.replace(/\/+$/, "") ??                          
  "http://raspberrypi.bambino-burbot.ts.net:8000"; // or 100.114.213.75

export async function GET() {
  try {
    const upstream = await fetch(`${PI_BASE}/magnitude`, {
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Pi API returned a non-200 response" },
        { status: 502 }
      );
    }

    const json = await upstream.json();
    const res = NextResponse.json(json);

    // prevent caching
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to reach Pi API" },
      { status: 502 }
    );
  }
}
