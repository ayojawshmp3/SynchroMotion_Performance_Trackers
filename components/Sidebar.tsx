// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Data", href: "/data" },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-gradient-to-b from-emerald-700 to-emerald-500 text-white shadow-xl">
      {/* Logo / brand */}
      <div className="flex items-center justify-center h-24 border-b border-white/10">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.35em]">SynchroMotion</div>
          <div className="text-sm font-semibold">Performance Trackers</div>
        </div>
      </div>

      {/* User area */}
      <div className="flex flex-col items-center py-6 border-b border-white/10">
        <div className="h-16 w-16 rounded-full bg-white/20" />
        <p className="mt-2 text-sm font-medium">Chester Stone</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition
                ${isActive ? "bg-white text-emerald-700 font-semibold" : "hover:bg-white/10"}
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button className="w-full rounded-lg border border-white/30 px-3 py-2 text-sm hover:bg-white/10">
          Log out
        </button>
      </div>
    </aside>
  );
}