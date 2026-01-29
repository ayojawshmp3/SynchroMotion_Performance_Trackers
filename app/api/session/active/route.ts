// app/api/session/active/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userFromToken } from "@/lib/auth";
import { getActiveSession, setActiveSession } from "@/lib/activeSessionStore";
import type { ActiveSession } from "@/lib/activeSessionStore";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = userFromToken(token);
  if (!user) return unauthorized();

  return NextResponse.json({ active: getActiveSession(user.id) });
}

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = userFromToken(token);
  if (!user) return unauthorized();

  const body = (await req.json()) as { active: ActiveSession | null };

  // enforce ownership
  if (body.active && body.active.userId !== user.id) {
    body.active.userId = user.id;
  }

  setActiveSession(user.id, body.active ?? null);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = userFromToken(token);
  if (!user) return unauthorized();

  setActiveSession(user.id, null);
  return NextResponse.json({ ok: true });
}
