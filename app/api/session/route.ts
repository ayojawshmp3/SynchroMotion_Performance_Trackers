import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userFromToken } from "@/lib/auth";
import { addSession, getSessionsByUser } from "@/lib/sessionStore";
import type { SessionSummary } from "@/lib/types";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = userFromToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = getSessionsByUser(user.id);
  return NextResponse.json({ sessions });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = userFromToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = (await req.json()) as SessionSummary;

  // enforce ownership on server
  const safeSession: SessionSummary = { ...session, userId: user.id };
  addSession(safeSession);

  return NextResponse.json({ ok: true, session: safeSession });
}
