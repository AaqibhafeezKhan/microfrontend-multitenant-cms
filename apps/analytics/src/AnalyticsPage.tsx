import React from "react";
import { OverviewMetrics } from "./components/OverviewMetrics";
import { PageviewsChart } from "./components/PageviewsChart";
import { TopContentTable } from "./components/TopContentTable";
import { AudienceChart } from "./components/AudienceChart";

// Fallback styles since we aren't using next.js modules here
const styles = {
  page: "analytics-page space-y-8",
  header: "analytics-header space-y-2",
  title: "text-3xl font-bold tracking-tight",
  subtitle: "text-slate-500",
  dateRange: "flex items-center gap-2",
  dateLabel: "text-sm font-medium",
  metricsRow: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
  chartsGrid: "grid gap-6 md:grid-cols-2",
  chartCard: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
  chartTitle: "text-sm font-semibold mb-4 text-slate-700",
  tableSection: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
  sectionTitle: "text-xl font-bold mb-6",
};

export default function AnalyticsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>Content performance and audience insights</p>
        <div className={styles.dateRange}>
          <span className={styles.dateLabel}>Last 30 days</span>
        </div>
      </header>

      <section className={styles.metricsRow}>
        <OverviewMetrics />
      </section>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Pageviews Over Time</h2>
          <PageviewsChart />
        </div>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Audience by Channel</h2>
          <AudienceChart />
        </div>
      </div>

      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Top Performing Content</h2>
        <TopContentTable />
      </section>
    </main>
  );
}
