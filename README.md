# Thiệp cưới Nguyễn Thảo & Ngọc Đạt

## Chạy website

Mở Terminal tại thư mục dự án, rồi chạy:

```bash
npm install
npm run dev
```

Terminal sẽ hiện một đường dẫn như `http://localhost:5173`. Mở đường dẫn đó bằng trình duyệt để xem web.

## Thay ảnh và nén ảnh

Đặt ảnh gốc JPG vào thư mục `source-images/` với đúng tên sau:

```text
hero-wedding.jpg
groom.jpg
bride.jpg
gallery-01.jpg đến gallery-10.jpg
```

Sau mỗi lần thay ảnh, chạy:

```bash
npm run optimize:images
```

Lệnh này tự tạo ảnh WebP nhẹ trong `public/images/`. Website chỉ tải WebP để trang mượt hơn; không cần chỉnh code. QR giữ trực tiếp tại `public/images/qr.jpg` (nhà trai) và `public/images/qr-bride.jpg` (nhà gái).

> Lệnh nén cần `cwebp` (WebP tools). Nếu Terminal báo `Missing cwebp`, cài WebP tools trước rồi chạy lại lệnh trên.

## Bật chức năng lời chúc

1. Trong Supabase, tạo project mới → mở **SQL Editor** → tạo query mới → dán nội dung file `supabase/wishes.sql` → bấm **Run**.
2. Trong Cloudflare Dashboard → **Turnstile** → **Add widget**. Thêm domain `ten-du-an.pages.dev` và domain riêng (nếu có), rồi lưu Sitekey và Secret key.
3. Trong Cloudflare Dashboard → **Workers & Pages** → chọn website → **Settings** → **Variables and Secrets**. Thêm các biến cho cả Production và Preview:

| Tên | Loại | Giá trị lấy từ |
| --- | --- | --- |
| `VITE_TURNSTILE_SITE_KEY` | Text | Sitekey của Turnstile |
| `SUPABASE_URL` | Secret | Supabase → Settings → API → Project URL |
| `SUPABASE_SECRET_KEY` | Secret | Supabase → Settings → API Keys → Secret key |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key của Turnstile |

4. Mở SQL Editor một lần nữa, chạy nội dung file `supabase/enable-auto-approve.sql` để những dòng tạo thủ công trong Supabase cũng mặc định được duyệt. Lời chúc gửi từ website luôn hiển thị ngay; chọn dòng và bấm thùng rác để xóa nội dung không phù hợp.

Không gửi hoặc commit các secret key. `SUPABASE_SECRET_KEY` và `TURNSTILE_SECRET_KEY` chỉ được lưu trong Cloudflare Pages, không xuất hiện ở trình duyệt.

## Kiểm tra trước khi gửi

```bash
npm run build
```

Nếu lệnh hoàn tất không báo lỗi, website đã build thành công.

## Link gửi lời mời

- `https://thao-dat-wedding.pages.dev/groom`: lời mời nhà trai, dùng QR của Ngọc Đạt.
- `https://thao-dat-wedding.pages.dev/bride`: lời mời nhà gái, dùng QR của Nguyễn Thảo.
- `https://thao-dat-wedding.pages.dev`: trang chọn lời mời đẹp mắt để người xem tự chọn nhà trai hoặc nhà gái.
