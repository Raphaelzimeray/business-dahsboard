"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Point = {
  date: string;
  visits: number;
  signups: number;
};

const data: Point[] = [
  { date: "Mon", visits: 1200, signups: 90 },
  { date: "Tue", visits: 1800, signups: 130 },
  { date: "Wed", visits: 1500, signups: 110 },
  { date: "Thu", visits: 2100, signups: 170 },
  { date: "Fri", visits: 2400, signups: 210 },
  { date: "Sat", visits: 1900, signups: 160 },
  { date: "Sun", visits: 1600, signups: 120 },
];

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function TrafficChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickMargin={8} />
          <YAxis tickMargin={8} tickFormatter={formatNumber} />
        <Tooltip
            formatter={(value, name) => {
              const safe =
                typeof value === "number"
                  ? formatNumber(value)
                  : value == null
                    ? "-"
                    : String(value);

              const label = name === "visits" ? "Visits" : "Signups";
              return [safe, label] as const;
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="visits" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="signups" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
