// app/data/page.tsx

// notes:
// postion > calibration

// app/data/page.tsx

// This page is rendered at route "/data".
// It is wrapped by app/layout.tsx, so the Sidebar still appears on the left.
export default function DataPage() {
  return (
    <main className="p-8 space-y-4">
      {/* Simple header so you can verify routing works */}
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
        Data
      </h1>

      <p className="text-sm text-slate-600">
        This is the Data page. In the future, this will show session history,
        exports, and detailed analytics.
      </p>
    </main>
  );
}
