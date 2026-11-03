import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@/contexts";
import { useTranslations } from "@/i18n";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const series = [
  {
    key: "ph",
    values: [5.9, 6.0, 6.1, 6.2, 6.3, 6.2, 6.2],
    min: 5.5,
    max: 6.5,
    color: "#10b981",
  },
  {
    key: "tds",
    values: [780, 800, 815, 830, 850, 845, 840],
    min: 700,
    max: 900,
    color: "#0d9488",
  },
  {
    key: "waterTemperature",
    values: [21.2, 21.6, 22.0, 22.3, 22.7, 22.5, 22.4],
    min: 18,
    max: 24,
    color: "#0284c7",
  },
  {
    key: "humidity",
    values: [64, 66, 65, 69, 71, 70, 68],
    min: 60,
    max: 75,
    color: "#0891b2",
  },
] as const;

export default function EnvironmentStatisticsChart() {
  const { theme } = useTheme();
  const t = useTranslations();
  const colors = series.map((item) => item.color);
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 320,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      zoom: { enabled: false },
    },
    colors,
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.16, opacityTo: 0.02 },
    },
    markers: { size: 3, strokeWidth: 0, hover: { size: 5 } },
    grid: {
      borderColor: theme === "dark" ? "#1E2640" : "#F3F4F6",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: theme === "dark" ? "#94A3B8" : "#6B7280",
          fontFamily: "Outfit, sans-serif",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (value) => `${Math.round(value)}%`,
        style: {
          colors: theme === "dark" ? "#94A3B8" : "#6B7280",
          fontFamily: "Outfit, sans-serif",
        },
      },
      title: { text: t("hydroSmartDashboard.normalizedScale") },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      labels: { colors: theme === "dark" ? "#D1D5DB" : "#4B5563" },
      markers: { size: 7 },
      itemMargin: { horizontal: 12 },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ dataPointIndex }) => {
        const rows = series
          .map((item) => {
            const value = item.values[dataPointIndex];
            const label = t(`hydroSmartDashboard.metrics.${item.key}`);
            const unit =
              item.key === "ph"
                ? "pH"
                : item.key === "tds"
                  ? "PPM"
                  : item.key === "waterTemperature"
                    ? "°C"
                    : "%";
            return `<div class="flex items-center justify-between gap-5 text-xs"><span>${label}</span><strong>${value} ${unit}</strong></div>`;
          })
          .join("");
        return `<div class="space-y-1 rounded-lg bg-white px-3 py-2 text-gray-700 shadow-theme-sm dark:bg-gray-900 dark:text-gray-200"><p class="mb-2 text-xs text-gray-400">${days[dataPointIndex]}</p>${rows}</div>`;
      },
    },
  };
  const chartSeries = series.map((item) => ({
    name: `${t(`hydroSmartDashboard.metrics.${item.key}`)} (${item.key === "ph" ? "pH" : item.key === "tds" ? "PPM" : item.key === "waterTemperature" ? "°C" : "%"})`,
    data: item.values.map((value) =>
      Number((((value - item.min) / (item.max - item.min)) * 100).toFixed(1)),
    ),
  }));

  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900"
      aria-labelledby="environment-chart-heading"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="environment-chart-heading"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t("hydroSmartDashboard.chartTitle")}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("hydroSmartDashboard.chartSubtitle")}
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
          {t("hydroSmartDashboard.demoData")}
        </span>
      </div>
      <ReactApexChart
        options={options}
        series={chartSeries}
        type="area"
        height={320}
      />
    </section>
  );
}
