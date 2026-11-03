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
    id: "LT-001",
    plantedAt: "2026-10-01",
    stage: "headFormation",
    status: "ready",
  },
  {
    id: "LT-002",
    plantedAt: "2026-10-03",
    stage: "headFormation",
    status: "ready",
  },
  {
    id: "LT-003",
    plantedAt: "2026-10-08",
    stage: "vegetative",
    status: "growing",
  },
  {
    id: "LT-004",
    plantedAt: "2026-10-11",
    stage: "vegetative",
    status: "growing",
  },
  {
    id: "LT-005",
    plantedAt: "2026-10-15",
    stage: "vegetative",
    status: "growing",
  },
  {
    id: "LT-006",
    plantedAt: "2026-10-19",
    stage: "seedling",
    status: "growing",
  },
] as const;

export default function PlantTable() {
  const t = useTranslations();
  const locale = useLocale();
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));

  return (
    <section
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
      aria-labelledby="plant-table-heading"
    >
      <div className="border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
        <h2
          id="plant-table-heading"
          className="font-semibold text-gray-900 dark:text-white"
        >
          {t("hydroponicMonitoring.plantTableTitle")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("hydroponicMonitoring.plantTableSubtitle")}
        </p>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              {(
                ["plantNumber", "plantedAt", "growthStage", "status"] as const
              ).map((column) => (
                <TableCell
                  key={column}
                  isHeader
                  className="px-5 py-3 text-start text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                >
                  {t(`hydroponicMonitoring.plantColumns.${column}`)}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant) => (
              <TableRow
                key={plant.id}
                className="border-t border-gray-100 dark:border-gray-800"
              >
                <TableCell className="px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-white/90">
                  {plant.id}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(plant.plantedAt)}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-300">
                  {t(`hydroponicMonitoring.growthStages.${plant.stage}`)}
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${plant.status === "ready" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"}`}
                  >
                    {t(`hydroponicMonitoring.plantStatuses.${plant.status}`)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
