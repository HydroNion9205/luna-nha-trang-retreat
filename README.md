#  Luna Nha Trang Retreat — Website Đặt Phòng Khách Sạn

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Lucide_React-1.x-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel" />
</p>

Website Single Page Application (SPA) giới thiệu và hỗ trợ đặt phòng trực tuyến dành cho khách sạn nghỉ dưỡng cao cấp **Luna Nha Trang Retreat** — tọa lạc trên vách đá nhìn ra vịnh biển Nha Trang thơ mộng. Đồ án thiết kế theo phong cách tối giản hiện đại (Modern Minimalism) hướng tới trải nghiệm người dùng cao cấp (Premium UX/UI).

---

## 🌟 Tính Năng Nổi Bật Đã Hiện Thực Hóa

- 🎥 **Hero Section Fullscreen Video** — Nền video biển động (`/videos/hero-sea.mp4`) tự động phát, lặp vô hạn, tắt tiếng phủ kín 100vh. Phủ lớp overlay mờ giúp nổi bật tiêu đề và khẩu hiệu của resort.

- 📅 **Thanh Đặt Phòng BookingBar Độc Lập** — Khung chọn ngày nhận/trả phòng và số lượng khách được đóng gói thành Section riêng biệt, hỗ trợ Smooth Anchor Scroll tự động tránh bị thanh Navbar che khuất.

- 🍽️ **Module Thực Đơn Ẩm Thực (Dining Modal)** — Tích hợp tính năng "Xem thực đơn đầy đủ" dạng Modal Pop-up hiện đại, chia thành 4 danh mục ẩm thực chính (Khai vị, Món chính, Tráng miệng, Đồ uống) chuyển đổi mượt mà bằng tab động.

- 👥 **Bộ Lọc Dung Lượng Khách Hàng Thông Minh** — Khung chọn số lượng khách lưu trú được chuẩn hóa gồm 2 tùy chọn: "1 Người" và "2 Người". Hạng phòng đơn *Grand De Luxe* (tối đa 1 người) tự động bị loại khi chọn 2 người, tránh lỗi quá tải dung lượng.

- 🌿 **Giao Diện Trải Nghiệm (Experiences)** — 6 hoạt động curated (Yoga bình minh, Lặn biển, Vẽ tranh thủy mặc, Du thuyền hoàng hôn, Spa khoáng nóng, Lớp học nấu ăn) hiển thị dạng thẻ nằm ngang với **ảnh thực tế làm nền**. Mặc định hiển thị tiêu đề & thời gian; khi hover hiện thêm nội dung mô tả trải nghiệm với hiệu ứng trượt mượt mà.

- 🗓️ **Quy Trình Đặt Phòng 3 Bước** — Modal đặt phòng được nâng cấp thành luồng 3 bước rõ ràng với thanh tiến trình trực quan:
  1. **Tìm kiếm** — Xem lại tóm tắt phòng, ngày nhận/trả, số đêm, tổng tiền và chính sách hủy.
  2. **Điền thông tin** — Form thu thập họ tên, email, số điện thoại (có validate real-time) và yêu cầu đặc biệt.
  3. **Nhận mã xác nhận** — Hiển thị mã đặt phòng `LNA-XXXXXXXXX` theo font monospace nổi bật cùng toàn bộ chi tiết đơn hàng.

- 🔒 **Kiểm Tra Xung Đột Lịch Đặt Phòng** — Logic ngăn đặt cùng phòng trong khoảng thời gian chồng lên nhau. Hệ thống phát hiện mọi kiểu chồng lấn (trùng hoàn toàn, một phần, hoặc bao trùm) và hiển thị thông báo lỗi rõ ràng kèm mã đặt phòng xung đột và ngày bị chiếm.

- 💾 **Hệ Thống Quản Lý Đặt Phòng Client-side** — Đặt phòng và Hủy phòng trực quan. Trạng thái đồng bộ tự động với `localStorage` (`luna_bookings`) giúp dữ liệu không bị mất khi làm mới trang (F5).

- 🛠️ **Tối Ưu Hóa Development Server** — Cấu hình file watcher của Vite bỏ qua các tệp tạm nhằm loại bỏ lỗi crash server `EBUSY: resource busy or locked` trên Windows.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
KhachSan/
├── public/
│   ├── images/               # Hình ảnh thực tế chất lượng cao
│   │   ├── la-mer.jpg
│   │   ├── grand-de-luxe.jpg
│   │   ├── angelina-suite.jpg
│   │   ├── romantic.jpg
│   │   ├── yoga.jpg           # Ảnh nền thẻ Yoga Bình Minh
│   │   ├── lanbien.jpg        # Ảnh nền thẻ Lặn Biển Nha Trang
│   │   ├── tranhthuymac.jpg   # Ảnh nền thẻ Vẽ Tranh Thủy Mặc
│   │   ├── duthuyen.jpg       # Ảnh nền thẻ Du Thuyền Hoàng Hôn
│   │   ├── spakhoang.jpg      # Ảnh nền thẻ Spa & Khoáng Nóng
│   │   ├── lophocnauan.jpg    # Ảnh nền thẻ Lớp Học Nấu Ăn
│   │   └── footer.jpg
│   ├── videos/
│   │   └── hero-sea.mp4       # Video nền Hero section
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Navbar sticky, hiệu ứng scroll mờ nền kính
│   │   ├── Hero.jsx           # Banner 100vh với video nền động
│   │   ├── BookingBar.jsx     # Khung nhập tham số tìm kiếm phòng nhanh
│   │   ├── Concept.jsx        # Triết lý nghệ thuật — lưới ảnh không gian
│   │   ├── Rooms.jsx          # Hiển thị danh sách phòng nổi bật
│   │   ├── RoomCard.jsx       # Thẻ phòng chi tiết + Modal thông số + Data rooms[]
│   │   ├── Dining.jsx         # Fine Dining La Mer + Modal thực đơn chi tiết
│   │   ├── Experiences.jsx    # Grid 6 hoạt động, ảnh làm nền, hover hiện mô tả
│   │   ├── Footer.jsx         # Chân trang + Form đăng ký Newsletter
│   │   └── SearchResults.jsx  # Trang kết quả lọc, modal đặt phòng 3 bước & quản lý đơn đặt
│   ├── context/
│   │   └── BookingContext.jsx # State toàn cục: view, searchParams, bookings, checkConflict
│   ├── App.jsx                # Root component điều phối view switch
│   ├── main.jsx               # Điểm khởi chạy ứng dụng React
│   └── index.css              # Design System Tailwind CSS v4 (@theme)
├── index.html
├── vercel.json                # Cấu hình SPA routing & cache cho Vercel
├── vite.config.js             # Cấu hình watcher chống EBUSY trên Windows
├── package.json
├── README.md
└── HUONG_DAN.md               # Hướng dẫn tự tay làm lại từng bước
```

---

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **React** | ^19.x | Thư viện xây dựng giao diện người dùng dựa trên Component |
| **Vite** | ^8.x | Môi trường phát triển và đóng gói ứng dụng (SPA Bundler) |
| **Tailwind CSS** | ^4.x | Framework định kiểu giao diện theo triết lý Utility-First |
| **lucide-react** | ^1.x | Thư viện icon vector đơn sắc đồng bộ |

---

## 🚀 Cài Đặt & Chạy Dự Án Trên Máy Cá Nhân

### Yêu Cầu Hệ Thống
- **Node.js** ≥ 18.x
- **npm** (đi kèm Node.js)

### Bước 1: Clone Repository
```bash
git clone https://github.com/HydroNion9205/luna-nha-trang-retreat.git
cd luna-nha-trang-retreat
```

### Bước 2: Cài Đặt Các Dependencies
```bash
npm install
```

### Bước 3: Khởi Chạy Local Dev Server
```bash
npm run dev
```
Trình duyệt sẽ tự động chạy dự án tại địa chỉ: **http://localhost:5173**

### Các Câu Lệnh Hữu Ích Khác
- `npm run build`: Tạo bản đóng gói tối ưu hóa cho môi trường Production (lưu vào thư mục `dist/`).
- `npm run preview`: Chạy thử bản build Production trên máy local.

---

## 🗓️ Luồng Đặt Phòng 3 Bước

```
[Bước 1 — Tìm kiếm]   →   [Bước 2 — Điền thông tin]   →   [Bước 3 — Nhận mã xác nhận]
  Tóm tắt phòng             Form: Họ tên, Email,              Mã LNA-XXXXXXXXX
  Ngày / Số đêm             SĐT, Yêu cầu đặc biệt            Chi tiết đơn đặt phòng
  Tổng tiền                 Validate real-time                Lưu vào localStorage
  Chính sách hủy            Kiểm tra xung đột lịch
```

### Kiểm Tra Xung Đột Lịch
Hệ thống sử dụng hàm `checkConflict(roomId, checkIn, checkOut, bookings)` để phát hiện đặt phòng trùng lịch trước khi xác nhận. Điều kiện xung đột:

```
newCheckIn < existingCheckOut  AND  newCheckOut > existingCheckIn
```

Bắt được mọi kiểu chồng lấn: trùng hoàn toàn, một phần đầu, một phần cuối, hoặc bao trùm.

---

## 🌐 Deploy Lên Vercel

Dự án đã được cấu hình tối ưu để sẵn sàng deploy tự động lên **Vercel** thông qua việc kết nối GitHub Repository.

### Cấu Hình SPA Routing và Cache (`vercel.json`)
Tệp `vercel.json` ở thư mục gốc đảm bảo cơ chế Client-side Router hoạt động bình thường và ảnh được cache tối ưu:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

<p align="center">
  Dự án được thực hiện bởi nhóm sinh viên dành cho <strong>Luna Nha Trang Retreat</strong><br/>
  Hotline hỗ trợ: <a href="tel:+84368789135">+84 368 789 135</a> · 
  Email: <a href="mailto:hydronion14598@gmail.com">hydronion14598@gmail.com</a>
</p>
