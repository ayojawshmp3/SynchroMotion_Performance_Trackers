// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";
import { useMe } from "@/hooks/useMe";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Data", href: "/data" },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useMe();

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") ?? "??";

  return (
    <UISidebar
      className="border-none"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklch, var(--sidebar) 90%, white 10%), color-mix(in oklch, var(--sidebar) 80%, black 20%))",
      }}
    >
      <div className="flex h-full flex-col text-sidebar-foreground shadow-xl">
        <SidebarHeader className="border-sidebar-border px-2 py-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-sidebar-foreground/80">
            SynchroMotion
          </p>
          <p className="text-sm font-semibold">Performance Trackers</p>
        </SidebarHeader>

        <SidebarContent className="flex flex-1 flex-col p-0">
          <div className="flex flex-col items-center border-b border-sidebar-border px-6 py-6">
            <Avatar className="size-16 border-2 border-sidebar-foreground/30 bg-sidebar-foreground/10">
              <AvatarFallback className="bg-transparent text-base font-semibold text-sidebar-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
              <p className="mt-2 text-sm font-medium">
                {loading ? "Loading..." : user?.name}
              </p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>

          <SidebarGroup className="flex-1 p-0">
            <SidebarGroupContent className="px-4 py-4">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground/80",
                        "transition hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
                        "data-[active=true]:bg-black data-[active=true]:text-white",
                        "dark:data-[active=true]:bg-white dark:data-[active=true]:text-black"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator className="bg-sidebar-border/60" />

        <SidebarFooter className="px-4 pb-6">
          <Button
            variant="outline"
            className="w-full border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-foreground/10"
            onClick={async () => {
              try {
                // 1) Clear any in-progress "active session" state (server-side)
                await fetch("/api/session/active", {
                  method: "DELETE",
                  credentials: "include",
                });

                // 2) Clear auth cookie
                await fetch("/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
              } finally {
                // 3) Navigate back to login no matter what
                router.replace("/login");
                router.refresh();
              }
            }}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </SidebarFooter>
      </div>
    </UISidebar>
  );
}
