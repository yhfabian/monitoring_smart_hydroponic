import { useEffect, useState } from "react";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@/contexts";
import { useTranslations } from "@/i18n";

interface HistoryRecord {
  timestamp: string;
  temperature: number;
  humidity: number;
  tds: number;
  ph: number;
}

export default function EnvironmentStatisticsChart() {
  const { theme } = useTheme();
  const t = useTranslations();
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/sensors/history?limit=15");
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && Array.isArray(json.history)) {
        setHistory(json.history);
      }
    } catch (e) {
      console.error("Gagal mengambil riwayat chart:", e);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = history.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  // Konfigurasi Bounding & Warna Berbeda Tegas
  const METRIC_CONFIG = {
    ph: { label: "pH Level", unit: "pH", color: "#10b981", defaultMin: 4, defaultMax: 10 },
    tds: { label: "TDS / Nutrient", unit: "PPM", color: "#f59e0b", defaultMin: 0, defaultMax: 1000 },
    temp: { label: "Water Temp", unit: "°C", color: "#3b82f6", defaultMin: 15, defaultMax: 40 },
    humidity: { label: "Humidity", unit: "%", color: "#06b6d4", defaultMin: 30, defaultMax: 100 },
  };

  // Helper Normalisasi Dinamis agar perubahan kecil sensor terlihat bergelombang
  const getNormalizedData = (
    rawData: number[],
    defaultMin: number,
    defaultMax: number
  ) => {
    if (rawData.length === 0) return [];

    const dataMin = Math.min(...rawData);
    const dataMax = Math.max(...rawData);

    let min = defaultMin;
    let max = defaultMax;

    if (dataMax - dataMin > 0.01) {
      const padding = (dataMax - dataMin) * 0.2;
      min = dataMin - padding;
      max = dataMax + padding;
    }

    return rawData.map((val) => {
      const norm = ((val - min) / (max - min)) * 100;
      return Number(Math.max(0, Math.min(100, norm)).toFixed(1));
    });
  };

  const rawPh = history.map((h) => h.ph ?? 0);
  const rawTds = history.map((h) => h.tds ?? 0);
  const rawTemp = history.map((h) => h.temperature ?? 0);
  const rawHum = history.map((h) => h.humidity ?? 0);

  const seriesData = [
    {
      name: `${METRIC_CONFIG.ph.label} (${METRIC_CONFIG.ph.unit})`,
      data: getNormalizedData(rawPh, METRIC_CONFIG.ph.defaultMin, METRIC_CONFIG.ph.defaultMax),
    },
    {
      name: `${METRIC_CONFIG.tds.label} (${METRIC_CONFIG.tds.unit})`,
      data: getNormalizedData(rawTds, METRIC_CONFIG.tds.defaultMin, METRIC_CONFIG.tds.defaultMax),
    },
    {
      name: `${METRIC_CONFIG.temp.label} (${METRIC_CONFIG.temp.unit})`,
      data: getNormalizedData(rawTemp, METRIC_CONFIG.temp.defaultMin, METRIC_CONFIG.temp.defaultMax),
    },
    {
      name: `${METRIC_CONFIG.humidity.label} (${METRIC_CONFIG.humidity.unit})`,
      data: getNormalizedData(rawHum, METRIC_CONFIG.humidity.defaultMin, METRIC_CONFIG.humidity.defaultMax),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 1000 },
      },
    },
    colors: [
      METRIC_CONFIG.ph.color,
      METRIC_CONFIG.tds.color,
      METRIC_CONFIG.temp.color,
      METRIC_CONFIG.humidity.color,
    ],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    markers: { size: 3.5, strokeWidth: 0, hover: { size: 6 } },
    grid: {
      borderColor: theme === "dark" ? "#1E2640" : "#F3F4F6",
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: theme === "dark" ? "#94A3B8" : "#6B7280",
          fontFamily: "Outfit, sans-serif",
          fontSize: "11px",
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
        formatter: (val) => `${Math.round(val)}%`,
        style: {
          colors: theme === "dark" ? "#94A3B8" : "#6B7280",
          fontFamily: "Outfit, sans-serif",
        },
      },
      title: {
        text: "Relative Scale (%)",
        style: {
          color: theme === "dark" ? "#64748B" : "#9CA3AF",
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      labels: { colors: theme === "dark" ? "#D1D5DB" : "#4B5563" },
      markers: { size: 7 },
      itemMargin: { horizontal: 10, vertical: 5 },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ dataPointIndex }) => {
        if (!history[dataPointIndex]) return "";
        const timeStr = categories[dataPointIndex] || "";
        const item = history[dataPointIndex];
        return `
          <div class="space-y-2 rounded-xl bg-white p-3 text-gray-700 shadow-lg dark:bg-gray-900 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
            <p class="text-xs font-semibold text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-1">${timeStr}</p>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between gap-6">
                <span class="flex items-center gap-1.5 font-medium" style="color: ${METRIC_CONFIG.ph.color}">
                  <span class="size-2 rounded-full" style="background-color: ${METRIC_CONFIG.ph.color}"></span> pH Level:
                </span>
                <strong>${item.ph?.toFixed(2) ?? "—"} pH</strong>
              </div>
              <div class="flex items-center justify-between gap-6">
                <span class="flex items-center gap-1.5 font-medium" style="color: ${METRIC_CONFIG.tds.color}">
                  <span class="size-2 rounded-full" style="background-color: ${METRIC_CONFIG.tds.color}"></span> TDS Nutrisi:
                </span>
                <strong>${item.tds?.toFixed(0) ?? "—"} PPM</strong>
              </div>
              <div class="flex items-center justify-between gap-6">
                <span class="flex items-center gap-1.5 font-medium" style="color: ${METRIC_CONFIG.temp.color}">
                  <span class="size-2 rounded-full" style="background-color: ${METRIC_CONFIG.temp.color}"></span> Suhu Air:
                </span>
                <strong>${item.temperature?.toFixed(1) ?? "—"} °C</strong>
              </div>
              <div class="flex items-center justify-between gap-6">
                <span class="flex items-center gap-1.5 font-medium" style="color: ${METRIC_CONFIG.humidity.color}">
                  <span class="size-2 rounded-full" style="background-color: ${METRIC_CONFIG.humidity.color}"></span> Kelembapan:
                </span>
                <strong>${item.humidity?.toFixed(0) ?? "—"} %</strong>
              </div>
            </div>
          </div>
        `;
      },
    },
  };

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
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Realtime History
        </span>
      </div>
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </section>
  );
}