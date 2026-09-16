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
DSC06642.jpg, DSC06710.jpg, DSC06774.jpg, DSC06838.jpg
DSC06483.jpg, DSC06530.jpg, DSC06542.jpg, DSC06566.jpg
DSC06288.jpg, DSC06329.jpg, DSC06367.jpg, DSC06394.jpg, DSC06433.jpg, DSC06464.jpg
DSC05891.jpg, DSC06025.jpg, DSC06134.jpg, DSC06254.jpg, DSC06270.jpg
DSC05606.jpg, DSC05670.jpg, DSC05702.jpg, DSC05759.jpg, DSC05838.jpg
```

Sau mỗi lần thay ảnh, chạy:

```bash
npm run optimize:images
```

Lệnh này tự tạo ảnh WebP nhẹ trong `public/images/`. Website chỉ tải WebP để trang mượt hơn; không cần chỉnh code. QR giữ trực tiếp tại `public/images/qr.jpg`.

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

Gửi duy nhất link `https://thao-dat-wedding.pages.dev` cho tất cả khách mời.
