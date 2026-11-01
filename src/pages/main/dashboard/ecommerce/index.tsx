import { PageMeta } from "@/components/shared/page-meta";
import { useTranslations } from "@/i18n";
import EnvironmentStatisticsChart from "./environment-statistics-chart";

const metrics = [
  {
    key: "ph",
    value: "6.2",
    unit: "pH",
    tone: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "tds",
    value: "840",
    unit: "PPM",
    tone: "text-teal-600 dark:text-teal-400",
  },
  {
    key: "waterTemperature",
    value: "22.4",
    unit: "°C",
    tone: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "humidity",
    value: "68",
    unit: "%",
    tone: "text-cyan-600 dark:text-cyan-400",
  },
  {
    key: "gradeA",
    value: "24",
    unit: "plants",
    tone: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "gradeB",
    value: "8",
    unit: "plants",
    tone: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "gradeC",
    value: "3",
    unit: "plants",
    tone: "text-rose-600 dark:text-rose-400",
  },
] as const;

export default function EcommercePage() {
  const t = useTranslations();

  return (
    <>
      <PageMeta
        title={t("hydroSmartDashboard.title")}
        description={t("hydroSmartDashboard.description")}
      />
      <main className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("hydroSmartDashboard.title")}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("hydroSmartDashboard.subtitle")}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {t("hydroSmartDashboard.demoData")}
          </span>
        </header>

        <section aria-labelledby="environment-heading" className="space-y-3">
          <h2
            id="environment-heading"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t("hydroSmartDashboard.environmentTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.slice(0, 4).map((metric) => (
              <article
                key={metric.key}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t(`hydroSmartDashboard.metrics.${metric.key}`)}
                </p>
                <p className={`mt-3 text-3xl font-semibold ${metric.tone}`}>
                  {metric.value}
                  <span className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {metric.unit}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <EnvironmentStatisticsChart />

        <section aria-labelledby="classification-heading" className="space-y-3">
          <h2
            id="classification-heading"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t("hydroSmartDashboard.classificationTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.slice(4).map((metric) => (
              <article
                key={metric.key}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t(`hydroSmartDashboard.metrics.${metric.key}`)}
                </p>
                <p className={`mt-3 text-3xl font-semibold ${metric.tone}`}>
                  {metric.value}
                  <span className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t("hydroSmartDashboard.plants")}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
