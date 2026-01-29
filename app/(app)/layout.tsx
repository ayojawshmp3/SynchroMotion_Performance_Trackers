// app/(app)/layout.tsx
import Sidebar from "@/components/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Persistent sidebar (desktop) */}
      <Sidebar />

      {/* Inset is the main content area that sits to the right of the sidebar */}
      <SidebarInset className="bg-background">
        <div className="flex min-h-screen flex-col">
          {/* Mobile-only top header that toggles sidebar */}
          <header className="flex h-16 items-center gap-3 border-b px-6 md:hidden">
            <SidebarTrigger className="-ml-2 text-foreground" />
            <p className="text-sm font-semibold tracking-tight text-foreground">
              SynchroMotion Performance Trackers
            </p>
          </header>

          {/* Main content wrapper */}
          <div className="flex-1 px-6">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
