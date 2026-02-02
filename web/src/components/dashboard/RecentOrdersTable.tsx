type OrderStatus = "Paid" | "Pending" | "Refunded";

type Order = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

const ORDERS: Order[] = [
  {
    id: "ORD-1042",
    customer: "Alice Martin",
    email: "alice@company.com",
    amount: 1290,
    status: "Paid",
    date: "2026-02-01",
  },
  {
    id: "ORD-1041",
    customer: "Bruno Dupont",
    email: "bruno@startup.io",
    amount: 320,
    status: "Pending",
    date: "2026-01-31",
  },
  {
    id: "ORD-1040",
    customer: "Carla Rossi",
    email: "carla@agency.ch",
    amount: 890,
    status: "Paid",
    date: "2026-01-30",
  },
  {
    id: "ORD-1039",
    customer: "David Nguyen",
    email: "david@shop.com",
    amount: 75,
    status: "Refunded",
    date: "2026-01-29",
  },
];

function formatCHF(amount: number) {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";

  if (status === "Paid") return <span className={`${base} bg-emerald-50 text-emerald-700 border border-emerald-100`}>Paid</span>;
  if (status === "Pending") return <span className={`${base} bg-amber-50 text-amber-700 border border-amber-100`}>Pending</span>;
  return <span className={`${base} bg-zinc-100 text-zinc-700 border border-zinc-200`}>Refunded</span>;
}

export default function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Recent orders</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Demo data (table + statuses) — ready for real API integration.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-y">
            <tr className="text-left text-xs text-zinc-500">
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {ORDERS.map((o) => (
              <tr key={o.id} className="hover:bg-zinc-50/60">
                <td className="px-6 py-4 font-medium text-zinc-900">{o.id}</td>
                <td className="px-6 py-4">
                  <div className="text-zinc-900">{o.customer}</div>
                  <div className="text-xs text-zinc-500">{o.email}</div>
                </td>
                <td className="px-6 py-4">{formatCHF(o.amount)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-6 py-4 text-zinc-600">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
