---
date: 2026-09-13
topic: wedding-blessing-options
---

# Study Report: Lời chúc phúc

## Summary

Khuyến nghị dùng Tally nhúng vào trang. Không cần database, backend hay tài khoản của khách. Chủ website xem và xuất lời chúc trong dashboard Tally. Hợp với website cưới ngắn hạn.

Nếu bắt buộc lời chúc xuất hiện công khai ngay trên website, dùng Supabase sau. Giải pháp đó cần bảng dữ liệu, chính sách RLS và chặn spam nên không phải lựa chọn tối giản.

## Findings

| Phương án | Phù hợp | Đổi lại |
| --- | --- | --- |
| Tally embed | Form tên + lời chúc, lưu trong dashboard; miễn phí và không giới hạn response | Lời chúc không hiển thị công khai trên web; có branding Tally |
| Supabase | Form và danh sách lời chúc nằm hoàn toàn trong website | Phải tạo DB, RLS, rate-limit/captcha và xử lý spam |
| Google Form | Nhanh nhất | Thiết kế lệch tông, trải nghiệm chuyển sang Google |

## Recommendation

Tạo Tally form gồm `Tên của bạn` và `Lời chúc`, bật reCAPTCHA và chống gửi trùng, rồi nhúng vào section "Gửi lời chúc". Sau đám cưới có thể export lời chúc hoặc tắt form trong Tally mà không sửa code.

## Sources

- https://tally.so/help/features
- https://tally.so/help/faq
- https://tally.so/help/how-to-embed-a-free-form-in-lovable
- https://supabase.com/docs/guides/database/postgres/row-level-security

## Unresolved Questions

- Có cần hiển thị công khai lời chúc mới gửi trên website không?
