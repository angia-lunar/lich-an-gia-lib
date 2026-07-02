import { convertSolarToLunar, isSameSolarDate } from "./convert.js";
import { getDayQuality, resolveDayHolidays } from "./almanac.js";
import { getSolarToday } from "./today.js";
import type { CalendarDayCell, SolarDate } from "./types.js";

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function weekdayMondayZero(year: number, month: number, day: number): number {
  const jsDay = new Date(year, month - 1, day).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

/**
 * Build a Monday-start grid for a solar month.
 * Leading/trailing cells from adjacent months have `isCurrentMonth: false`.
 */
export function buildMonthGrid(year: number, month: number, today?: SolarDate): CalendarDayCell[] {
  if (month < 1 || month > 12) {
    throw new RangeError("month must be between 1 and 12");
  }

  const referenceToday = today ?? getSolarToday();
  const totalDays = daysInMonth(year, month);
  const leading = weekdayMondayZero(year, month, 1);
  const cells: CalendarDayCell[] = [];

  const pushCell = (solar: SolarDate, isCurrentMonth: boolean): void => {
    cells.push({
      solar,
      lunar: convertSolarToLunar(solar),
      quality: getDayQuality(solar),
      holidays: resolveDayHolidays(solar).holidays,
      isToday: isSameSolarDate(solar, referenceToday),
      isCurrentMonth,
      weekday: weekdayMondayZero(solar.year, solar.month, solar.day),
    });
  };

  if (leading > 0) {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevTotal = daysInMonth(prevYear, prevMonth);

    for (let day = prevTotal - leading + 1; day <= prevTotal; day += 1) {
      pushCell({ year: prevYear, month: prevMonth, day }, false);
    }
  }

  for (let day = 1; day <= totalDays; day += 1) {
    pushCell({ year, month, day }, true);
  }

  const trailing = (7 - (cells.length % 7)) % 7;
  if (trailing > 0) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    for (let day = 1; day <= trailing; day += 1) {
      pushCell({ year: nextYear, month: nextMonth, day }, false);
    }
  }

  return cells;
}
