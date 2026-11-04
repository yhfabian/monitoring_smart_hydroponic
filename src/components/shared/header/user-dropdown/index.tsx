import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useChangeLocale, useLocale, useTranslations } from "@/i18n";
import { getLanguage, languages } from "@/i18n/languages";
import { ChevronDownIcon, GlobeIcon } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";

export default function UserDropdown() {
  const t = useTranslations("userDropdown");
  const locale = useLocale();
  const changeLocale = useChangeLocale();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = getLanguage(locale);
  const CurrentFlagIcon = currentLang.FlagIcon;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="dropdown-toggle flex items-center gap-2 text-gray-700 dark:text-gray-300"
        aria-label={t("language")}
      >
        <GlobeIcon className="size-5" />
        <span className="text-sm font-medium">{currentLang.shortName}</span>
        <CurrentFlagIcon className="size-4 overflow-hidden rounded-full" />
        <ChevronDownIcon
          className={cn(
            "size-4 text-gray-500 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12} className="w-56 p-2">
        {languages.map((language) => {
          const FlagIcon = language.FlagIcon;
          const selected = locale === language.id;
          return (
            <DropdownMenuItem
              key={language.id}
              onClick={() => changeLocale(language.id)}
              className={cn(
                "flex items-center justify-between gap-2",
                selected &&
                  "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
              )}
            >
              <span className="flex items-center gap-2">
                <FlagIcon className="size-5 overflow-hidden rounded-full" />
                <span>{language.name}</span>
              </span>
              {selected && (
                <Badge variant="light" color="success" size="sm">
                  {language.shortName}
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
