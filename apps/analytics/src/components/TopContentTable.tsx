import { useState, useMemo } from "react";
import styles from "./TopContentTable.module.css";

interface ContentRow {
  title: string;
  slug: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  bounceRate: string;
  trend: "up" | "down";
}

const initialRows: ContentRow[] = [
  { title: "Getting Started with Headless CMS", slug: "getting-started-headless-cms", views: 84320, uniqueVisitors: 61200, avgTimeOnPage: "5m 12s", bounceRate: "28%", trend: "up" },
  { title: "Multi-Tenant Design Patterns", slug: "multi-tenant-design-patterns", views: 61890, uniqueVisitors: 44100, avgTimeOnPage: "4m 48s", bounceRate: "32%", trend: "up" },
  { title: "Microfrontend Communication", slug: "microfrontend-communication", views: 58200, uniqueVisitors: 38900, avgTimeOnPage: "6m 01s", bounceRate: "24%", trend: "down" },
  { title: "Module Federation Internals", slug: "module-federation-internals", views: 41500, uniqueVisitors: 29300, avgTimeOnPage: "7m 15s", bounceRate: "21%", trend: "up" },
  { title: "Single-SPA Architecture Guide", slug: "single-spa-architecture-guide", views: 37800, uniqueVisitors: 26100, avgTimeOnPage: "5m 33s", bounceRate: "35%", trend: "down" },
];

export function TopContentTable() {
  const [sortKey, setSortKey] = useState<keyof ContentRow>("views");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedRows = useMemo(() => {
    return [...initialRows].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: keyof ContentRow) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="framework-badge framework-badge--react mb-4 italic">React useMemo Sorting</div>
      <table className={styles.table} aria-label="Top performing content">
        <thead>
          <tr>
            <th onClick={() => toggleSort("title")} style={{ cursor: 'pointer' }}>Title</th>
            <th onClick={() => toggleSort("views")} style={{ cursor: 'pointer' }}>Views</th>
            <th onClick={() => toggleSort("uniqueVisitors")} style={{ cursor: 'pointer' }}>Uniques</th>
            <th>Avg. Time</th>
            <th>Bounce Rate</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr key={row.slug} className={styles.row}>
              <td>
                <span className={styles.contentTitle}>{row.title}</span>
                <span className={styles.contentSlug}>/{row.slug}</span>
              </td>
              <td className={styles.numeric}>{row.views.toLocaleString()}</td>
              <td className={styles.numeric}>{row.uniqueVisitors.toLocaleString()}</td>
              <td className={styles.numeric}>{row.avgTimeOnPage}</td>
              <td className={styles.numeric}>{row.bounceRate}</td>
              <td>
                <span className={`${styles.trendBadge} ${styles[`trend--${row.trend}`]}`}>
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
