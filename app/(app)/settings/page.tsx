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
    <main className="mx-auto flex w-full max-w-4xl flex-col space-y-6 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
      </header>

      {/* Main Section */}
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
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
