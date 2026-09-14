export const wedding = {
  groom: { name: 'Ngọc Đạt', role: 'Chú rể', photo: '/images/groom.webp' },
  bride: { name: 'Nguyễn Thảo', role: 'Cô dâu', photo: '/images/bride.webp' },
  displayDate: '26 . 09 . 2026  •  01 . 10 . 2026',
  ceremonies: [
    { title: 'Vu Quy', startAt: '2026-09-26T10:30:00+07:00', date: '10:30 · Thứ Bảy, 26.09.2026', venue: 'Cử hành tại tư gia nữ\nThăng Điền, Đà Nẵng', mapUrl: 'https://maps.app.goo.gl/W4fzK1KtSxzHCv2M9' },
    { title: 'Thành Hôn', startAt: '2026-10-01T11:00:00+07:00', date: '11:00 · Thứ Năm, 01.10.2026', venue: 'Cử hành tại Sảnh A - Tầng 1 - Khách sạn Mê Kông\n66 Lê Duẩn, Phường Đông Hà, Quảng Trị', mapUrl: 'https://maps.app.goo.gl/C9f2EC2R3LoofHZr6' },
  ],
  attireNote: 'Chỉ cần mặc bộ đẹp nhất và tới quẩy hết mình cùng bọn mình nha!',
  gallery: Array.from({ length: 10 }, (_, index) => `/images/gallery-${String(index + 1).padStart(2, '0')}.webp`),
  gifts: {
    groom: { owner: 'Mừng cưới', bank: 'Viettinbank', account: '108881436439', qr: '/images/qr.jpg' },
    bride: { owner: 'Mừng cưới', bank: 'Vietcombank', account: '1022565314', qr: '/images/qr-bride.jpg' },
  },
}
