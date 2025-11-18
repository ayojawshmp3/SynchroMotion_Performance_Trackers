// app/settings/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This page is rendered at route "/settings".
export default function SettingsPage() {
  return (
    <main className="space-y-6 p-8">
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Settings
          </CardTitle>
          <CardDescription>
            Configure user profiles, device preferences, and measurement units here soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Keep this area reserved for forms, toggles, and tabs once you start
            wiring up real settings with other shadcn components.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
