import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mar 1", views: 28400 },
  { date: "Mar 5", views: 34200 },
  { date: "Mar 9", views: 31800 },
  { date: "Mar 13", views: 42100 },
  { date: "Mar 17", views: 38900 },
  { date: "Mar 21", views: 51200 },
  { date: "Mar 25", views: 47600 },
  { date: "Mar 29", views: 58300 },
  { date: "Apr 1", views: 62100 },
  { date: "Apr 5", views: 59800 },
];

export function PageviewsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="pageviewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#pageviewsGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
