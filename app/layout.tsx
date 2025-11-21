// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynchroMotion Dashboard",
  description: "Performance tracking dashboard for SynchroMotion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar />
            <SidebarInset className="bg-background">
              <div className="flex min-h-screen flex-col">
                <header className="flex h-16 items-center gap-3 border-b px-6 md:hidden">
                  <SidebarTrigger className="-ml-2 text-foreground" />
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    SynchroMotion Performance Trackers
                  </p>
                </header>
                  <div className="flex-1 px-6">                                    
                    <div className="mx-auto w-full max-w-6xl">{children}</div>          
                  </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
