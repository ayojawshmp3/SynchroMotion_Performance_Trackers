// app/settings/page.tsx

// This page is rendered at route "/settings".
export default function SettingsPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        Settings
      </h1>

      <p className="text-sm text-slate-600">
        This is the Settings page. Eventually you can configure user profile,
        device preferences, and measurement units here.
      </p>
    </main>
  );
}