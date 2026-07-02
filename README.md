# @angia/lunar

Wrapper âm lịch Việt Nam cho [Lịch An Gia](https://github.com/buicongminh/lich-an-gia-lib).

Bọc [`@baostudio/viet-lunar`](https://www.npmjs.com/package/@baostudio/viet-lunar) với API ổn định, type chuẩn hóa, ngày lễ và bộ test ngày mốc.

## Cài đặt

```bash
npm install @angia/lunar
```

Yêu cầu Node.js ≥ 18. Package ESM (`import`).

## API chính

```ts
import {
  convertSolarToLunar,
  convertLunarToSolar,
  getDayAlmanac,
  getTodayAlmanac,
  buildMonthGrid,
  getSolarToday,
} from "@angia/lunar";

const lunar = convertSolarToLunar({ year: 2025, month: 1, day: 29 });
// { year: 2025, month: 1, day: 1, isLeapMonth: false }

const almanac = getDayAlmanac({ year: 2025, month: 6, day: 29 });
// canChi, hoangDao, nen, kieng, holidays, ...

const grid = buildMonthGrid(2025, 6);
// ô lịch tháng dương + âm
```

## Quy ước

- `SolarDate` / `LunarDate`: tháng 1–12.
- `LunarDate.isLeapMonth`: tháng nhuận âm lịch VN.
- Timezone mặc định: `Asia/Ho_Chi_Minh`.

Ứng dụng và API server **không** import `@baostudio/viet-lunar` trực tiếp — chỉ qua package này.

## Phát triển

```bash
npm install
npm test
npm run build
npm run publish:dry   # xem tarball trước khi đẩy npm
```

## Publish lên npm

1. Tạo org [@angia](https://www.npmjs.com/org/create) trên npm (miễn phí, public).
2. `npm login` trên máy dev.
3. Bump version trong `package.json`, commit.
4. Tag: `git tag v0.1.0 && git push origin v0.1.0`
5. GitHub Action `.github/workflows/publish.yml` sẽ build, test và `npm publish` (cần secret `NPM_TOKEN`).

Hoặc publish tay:

```bash
npm run publish:npm
```

## License

MIT
