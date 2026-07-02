import { lunarToSolar as libLunarToSolar, solarToLunar as libSolarToLunar } from "@baostudio/viet-lunar";

import type { LunarDate, SolarDate } from "./types.js";

function assertDateParts(
  parts: { year: number; month: number; day: number },
  label: string,
): void {
  const { year, month, day } = parts;
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    throw new RangeError(`${label}: year must be between 1900 and 2100`);
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`${label}: month must be between 1 and 12`);
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new RangeError(`${label}: day must be between 1 and 31`);
  }
}

export function convertSolarToLunar(solar: SolarDate): LunarDate {
  assertDateParts(solar, "solar");

  const lunar = libSolarToLunar(solar);

  return {
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    isLeapMonth: Boolean(lunar.leapMonth),
  };
}

export function convertLunarToSolar(lunar: LunarDate): SolarDate {
  assertDateParts(lunar, "lunar");

  return libLunarToSolar({
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    leapMonth: lunar.isLeapMonth,
  });
}

export function formatLunarDate(lunar: LunarDate): string {
  const suffix = lunar.isLeapMonth ? " (nhuận)" : "";
  return `${lunar.day}/${lunar.month}/${lunar.year}${suffix}`;
}

export function formatSolarDate(solar: SolarDate): string {
  return `${solar.day}/${solar.month}/${solar.year}`;
}

export function isSameSolarDate(a: SolarDate, b: SolarDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function isSameLunarDate(a: LunarDate, b: LunarDate): boolean {
  return (
    a.year === b.year &&
    a.month === b.month &&
    a.day === b.day &&
    a.isLeapMonth === b.isLeapMonth
  );
}
