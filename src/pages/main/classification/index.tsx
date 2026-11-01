import { PageMeta } from "@/components/shared/page-meta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocale, useTranslations } from "@/i18n";

const plants = [
  {
    number: "LT-001",
    capturedAt: "2026-10-28",
    grade: "A",
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    art: "bg-lime-50 dark:bg-lime-950/40",
  },
  {
    number: "LT-002",
    capturedAt: "2026-10-29",
    grade: "A",
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    art: "bg-green-50 dark:bg-green-950/40",
  },
  {
    number: "LT-003",
    capturedAt: "2026-10-29",
    grade: "B",
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    art: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    number: "LT-004",
    capturedAt: "2026-10-30",
    grade: "A",
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    art: "bg-lime-50 dark:bg-lime-950/40",
  },
  {
    number: "LT-005",
    capturedAt: "2026-10-30",
    grade: "C",
    tone: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
    art: "bg-teal-50 dark:bg-teal-950/40",
  },
  {
    number: "LT-006",
    capturedAt: "2026-10-31",
    grade: "B",
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    art: "bg-green-50 dark:bg-green-950/40",
  },
  {
    number: "LT-007",
    capturedAt: "2026-10-31",
    grade: "A",
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    art: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    number: "LT-008",
    capturedAt: "2026-11-01",
    grade: "B",
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    art: "bg-lime-50 dark:bg-lime-950/40",
  },
] as const;

export default function ClassificationPage() {
  const t = useTranslations();
  const locale = useLocale();
  const countByGrade = (grade: string) =>
    plants.filter((plant) => plant.grade === grade).length;

  return (
    <>
      <PageMeta
        title={t("lettuceClassification.title")}
        description={t("lettuceClassification.description")}
      />
      <main className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("lettuceClassification.title")}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("lettuceClassification.subtitle")}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {t("lettuceClassification.demoData")}
          </span>
        </header>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-4"
          aria-label={t("lettuceClassification.summary")}
        >
          {(["A", "B", "C"] as const).map((grade) => (
            <article
              key={grade}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t(`lettuceClassification.grade${grade}`)}
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {countByGrade(grade)}
              </p>
            </article>
          ))}
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t("lettuceClassification.totalPlants")}
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {plants.length}
            </p>
          </article>
        </section>

        <section
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
          aria-label={t("lettuceClassification.tableTitle")}
        >
          <div className="border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {t("lettuceClassification.tableTitle")}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("lettuceClassification.tableDescription")}
            </p>
          </div>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                  >
                    {t("lettuceClassification.plantNumber")}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                  >
                    {t("lettuceClassification.plantImage")}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                  >
                    {t("lettuceClassification.grade")}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                  >
                    {t("lettuceClassification.capturedAt")}
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plants.map((plant) => (
                  <TableRow
                    key={plant.number}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-white/90">
                      {plant.number}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <div
                        role="img"
                        aria-label={t(
                          "lettuceClassification.lettuceIllustration",
                        )}
                        className={`flex size-14 items-center justify-center rounded-xl text-3xl ${plant.art}`}
                      >
                        🥬
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <span
                        className={`inline-flex min-w-16 items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${plant.tone}`}
                      >
                        {t(`lettuceClassification.grade${plant.grade}`)}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-300">
                      {new Intl.DateTimeFormat(locale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(`${plant.capturedAt}T00:00:00Z`))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
}
