import { PageMeta } from "@/components/shared/page-meta";
import { useTranslations } from "@/i18n";

const gradeRecords = [
  { plant: "LT-001", capturedAt: "2026-11-03 09:15", grade: "A" },
  { plant: "LT-002", capturedAt: "2026-11-03 09:18", grade: "A" },
  { plant: "LT-003", capturedAt: "2026-11-03 09:21", grade: "B" },
  { plant: "LT-004", capturedAt: "2026-11-03 09:24", grade: "A" },
  { plant: "LT-005", capturedAt: "2026-11-03 09:27", grade: "C" },
  { plant: "LT-006", capturedAt: "2026-11-03 09:30", grade: "B" },
] as const;

const sensorRecords = [
  {
    date: "2026-10-28",
    ph: 6.1,
    tds: 810,
    temperature: 22.1,
    humidity: 66,
    growthDays: 27,
  },
  {
    date: "2026-10-29",
    ph: 6.2,
    tds: 820,
    temperature: 22.3,
    humidity: 67,
    growthDays: 28,
  },
  {
    date: "2026-10-30",
    ph: 6.0,
    tds: 830,
    temperature: 22.0,
    humidity: 65,
    growthDays: 29,
  },
  {
    date: "2026-10-31",
    ph: 6.2,
    tds: 835,
    temperature: 22.2,
    humidity: 68,
    growthDays: 30,
  },
  {
    date: "2026-11-01",
    ph: 6.3,
    tds: 840,
    temperature: 22.4,
    humidity: 69,
    growthDays: 31,
  },
  {
    date: "2026-11-02",
    ph: 6.2,
    tds: 845,
    temperature: 22.1,
    humidity: 67,
    growthDays: 32,
  },
  {
    date: "2026-11-03",
    ph: 6.2,
    tds: 840,
    temperature: 22.4,
    humidity: 68,
    growthDays: 33,
  },
] as const;

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function ExportButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
    >
      {label}
    </button>
  );
}

export default function ReportsPage() {
  const t = useTranslations();
  const headerCell =
    "px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";
  const bodyCell =
    "whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300";
  const panel =
    "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900";

  const exportGrades = () =>
    downloadCsv("hydrosmart-arsip-grade.csv", [
      [
        t("reports.gradeColumns.plant"),
        t("reports.gradeColumns.capturedAt"),
        t("reports.gradeColumns.grade"),
      ],
      ...gradeRecords.map((record) => [
        record.plant,
        record.capturedAt,
        record.grade,
      ]),
    ]);
  const exportSensors = () =>
    downloadCsv("hydrosmart-arsip-sensor-harian.csv", [
      [
        t("reports.sensorColumns.date"),
        t("reports.sensorColumns.ph"),
        t("reports.sensorColumns.tds"),
        t("reports.sensorColumns.temperature"),
        t("reports.sensorColumns.humidity"),
        t("reports.sensorColumns.growthDays"),
      ],
      ...sensorRecords.map((record) => [
        record.date,
        record.ph,
        record.tds,
        record.temperature,
        record.humidity,
        record.growthDays,
      ]),
    ]);

  return (
    <>
      <PageMeta
        title={t("reports.title")}
        description={t("reports.description")}
      />
      <main className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("reports.title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("reports.description")}
          </p>
        </header>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {t("reports.demoNotice")}
        </div>

        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {t("reports.gradeTitle")}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("reports.gradeDescription")}
              </p>
            </div>
            <ExportButton
              label={t("reports.exportGrades")}
              onClick={exportGrades}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className={headerCell}>
                    {t("reports.gradeColumns.plant")}
                  </th>
                  <th className={headerCell}>
                    {t("reports.gradeColumns.capturedAt")}
                  </th>
                  <th className={headerCell}>
                    {t("reports.gradeColumns.grade")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradeRecords.map((record) => (
                  <tr
                    key={record.plant}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className={`${bodyCell} font-medium`}>
                      {record.plant}
                    </td>
                    <td className={bodyCell}>{record.capturedAt}</td>
                    <td className={bodyCell}>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {record.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {t("reports.sensorTitle")}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("reports.sensorDescription")}
              </p>
            </div>
            <ExportButton
              label={t("reports.exportSensors")}
              onClick={exportSensors}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  {(
                    [
                      "date",
                      "ph",
                      "tds",
                      "temperature",
                      "humidity",
                      "growthDays",
                    ] as const
                  ).map((column) => (
                    <th key={column} className={headerCell}>
                      {t(`reports.sensorColumns.${column}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sensorRecords.map((record) => (
                  <tr
                    key={record.date}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className={bodyCell}>{record.date}</td>
                    <td className={bodyCell}>{record.ph}</td>
                    <td className={bodyCell}>{record.tds}</td>
                    <td className={bodyCell}>{record.temperature} °C</td>
                    <td className={bodyCell}>{record.humidity}%</td>
                    <td className={bodyCell}>{record.growthDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
