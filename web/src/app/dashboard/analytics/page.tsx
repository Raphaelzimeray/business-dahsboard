import TrafficChart from "@/components/charts/TrafficChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          High-level metrics and performance overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-sm text-gray-500">Conversion rate</div>
          <div className="text-2xl font-bold mt-2">3.42%</div>
          <div className="text-xs text-gray-400 mt-2">+0.31% vs last week</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-sm text-gray-500">Avg. session</div>
          <div className="text-2xl font-bold mt-2">4m 12s</div>
          <div className="text-xs text-gray-400 mt-2">Stable</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-sm text-gray-500">Bounce rate</div>
          <div className="text-2xl font-bold mt-2">38%</div>
          <div className="text-xs text-gray-400 mt-2">-2% vs last week</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Traffic (demo)</h2>
          <span className="text-xs text-gray-400">Last 7 days</span>
        </div>
        <div className="mt-4">
          <TrafficChart />
        </div>
      </div>
    </div>
  );
}
