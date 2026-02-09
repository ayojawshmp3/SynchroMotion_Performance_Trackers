"use client";

import React, { createContext, useContext } from "react";
import { useActiveSession } from "@/hooks/useActiveSession";

const ActiveSessionContext = createContext<ReturnType<typeof useActiveSession> | null>(null);

export function ActiveSessionProvider({ children }: { children: React.ReactNode }) {
  const value = useActiveSession();
  return (
    <ActiveSessionContext.Provider value={value}>
      {children}
    </ActiveSessionContext.Provider>
  );
}

export function useActiveSessionCtx() {
  const ctx = useContext(ActiveSessionContext);
  if (!ctx) throw new Error("useActiveSessionCtx must be used inside ActiveSessionProvider");
  return ctx;
}
