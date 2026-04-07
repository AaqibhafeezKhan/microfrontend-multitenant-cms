import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const visitorData = [
  { name: "Organic Search", value: 48200 },
  { name: "Direct", value: 28100 },
  { name: "Social Media", value: 19400 },
  { name: "Email", value: 12600 },
  { name: "Referral", value: 8900 },
];

const engagementData = [
  { name: "Organic Search", value: 420 },
  { name: "Direct", value: 310 },
  { name: "Social Media", value: 240 },
  { name: "Email", value: 180 },
  { name: "Referral", value: 120 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"];

export function AudienceChart() {
  const [metric, setMetric] = useState<"visitors" | "engagement">("visitors");
  const activeData = metric === "visitors" ? visitorData : engagementData;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
        <button 
          onClick={() => setMetric("visitors")}
          style={{ 
            fontSize: 10, padding: "2px 8px", borderRadius: 4, 
            background: metric === "visitors" ? "#6366f1" : "transparent",
            color: metric === "visitors" ? "#fff" : "#94a3b8",
            border: "1px solid #6366f1", cursor: "pointer"
          }}
        >
          Visitors
        </button>
        <button 
          onClick={() => setMetric("engagement")}
          style={{ 
            fontSize: 10, padding: "2px 8px", borderRadius: 4, 
            background: metric === "engagement" ? "#6366f1" : "transparent",
            color: metric === "engagement" ? "#fff" : "#94a3b8",
            border: "1px solid #6366f1", cursor: "pointer"
          }}
        >
          Engagement
        </button>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {activeData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#e2e8f0", fontSize: 10 }}
          />
          <Legend
            formatter={(value: string) => <span style={{ color: "#94a3b8", fontSize: 10 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
