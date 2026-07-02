/** Gregorian date parts (month 1–12). */
export interface SolarDate {
  year: number;
  month: number;
  day: number;
}

/** Vietnamese lunar date parts (month 1–12). */
export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
}

export interface CanChiStemBranch {
  stem: string;
  branch: string;
  code: number;
}

export interface DayCanChi {
  year: CanChiStemBranch;
  month: CanChiStemBranch;
  day: CanChiStemBranch;
}

export interface HoangDaoInfo {
  hours: string[];
  isGoodDay: boolean;
}

/** Luận ngày tốt/xấu từ @baostudio/viet-lunar */
export type DayQuality = "excellent" | "good" | "neutral" | "poor" | "bad";

import type { HolidayInfo } from "./holidays.js";

export type { HolidayInfo, HolidayType } from "./holidays.js";

/** Almanac summary for a solar day (vạn niên MVP). */
export interface DayAlmanac {
  solar: SolarDate;
  lunar: LunarDate;
  canChi: DayCanChi;
  hoangDao: HoangDaoInfo;
  truc: string;
  nen: string[];
  kieng: string[];
  holidays: HolidayInfo[];
  solarHolidays: HolidayInfo[];
  lunarHolidays: HolidayInfo[];
  quality: DayQuality;
}

/** One cell in a solar month grid (for calendar UI). */
export interface CalendarDayCell {
  solar: SolarDate;
  lunar: LunarDate;
  quality: DayQuality;
  holidays: HolidayInfo[];
  isToday: boolean;
  isCurrentMonth: boolean;
  weekday: number;
}

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh" as const;
