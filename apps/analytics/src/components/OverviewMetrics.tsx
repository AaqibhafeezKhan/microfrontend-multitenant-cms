import styles from "./OverviewMetrics.module.css";

const s = styles || ({} as any);

interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
}

const metrics: Metric[] = [
  { label: "Total Pageviews", value: "1,284,320", delta: "+12.4%", trend: "up" },
  { label: "Unique Visitors", value: "348,901", delta: "+8.1%", trend: "up" },
  { label: "Avg. Session Duration", value: "4m 32s", delta: "-2.3%", trend: "down" },
  { label: "Bounce Rate", value: "38.7%", delta: "-4.1%", trend: "up" },
  { label: "Content Published", value: "247", delta: "+31", trend: "up" },
  { label: "Media Uploads", value: "1,089", delta: "+189", trend: "up" },
];

export function OverviewMetrics() {
  return (
    <div className={s.grid}>
      {metrics.map((metric) => (
        <div key={metric.label} className={s.card}>
          <p className={s.label}>{metric.label}</p>
          <p className={s.value}>{metric.value}</p>
          <span className={`${s.delta} ${s[`delta--${metric.trend}`]}`}>
            {metric.delta}
          </span>
        </div>
      ))}
    </div>
  );
}
