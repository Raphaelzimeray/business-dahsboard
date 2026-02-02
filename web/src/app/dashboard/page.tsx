import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Revenue</h3>
        <p className="text-2xl font-bold mt-2">$12,450</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Users</h3>
        <p className="text-2xl font-bold mt-2">1,284</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Orders</h3>
        <p className="text-2xl font-bold mt-2">342</p>
      </div>
      <RecentOrdersTable />
    </div>
  );
}
