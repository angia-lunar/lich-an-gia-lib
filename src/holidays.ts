import type { LunarDate, SolarDate } from "./types.js";

export type HolidayType = "solar" | "lunar";

export type HolidayInfo = {
  name: string;
  type: HolidayType;
};

export type MonthHolidayEntry = HolidayInfo & {
  solar: SolarDate;
};

/** Ngày lễ dương lịch (Việt Nam) — cố định theo ngày/tháng dương. */
const SOLAR_HOLIDAYS: { month: number; day: number; name: string }[] = [
  { month: 1, day: 1, name: "Tết Dương lịch" },
  { month: 3, day: 8, name: "Ngày Quốc tế Phụ nữ" },
  { month: 4, day: 30, name: "Ngày Giải phóng miền Nam" },
  { month: 5, day: 1, name: "Ngày Quốc tế Lao động" },
  { month: 5, day: 19, name: "Sinh nhật Bác Hồ" },
  { month: 6, day: 1, name: "Ngày Quốc tế Thiếu nhi" },
  { month: 6, day: 28, name: "Ngày Gia đình Việt Nam" },
  { month: 7, day: 27, name: "Ngày Thương binh và Liệt sĩ" },
  { month: 9, day: 2, name: "Quốc khánh" },
  { month: 10, day: 10, name: "Ngày Giải phóng Thủ đô" },
  { month: 10, day: 20, name: "Ngày Phụ nữ Việt Nam" },
  { month: 11, day: 20, name: "Ngày Nhà giáo Việt Nam" },
  { month: 12, day: 22, name: "Ngày Thành lập Quân đội Nhân dân Việt Nam" },
  { month: 12, day: 24, name: "Giáng sinh" },
  { month: 12, day: 25, name: "Giáng sinh" },
  { month: 12, day: 31, name: "Giao thừa Dương lịch" },
];

export function getSolarHolidays(solar: SolarDate): HolidayInfo[] {
  return SOLAR_HOLIDAYS.filter((item) => item.month === solar.month && item.day === solar.day).map(
    (item) => ({
      name: item.name,
      type: "solar" as const,
    }),
  );
}

export function getLunarHolidaysFromNames(names: string[]): HolidayInfo[] {
  return names.map((name) => ({
    name,
    type: "lunar" as const,
  }));
}

function normalizeHolidayName(name: string): string {
  return name.trim().toLowerCase();
}

/** Mùng một, rằm — luôn ghi nhận; tránh trùng tên đã có. */
export function getLunarObservanceHolidays(
  lunar: LunarDate,
  existingLunarNames: string[],
): HolidayInfo[] {
  const items: HolidayInfo[] = [];
  const normalizedExisting = existingLunarNames.map(normalizeHolidayName);

  if (lunar.day === 1) {
    const mungMotLabel =
      lunar.month === 1 ? "Mùng một Tết" : `Mùng một tháng ${lunar.month}`;
    const hasMungMot = normalizedExisting.some(
      (name) => name === normalizeHolidayName(mungMotLabel) || name.includes("mùng"),
    );
    const hasTet = lunar.month === 1 && normalizedExisting.some((name) => name.includes("tết"));

    if (!hasMungMot && !hasTet) {
      items.push({ name: mungMotLabel, type: "lunar" });
    }
  }

  if (lunar.day === 15) {
    const ramLabel = `Rằm tháng ${lunar.month}`;
    const hasRam = normalizedExisting.some(
      (name) => name === normalizeHolidayName(ramLabel) || name.startsWith("rằm tháng"),
    );

    if (!hasRam) {
      items.push({ name: ramLabel, type: "lunar" });
    }
  }

  return items;
}

export function mergeHolidays(...groups: HolidayInfo[][]): HolidayInfo[] {
  const seen = new Set<string>();
  const merged: HolidayInfo[] = [];

  for (const group of groups) {
    for (const holiday of group) {
      const key = `${holiday.type}:${holiday.name}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      merged.push(holiday);
    }
  }

  return merged;
}

function daysInSolarMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function compareSolarDay(a: SolarDate, b: SolarDate): number {
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  if (a.month !== b.month) {
    return a.month - b.month;
  }
  return a.day - b.day;
}

/** Tất cả ngày lễ trong một tháng dương (để hiển thị danh sách tháng). */
export function getHolidaysInSolarMonth(
  year: number,
  month: number,
  resolveDay: (solar: SolarDate) => { solarHolidays: HolidayInfo[]; lunarHolidays: HolidayInfo[] },
): { solar: MonthHolidayEntry[]; lunar: MonthHolidayEntry[] } {
  const solarEntries: MonthHolidayEntry[] = [];
  const lunarEntries: MonthHolidayEntry[] = [];
  const totalDays = daysInSolarMonth(year, month);

  for (let day = 1; day <= totalDays; day += 1) {
    const solar = { year, month, day };
    const { solarHolidays, lunarHolidays } = resolveDay(solar);

    for (const holiday of solarHolidays) {
      solarEntries.push({ ...holiday, solar });
    }
    for (const holiday of lunarHolidays) {
      lunarEntries.push({ ...holiday, solar });
    }
  }

  solarEntries.sort((a, b) => compareSolarDay(a.solar, b.solar));
  lunarEntries.sort((a, b) => compareSolarDay(a.solar, b.solar));

  return { solar: solarEntries, lunar: lunarEntries };
}
