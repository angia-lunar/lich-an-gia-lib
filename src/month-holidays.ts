import { resolveDayHolidays } from "./almanac.js";
import { getHolidaysInSolarMonth as getHolidaysInSolarMonthCore } from "./holidays.js";
import type { MonthHolidayEntry } from "./holidays.js";
import type { SolarDate } from "./types.js";

export type { MonthHolidayEntry } from "./holidays.js";

export function getHolidaysInSolarMonth(year: number, month: number) {
  return getHolidaysInSolarMonthCore(year, month, resolveDayHolidays);
}

export function formatMonthHolidayDate(solar: SolarDate): string {
  const day = String(solar.day).padStart(2, "0");
  const month = String(solar.month).padStart(2, "0");
  return `${day}/${month}`;
}
