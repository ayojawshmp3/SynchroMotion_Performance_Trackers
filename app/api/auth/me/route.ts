import { NextResponse } from "next/server";
import { userFromToken } from "@/lib/auth";

export async function GET(req: Request) {
  // Read cookie from request headers (Next gives cookies via headers)
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/access_token=([^;]+)/);
  const token = match?.[1];

  const user = userFromToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
