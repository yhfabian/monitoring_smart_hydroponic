
import {
  LayoutGridIcon,
  PieChartIcon,
  BoxIcon,
  ListIcon,
  TableIcon,
  CalendarIcon,
  PageIcon,
} from "@/icons";
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    icon: <LayoutGridIcon className="size-6" />,
    key: "dashboard",
    path: "/",
  },
  {
    icon: <CalendarIcon className="size-6" />,
    key: "monitoring",
    path: "/monitoring",
  },
  {
    icon: <PieChartIcon className="size-6" />,
    key: "classification",
    path: "/classification",
  },
  {
    icon: <BoxIcon className="size-6" />,
    key: "plants",
    path: "/plants",
  },
  {
    icon: <ListIcon className="size-6" />,
    key: "history",
    path: "/history",
  },
  {
    icon: <TableIcon className="size-6" />,
    key: "reports",
    path: "/reports",
  },
];

export const othersItems: NavItem[] = [
  {
    icon: <PageIcon className="size-6" />,
    key: "settings",
    path: "/settings",
  },
];

export const supportItems: NavItem[] = [];
