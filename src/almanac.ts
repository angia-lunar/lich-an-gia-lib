import { analyzeDay as libAnalyzeDay } from "@baostudio/viet-lunar";

import {
  getLunarHolidaysFromNames,
  getLunarObservanceHolidays,
  getSolarHolidays,
  mergeHolidays,
} from "./holidays.js";
import type { DayAlmanac, DayQuality, SolarDate } from "./types.js";
import { getSolarToday } from "./today.js";

function toLunarDate(raw: ReturnType<typeof libAnalyzeDay>["lunar"]) {
  return {
    year: raw.year,
    month: raw.month,
    day: raw.day,
    isLeapMonth: Boolean(raw.leapMonth),
  };
}

function libHolidayNames(raw: ReturnType<typeof libAnalyzeDay>): string[] {
  return raw.holidays.map((item) => (typeof item === "string" ? item : item.name));
}

export function resolveDayHolidaysFromAnalysis(raw: ReturnType<typeof libAnalyzeDay>) {
  const solar = { ...raw.solar };
  const lunar = toLunarDate(raw.lunar);
  const libNames = libHolidayNames(raw);

  const lunarHolidays = mergeHolidays(
    getLunarHolidaysFromNames(libNames),
    getLunarObservanceHolidays(lunar, libNames),
  );
  const solarHolidays = getSolarHolidays(solar);

  return {
    holidays: mergeHolidays(solarHolidays, lunarHolidays),
    solarHolidays,
    lunarHolidays,
  };
}

export function resolveDayHolidays(solar: SolarDate) {
  return resolveDayHolidaysFromAnalysis(libAnalyzeDay(solar));
}

export function getDayQuality(solar: SolarDate): DayQuality {
  return libAnalyzeDay(solar).quality;
}

export function getDayAlmanac(solar: SolarDate): DayAlmanac {
  const raw = libAnalyzeDay(solar);
  const { holidays, solarHolidays, lunarHolidays } = resolveDayHolidaysFromAnalysis(raw);

  return {
    solar: { ...raw.solar },
    lunar: toLunarDate(raw.lunar),
    canChi: raw.canChi,
    hoangDao: raw.hoangDao,
    truc: raw.truc ?? "",
    nen: raw.nen,
    kieng: raw.kieng,
    holidays,
    solarHolidays,
    lunarHolidays,
    quality: raw.quality,
  };
}

export function getTodayAlmanac(): DayAlmanac {
  return getDayAlmanac(getSolarToday());
}
