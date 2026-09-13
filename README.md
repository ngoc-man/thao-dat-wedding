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

Lệnh này tự tạo ảnh WebP nhẹ trong `public/images/`. Website chỉ tải WebP để trang mượt hơn; không cần chỉnh code. QR giữ trực tiếp tại `public/images/qr-bride.jpg` và `public/images/qr-groom.jpg`.

> Lệnh nén cần `cwebp` (WebP tools). Nếu Terminal báo `Missing cwebp`, cài WebP tools trước rồi chạy lại lệnh trên.

## Kiểm tra trước khi gửi

```bash
npm run build
```

Nếu lệnh hoàn tất không báo lỗi, website đã build thành công.
