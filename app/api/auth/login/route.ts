import { NextResponse } from "next/server";
import { USERS } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  // DEV: password ignored for now, email selects the user
  const user = USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user) {
    return NextResponse.json({ error: "Unknown user" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, user });

  res.cookies.set("access_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
