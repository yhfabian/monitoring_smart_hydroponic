
import { SidebarHeader } from "@/components/ui/sidebar";
import { Link } from "react-router";

interface AppSidebarHeaderProps {
  showContent: boolean;
}

export default function AppSidebarHeader({
  showContent,
}: AppSidebarHeaderProps) {
  return (
    <SidebarHeader className="px-5 py-8">
      <Link to="/" className="flex items-center gap-3">
        <svg
          viewBox="0 0 40 40"
          className="size-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="12" fill="#16A34A" />
          <path
            d="M20 29V18"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M20 22C11 22 10 14 10 14C18 11 23 15 20 22Z"
            fill="white"
          />
          <path
            d="M20 19C20 10 28 9 31 10C31 18 26 22 20 22"
            fill="#BBF7D0"
          />
          <path
            d="M14 30H26"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {showContent && (
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hydro<span className="text-green-600">Smart</span>
          </span>
        )}
      </Link>
    </SidebarHeader>
  );
}
