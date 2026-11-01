import { PageMeta } from "@/components/shared/page-meta";
import { useTranslations } from "@/i18n";

const readings = [
  {
    key: "ph",
    value: "6.2",
    unit: "pH",
    range: "5.5–6.5",
    fill: "w-3/4",
    color: "bg-emerald-500",
  },
  {
    key: "tds",
    value: "840",
    unit: "PPM",
    range: "700–900 PPM",
    fill: "w-2/3",
    color: "bg-teal-500",
  },
  {
    key: "waterTemperature",
    value: "22.4",
    unit: "°C",
    range: "18–24 °C",
    fill: "w-3/4",
    color: "bg-sky-500",
  },
  {
    key: "humidity",
    value: "68",
    unit: "%",
    range: "60–75%",
    fill: "w-2/3",
    color: "bg-cyan-500",
  },
] as const;

export default function MonitoringPage() {
  const t = useTranslations();

  return (
    <>
      <PageMeta
        title={t("hydroponicMonitoring.title")}
        description={t("hydroponicMonitoring.description")}
      />
      <main className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("hydroponicMonitoring.title")}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("hydroponicMonitoring.subtitle")}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {t("hydroponicMonitoring.demoData")}
          </span>
        </header>

        <section aria-labelledby="readings-heading" className="space-y-3">
          <h2
            id="readings-heading"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t("hydroponicMonitoring.readings")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {readings.map((reading) => (
              <article
                key={reading.key}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t(`hydroSmartDashboard.metrics.${reading.key}`)}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {t("hydroponicMonitoring.optimal")}
                  </span>
                </div>
                <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
                  {reading.value}
                  <span className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {reading.unit}
                  </span>
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className={`h-full rounded-full ${reading.fill} ${reading.color}`}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {t("hydroponicMonitoring.targetRange")}: {reading.range}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("hydroponicMonitoring.systemStatus")}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("hydroponicMonitoring.systemStatusDescription")}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500" />
              {t("hydroponicMonitoring.stable")}
            </span>
          </div>
          <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {t("hydroponicMonitoring.sampleNotice")}
          </p>
        </section>
      </main>
    </>
  );
}
