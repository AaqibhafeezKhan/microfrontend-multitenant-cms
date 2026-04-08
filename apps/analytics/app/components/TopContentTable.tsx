import styles from "./TopContentTable.module.css";

const s = styles || ({} as any);

interface ContentRow {
  title: string;
  slug: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  bounceRate: string;
  trend: "up" | "down";
}

const rows: ContentRow[] = [
  { title: "Getting Started with Headless CMS", slug: "getting-started-headless-cms", views: 84320, uniqueVisitors: 61200, avgTimeOnPage: "5m 12s", bounceRate: "28%", trend: "up" },
  { title: "Multi-Tenant Design Patterns", slug: "multi-tenant-design-patterns", views: 61890, uniqueVisitors: 44100, avgTimeOnPage: "4m 48s", bounceRate: "32%", trend: "up" },
  { title: "Microfrontend Communication", slug: "microfrontend-communication", views: 58200, uniqueVisitors: 38900, avgTimeOnPage: "6m 01s", bounceRate: "24%", trend: "down" },
  { title: "Module Federation Internals", slug: "module-federation-internals", views: 41500, uniqueVisitors: 29300, avgTimeOnPage: "7m 15s", bounceRate: "21%", trend: "up" },
  { title: "Single-SPA Architecture Guide", slug: "single-spa-architecture-guide", views: 37800, uniqueVisitors: 26100, avgTimeOnPage: "5m 33s", bounceRate: "35%", trend: "down" },
];

export function TopContentTable() {
  return (
    <div className={s.wrapper}>
      <table className={s.table} aria-label="Top performing content">
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Unique Visitors</th>
            <th>Avg. Time</th>
            <th>Bounce Rate</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.slug} className={s.row}>
              <td>
                <span className={s.contentTitle}>{row.title}</span>
                <span className={s.contentSlug}>/{row.slug}</span>
              </td>
              <td className={s.numeric}>{row.views.toLocaleString()}</td>
              <td className={s.numeric}>{row.uniqueVisitors.toLocaleString()}</td>
              <td className={s.numeric}>{row.avgTimeOnPage}</td>
              <td className={s.numeric}>{row.bounceRate}</td>
              <td>
                <span className={`${s.trendBadge} ${s[`trend--${row.trend}`]}`}>
                  {row.trend === "up" ? "Up" : "Down"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
