# Publish `@minhbc97/lunar`

Tài liệu nội bộ cho maintainer. Không đưa vào tarball npm.

## Yêu cầu

- Tài khoản npm có quyền publish org **`minhbc97`**
- Repo GitHub: [`angia-lunar/lich-an-gia-lib`](https://github.com/angia-lunar/lich-an-gia-lib) (public)
- `package.json` → `repository.url` khớp repo GitHub

## Trusted Publishing (khuyên dùng)

Cấu hình một lần trên [npm package settings](https://www.npmjs.com/package/@minhbc97/lunar):

| Trường | Giá trị |
|--------|---------|
| Provider | GitHub Actions |
| Repository | `angia-lunar/lich-an-gia-lib` |
| Workflow filename | `publish.yml` |

Không cần secret `NPM_TOKEN` trên GitHub.

## Release qua GitHub Actions

```bash
npm version patch   # hoặc minor / major
git push
git push origin v0.1.1
```

Workflow `publish.yml` chạy khi **push tag `v*`**, không chạy khi push commit thường lên `main`.

## Publish tay (dự phòng)

```bash
npm run build
npm test
npm publish --access public --otp=123456
```

OTP lấy từ app 2FA **của npm** (không phải GitHub).

## Kiểm tra sau publish

```bash
npm view @minhbc97/lunar version
npm view @minhbc97/lunar repository
```

## CI trên push

Workflow `ci.yml` chạy **build + test** mỗi khi push/PR vào `main`. Workflow `publish.yml` chỉ publish khi có tag `v*`.
