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
    <main className="space-y-6 p-8">
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl tracking-tight">Data</CardTitle>
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
