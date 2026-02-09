import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // get current user from cookie (same style as /api/auth/me)
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    // If your token is just the email, use that. If it's JSON, parse it.
    // For your current setup, you likely store email in the cookie.
    const email = token;

    // read sessions file
    const filePath = path.join(process.cwd(), "data", "sessions.json");
    let existing: any[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }

    // Filter by email OR userId depending on what you saved
    // Your POST saved userId; if your "me" API has id and email, store both and filter by userId.
    // For now, safest: filter by userId if present, otherwise fallback to email.
    const filtered = existing.filter((s) => s.userEmail === email || s.email === email || s.userId === email);

    return NextResponse.json({ ok: true, sessions: filtered });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Expect: { session: <ActiveSession>, user: { id, email, name? } }
    const { session, user } = body ?? {};

    if (!session?.id || !user?.id) {
      return NextResponse.json(
        { ok: false, error: "Missing session or user info" },
        { status: 400 }
      );
    }

    // Persist to a local JSON file (good for dev + self-host on Pi)
    const filePath = path.join(process.cwd(), "data", "sessions.json");
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    let existing: any[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }

    const record = {
    id: session.id,
    userId: user.id,
    userEmail: user.email,
    createdAt: session.startedAt,
    endedAt: new Date().toISOString(),
    notes: session.notes ?? "",
    completedExercises: session.completedExercises ?? [],
    };

    existing.push(record);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true, record });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
