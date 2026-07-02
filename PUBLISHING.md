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

Không cần secret `NPM_TOKEN` nếu Trusted Publishing đã hoạt động.

**Lưu ý org GitHub:** nếu repo thuộc org `angia-lunar`, vào GitHub → **Organization settings → Third-party access** và **approve** quyền cho npm (nếu có yêu cầu chờ duyệt).

## Release qua GitHub Actions

```bash
npm version patch   # hoặc minor / major
git push
git push origin v0.1.2
```

Workflow `publish.yml` chạy khi **push tag `v*`**, không chạy khi push commit thường lên `main`.

## Lỗi `404 '@minhbc97/lunar@…' is not in this registry`

Thường do **GitHub Actions chưa xác thực được với npm** (không phải lỗi code).

**Cách 1 — Bật Trusted Publishing (khuyên dùng):**

1. npm → `@minhbc97/lunar` → **Settings → Trusted publishing**
2. GitHub Actions → `angia-lunar/lich-an-gia-lib` + `publish.yml`
3. Push lại tag (xóa tag cũ nếu cần):

```bash
git tag -d v0.1.1
git push origin :refs/tags/v0.1.1
git tag v0.1.1
git push origin v0.1.1
```

**Cách 2 — Dự phòng bằng token (tạm thời):**

1. npm → **Access Tokens** → Granular token, scope `@minhbc97`, **Read and write**, bật **Bypass 2FA**
2. GitHub repo → **Settings → Secrets → Actions** → `NPM_TOKEN`
3. Chạy lại workflow **Publish @minhbc97/lunar**

Workflow ưu tiên OIDC; nếu OIDC không có, dùng `NPM_TOKEN`.

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
