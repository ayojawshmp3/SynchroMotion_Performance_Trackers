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
    <main className="space-y-6 p-8">
      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Help & Support
          </CardTitle>
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
