"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          if (alive) setUser(null);
          return;
        }

        const data = await res.json();
        if (alive && data.user) {
          setUser(data.user);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return { user, loading };
}
