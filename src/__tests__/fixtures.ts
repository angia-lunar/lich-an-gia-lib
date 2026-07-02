import type { LunarDate, SolarDate } from "../types.js";

/** Verified solar ↔ lunar pairs for regression tests. */
export const SOLAR_LUNAR_FIXTURES: Array<{
  label: string;
  solar: SolarDate;
  lunar: LunarDate;
}> = [
  {
    label: "Tết 2023 mùng 1",
    solar: { year: 2023, month: 1, day: 22 },
    lunar: { year: 2023, month: 1, day: 1, isLeapMonth: false },
  },
  {
    label: "Tết 2024 mùng 1",
    solar: { year: 2024, month: 2, day: 10 },
    lunar: { year: 2024, month: 1, day: 1, isLeapMonth: false },
  },
  {
    label: "Tết 2025 mùng 1",
    solar: { year: 2025, month: 1, day: 29 },
    lunar: { year: 2025, month: 1, day: 1, isLeapMonth: false },
  },
  {
    label: "Tết 2026 mùng 1",
    solar: { year: 2026, month: 2, day: 17 },
    lunar: { year: 2026, month: 1, day: 1, isLeapMonth: false },
  },
  {
    label: "Rằm tháng Giêng 2025",
    solar: { year: 2025, month: 2, day: 12 },
    lunar: { year: 2025, month: 1, day: 15, isLeapMonth: false },
  },
  {
    label: "Rằm tháng 8 / Trung Thu 2025",
    solar: { year: 2025, month: 10, day: 6 },
    lunar: { year: 2025, month: 8, day: 15, isLeapMonth: false },
  },
  {
    label: "Vu Lan 2025 (15/7 âm)",
    solar: { year: 2025, month: 9, day: 6 },
    lunar: { year: 2025, month: 7, day: 15, isLeapMonth: false },
  },
  {
    label: "Đoan Ngọ 2025 (5/5 âm)",
    solar: { year: 2025, month: 5, day: 31 },
    lunar: { year: 2025, month: 5, day: 5, isLeapMonth: false },
  },
  {
    label: "Mùng 1 tháng 5 âm 2025",
    solar: { year: 2025, month: 5, day: 27 },
    lunar: { year: 2025, month: 5, day: 1, isLeapMonth: false },
  },
  {
    label: "Rằm tháng 5 âm 2025",
    solar: { year: 2025, month: 6, day: 10 },
    lunar: { year: 2025, month: 5, day: 15, isLeapMonth: false },
  },
  {
    label: "Tháng nhuận 2 âm 2023 — 15/2 nhuận",
    solar: { year: 2023, month: 4, day: 5 },
    lunar: { year: 2023, month: 2, day: 15, isLeapMonth: true },
  },
  {
    label: "Tháng nhuận 6 âm 2025 — mùng 1 nhuận",
    solar: { year: 2025, month: 7, day: 25 },
    lunar: { year: 2025, month: 6, day: 1, isLeapMonth: true },
  },
  {
    label: "Giỗ Tổ Hùng Vương 2025 (10/3 âm)",
    solar: { year: 2025, month: 4, day: 7 },
    lunar: { year: 2025, month: 3, day: 10, isLeapMonth: false },
  },
  {
    label: "Tết Trung Thu 2024",
    solar: { year: 2024, month: 9, day: 17 },
    lunar: { year: 2024, month: 8, day: 15, isLeapMonth: false },
  },
  {
    label: "29 tháng Chạp 2024 âm (sát Tết)",
    solar: { year: 2025, month: 1, day: 28 },
    lunar: { year: 2024, month: 12, day: 29, isLeapMonth: false },
  },
  {
    label: "Rằm tháng 7 âm 2024",
    solar: { year: 2024, month: 8, day: 18 },
    lunar: { year: 2024, month: 7, day: 15, isLeapMonth: false },
  },
  {
    label: "Mùng 1 tháng 7 âm 2024",
    solar: { year: 2024, month: 8, day: 4 },
    lunar: { year: 2024, month: 7, day: 1, isLeapMonth: false },
  },
  {
    label: "Rằm tháng Giêng 2026",
    solar: { year: 2026, month: 3, day: 3 },
    lunar: { year: 2026, month: 1, day: 15, isLeapMonth: false },
  },
  {
    label: "Đông chí gần Tết 2025",
    solar: { year: 2025, month: 12, day: 21 },
    lunar: { year: 2025, month: 11, day: 2, isLeapMonth: false },
  },
  {
    label: "Ngày thường 29/06/2025",
    solar: { year: 2025, month: 6, day: 29 },
    lunar: { year: 2025, month: 6, day: 5, isLeapMonth: false },
  },
];
