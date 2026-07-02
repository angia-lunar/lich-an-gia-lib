# @minhbc97/lunar

Wrapper âm lịch Việt Nam cho [Lịch An Gia](https://github.com/buicongminh/lich-an-gia-lib).

Bọc [`@baostudio/viet-lunar`](https://www.npmjs.com/package/@baostudio/viet-lunar) với API ổn định, type chuẩn hóa, ngày lễ và bộ test ngày mốc.

## Cài đặt

```bash
npm install @minhbc97/lunar
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
} from "@minhbc97/lunar";

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

Scope: **`@minhbc97`** (org npm `minhbc97`).

1. `npm login` trên máy dev (tài khoản có quyền publish org `minhbc97`).
2. Publish lần đầu (cần OTP nếu bật 2FA):

```bash
npm run build
npm test
npm publish --access public --otp=123456
```

3. Trên npm: package **Settings → Trusted publishing** → GitHub Actions → repo `lich-an-gia-lib`, workflow `publish.yml`.
4. Các lần sau: bump version, tag `v0.1.1`, push tag → GitHub Action publish qua OIDC (không cần `NPM_TOKEN`).

## License

MIT
