import { OverviewMetrics } from "./components/OverviewMetrics";
import { PageviewsChart } from "./components/PageviewsChart";
import { TopContentTable } from "./components/TopContentTable";
import { AudienceChart } from "./components/AudienceChart";
import styles from "./page.module.css";

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
