// app/data/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// notes:
// postion > calibration

// This page is rendered at route "/data".
// It is wrapped by app/layout.tsx, so the Sidebar still appears on the left.
export default function DataPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col space-y-6 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Data
        </h1>
      </header>

      {/* Main Section */}
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardDescription>
            This area will surface session history, exports, and detailed analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use this section to plug in tables, charts, and CSV downloads once your
            telemetry pipeline is ready.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
