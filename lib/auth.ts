// lib/auth.ts
export type User = {
  id: string;
  name: string;
  email: string;
};

export const USERS: User[] = [
  { id: "u1", name: "Joshua Alvarez", email: "JAlvarez91@my.gcu.edu" },
  { id: "u2", name: "Nathan Kennedy", email: "NKennedy13@my.gcu.edu" },
  { id: "u3", name: "Ryder Englert", email: "REnglert@my.gcu.edu" },
  { id: "u4", name: "Kenton Sisler", email: "KSisler@my.gcu.edu"},
];

// Token will be the userId for now (u1/u2/u3/u4).
// Later: token becomes a JWT from FastAPI.
export function userFromToken(token: string | undefined): User | null {
  if (!token) return null;
  return USERS.find((u) => u.id === token) ?? null;
}
