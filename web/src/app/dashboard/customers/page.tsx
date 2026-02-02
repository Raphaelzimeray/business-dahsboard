export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">
          Customer list (demo data).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b text-sm font-medium text-gray-700">
          Recent customers
        </div>
        <div className="divide-y">
          {[
            { name: "Alice Martin", email: "alice@company.com", plan: "Pro" },
            { name: "Bruno Dupont", email: "bruno@startup.io", plan: "Basic" },
            { name: "Carla Rossi", email: "carla@agency.ch", plan: "Pro" },
          ].map((c) => (
            <div key={c.email} className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-gray-500">{c.email}</div>
              </div>
              <div className="text-xs text-gray-500">{c.plan}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
