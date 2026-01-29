// app/help/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This page is rendered at route "/help".
export default function HelpPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col space-y-6 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Help & Support
        </h1>
      </header>

      {/* Main Section */}
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardDescription>
            Add FAQs, contact information, and troubleshooting guides for SynchroMotion here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            For now this is a placeholder page, but you can keep the structure and drop in accordions,
            tabs, or knowledge base links built with other shadcn components when you are ready.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
