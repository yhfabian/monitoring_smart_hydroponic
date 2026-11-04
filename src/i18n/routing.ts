export const routing = {
  locales: ["id", "en"] as const,
  defaultLocale: "id",
} as const;

export type Locale = (typeof routing.locales)[number];

export const isLocale = (v: unknown): v is Locale =>
  routing.locales.includes(v as Locale);

const RTL_LOCALES: readonly Locale[] = [];

/** Kept here (not in languages.ts) so config.ts doesn't pull in the icon barrel. */
export const isRtl = (locale: Locale): boolean => RTL_LOCALES.includes(locale);
