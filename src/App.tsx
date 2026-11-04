import AppLayout from "@/components/layout/app-layout";
import DashboardPage from "@/pages/main/dashboard";
import MonitoringPage from "@/pages/main/monitoring";
import ClassificationPage from "@/pages/main/classification";
import FarmerAssistantPage from "@/pages/main/assistant";
import ReportsPage from "@/pages/main/reports";
import { BlankPage, Error404Page } from "@/pages/main/pages";
import BarChartPage from "@/pages/others/charts/bar-chart";
import LineChartPage from "@/pages/others/charts/line-chart";
import Alerts from "@/pages/others/ui-elements/alerts";
import Avatars from "@/pages/others/ui-elements/avatars";
import Badges from "@/pages/others/ui-elements/badges";
import Buttons from "@/pages/others/ui-elements/buttons";
import Images from "@/pages/others/ui-elements/images";
import Videos from "@/pages/others/ui-elements/videos";
import "flatpickr/dist/flatpickr.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/classification" element={<ClassificationPage />} />
        <Route path="/assistant" element={<FarmerAssistantPage />} />
        <Route path="/reports" element={<ReportsPage />} />

        {/* Others Page */}
        <Route path="/blank" element={<BlankPage />} />

        {/* Forms */}

        {/* Tables */}

        {/* Ui Elements */}
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/badge" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />

        {/* Charts */}
        <Route path="/line-chart" element={<LineChartPage />} />
        <Route path="/bar-chart" element={<BarChartPage />} />
      </Route>

      {/* Full-width / Error / Status Pages */}
      <Route path="/error-404" element={<Error404Page />} />

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}
