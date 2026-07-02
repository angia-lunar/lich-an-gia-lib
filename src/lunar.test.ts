import { describe, expect, it } from "vitest";

import { buildMonthGrid } from "./calendar.js";
import {
  convertLunarToSolar,
  convertSolarToLunar,
  formatLunarDate,
  isSameLunarDate,
} from "./convert.js";
import { getDayAlmanac } from "./almanac.js";
import { SOLAR_LUNAR_FIXTURES } from "./__tests__/fixtures.js";

describe("convertSolarToLunar", () => {
  it.each(SOLAR_LUNAR_FIXTURES)("$label", ({ solar, lunar }) => {
    expect(convertSolarToLunar(solar)).toEqual(lunar);
  });
});

describe("convertLunarToSolar", () => {
  it.each(SOLAR_LUNAR_FIXTURES)("$label", ({ solar, lunar }) => {
    expect(convertLunarToSolar(lunar)).toEqual(solar);
  });
});

describe("round-trip", () => {
  it.each(SOLAR_LUNAR_FIXTURES)("$label solar → lunar → solar", ({ solar, lunar }) => {
    const converted = convertSolarToLunar(solar);
    expect(converted).toEqual(lunar);
    expect(convertLunarToSolar(converted)).toEqual(solar);
  });
});

describe("leap month", () => {
  it("formats leap month label", () => {
    const lunar = { year: 2023, month: 2, day: 15, isLeapMonth: true };
    expect(formatLunarDate(lunar)).toBe("15/2/2023 (nhuận)");
  });

  it("distinguishes leap vs regular month", () => {
    const leap = { year: 2023, month: 2, day: 15, isLeapMonth: true };
    const regular = { year: 2023, month: 2, day: 15, isLeapMonth: false };
    expect(isSameLunarDate(leap, regular)).toBe(false);
  });
});

describe("getDayAlmanac", () => {
  it("returns can chi and hoang dao for a known day", () => {
    const almanac = getDayAlmanac({ year: 2025, month: 6, day: 29 });

    expect(almanac.lunar).toEqual({
      year: 2025,
      month: 6,
      day: 5,
      isLeapMonth: false,
    });
    expect(almanac.canChi.day.stem).toBeTruthy();
    expect(almanac.canChi.day.branch).toBeTruthy();
    expect(almanac.hoangDao.hours.length).toBeGreaterThan(0);
    expect(Array.isArray(almanac.kieng)).toBe(true);
    expect(Array.isArray(almanac.holidays)).toBe(true);
    expect(almanac.holidays.every((item) => typeof item.name === "string")).toBe(true);
  });

  it("includes solar holidays on Quốc khánh", () => {
    const almanac = getDayAlmanac({ year: 2025, month: 9, day: 2 });
    expect(almanac.solarHolidays.some((item) => item.name === "Quốc khánh")).toBe(true);
  });

  it("includes rằm alongside named lunar holiday on day 15", () => {
    const almanac = getDayAlmanac({ year: 2025, month: 9, day: 6 });
    expect(almanac.lunarHolidays.some((item) => item.name === "Vu Lan")).toBe(true);
    expect(almanac.lunarHolidays.some((item) => item.name === "Rằm tháng 7")).toBe(true);
  });
});

describe("buildMonthGrid", () => {
  it("returns full weeks only", () => {
    const grid = buildMonthGrid(2025, 6, { year: 2025, month: 6, day: 29 });
    expect(grid.length % 7).toBe(0);
  });

  it("marks today in grid", () => {
    const grid = buildMonthGrid(2025, 6, { year: 2025, month: 6, day: 29 });
    const todayCells = grid.filter((cell) => cell.isToday);
    expect(todayCells).toHaveLength(1);
    expect(todayCells[0]?.solar).toEqual({ year: 2025, month: 6, day: 29 });
  });

  it("includes leading and trailing days for layout", () => {
    const grid = buildMonthGrid(2025, 6);
    const inMonth = grid.filter((cell) => cell.isCurrentMonth);
    expect(inMonth).toHaveLength(30);
    expect(grid.length).toBeGreaterThan(30);
    expect(grid.every((cell) => Array.isArray(cell.holidays))).toBe(true);
  });

  it("includes day quality for calendar styling", () => {
    const grid = buildMonthGrid(2025, 6);
    const sample = grid.find((cell) => cell.solar.day === 10 && cell.solar.month === 6);
    expect(sample?.quality).toBe("bad");
  });
});
