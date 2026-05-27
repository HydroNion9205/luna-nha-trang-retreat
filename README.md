#  Luna Nha Trang Retreat — Website Đặt Phòng Khách Sạn

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Lucide_React-1.x-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel" />
</p>

Website Single Page Application (SPA) cho khách sạn nghỉ dưỡng cao cấp **Luna Nha Trang Retreat** — tọa lạc trên vách đá nhìn ra vịnh biển Nha Trang. Thiết kế theo phong cách tối giản hiện đại (Modern Minimalism) lấy cảm hứng từ Casa Angelina.

---

##  Tính Năng Nổi Bật

-  **Hero Section Fullscreen Video** — Nền video biển động (`/videos/hero-sea.mp4`) tự động phát, lặp vô hạn, tắt tiếng (autoPlay / loop / muted / playsInline) phủ kín 100vh. Phủ overlay mờ để tôn chữ trắng serif.
-  **BookingBar Độc Lập** — Khung tìm kiếm phòng trống là Section riêng biệt nằm dưới Hero (`id="booking-section"`). Hỗ trợ Smooth Anchor Scroll với `scroll-mt-24` tránh bị Navbar che khuất.
-  **Phòng & Suite (Chỉ Xem)** — 3 hạng phòng cao cấp hiển thị bằng ảnh thực tế chất lượng cao. Modal chi tiết phòng mở ra xem thông tin (không có link đặt phòng trực tiếp ở trang chủ).
-  **Fine Dining — La Mer** — Nhà hàng La Mer với ảnh thực tế, kèm 2 khung phụ Wine Cellar & Hải Sản Tươi.
-  **Triết Lý (Concept)** — Ảnh thực tế Tầm Nhìn Vịnh Biển & Hoàng Hôn tại Luna Retreat thay cho minh họa SVG.
-  **Hệ thống Icon Đơn Sắc (Monochrome)** — Tất cả icon trên toàn bộ website (Hotline, Back-to-Top, mạng xã hội) đều đơn màu nhất quán.
-  **Fully Responsive** — Tối ưu Mobile, Tablet và Desktop.
-  **Smooth Animations** — Intersection Observer fade-in, slide-up.
-  **Quản Lý Đặt Phòng** — Trang tìm kiếm phòng trống có đầy đủ tính năng đặt phòng, huỷ phòng, theo dõi lịch sử.
-  **Newsletter Form** — Đăng ký nhận ưu đãi với animation xác nhận.
-  **SEO Optimized** — Meta tags, HTML5 semantic, Open Graph.

---

##  Cấu Trúc Thư Mục

```
KhachSan/
├── public/
│   ├── images/ # Ảnh phải đặt đúng vị trí này
│   │   ├── Angelina_Suite.jpg
│   │   ├── Grand_De_Luxe.jpg
│   │   ├── Romantic_Hideaway.jpg
│   │   ├── La_Mer.jpg
│   │   ├── HaiSan.jpg
│   │   ├── Wine_Cellar.jpg
│   │   ├── TamNhinVinh.jpg
│   │   └── HoangHon.jpg
│   ├── videos/ # Video nền
│   │   └── hero-sea.mp4
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Navbar sticky, scroll effect, mobile menu
│   │   ├── Hero.jsx              # Hero 100vh với video nền động
│   │   ├── BookingBar.jsx        # Khung tìm kiếm phòng (section độc lập)
│   │   ├── Concept.jsx           # Triết lý — lưới ảnh nghệ thuật
│   │   ├── Rooms.jsx             # Grid danh sách phòng
│   │   ├── RoomCard.jsx          # Card phòng + Modal chi tiết + Data rooms[]
│   │   ├── Dining.jsx            # Fine Dining La Mer
│   │   ├── Experiences.jsx       # 6 trải nghiệm curated
│   │   ├── Footer.jsx            # Footer + Newsletter
│   │   └── SearchResults.jsx     # Trang kết quả tìm kiếm & quản lý đặt phòng
│   ├── context/
│   │   └── BookingContext.jsx    # Global state: view, searchParams, bookings
│   ├── App.jsx                   # Root component, layout chính
│   ├── main.jsx                  # Entry point React
│   └── index.css                 # Global styles + Tailwind v4 tokens
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

> **Quan trọng:** Tài nguyên tĩnh (ảnh, video) phải nằm trong `public/images/` và `public/videos/`. Khi dùng trong code, đường dẫn bắt đầu bằng `/images/...` hoặc `/videos/...` (KHÔNG có chữ `public`) để phù hợp chạy trên Vercel.

---

##  Công Nghệ Sử Dụng

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| React | ^19.x | UI Framework |
| Vite | ^8.x | Build tool + Dev server |
| Tailwind CSS | ^4.x | Utility-first CSS |
| @tailwindcss/vite | ^4.x | Plugin tích hợp Tailwind vào Vite |
| lucide-react | ^1.x | Thư viện icon đơn sắc |

---

##  Cài Đặt & Chạy Dự Án Trên Máy

### Yêu Cầu Hệ Thống

- **Node.js** ≥ 18.x — [Tải tại nodejs.org](https://nodejs.org/)
- **npm** ≥ 9.x (đi kèm với Node.js)
- **Git** — [Tải tại git-scm.com](https://git-scm.com/)

### Bước 1: Clone Repository

```bash
git clone https://github.com/"your_username"/luna-nha-trang-retreat.git
cd luna-nha-trang-retreat
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
```

### Bước 3: Thêm File Tài Nguyên (ảnh & video)

Vì file ảnh và video có dung lượng lớn, chúng có thể không được lưu trong Git (xem `.gitignore`). Hãy chép thủ công các file sau vào đúng vị trí:

```
public/
  images/
    Angelina_Suite.jpg
    Grand_De_Luxe.jpg
    Romantic_Hideaway.jpg
    La_Mer.jpg
    HaiSan.jpg
    Wine_Cellar.jpg
    TamNhinVinh.jpg
    HoangHon.jpg
  videos/
    hero-sea.mp4
```

### Bước 4: Chạy Development Server

```bash
npm run dev
```

Website sẽ chạy tại: **http://localhost:5173**

### Các Lệnh Hữu Ích

| Lệnh | Mô Tả |
|------|--------|
| `npm run dev` | Chạy development server (Hot Module Replacement) |
| `npm run build` | Build production bundle vào thư mục `dist/` |
| `npm run preview` | Xem trước production build tại localhost |
| `npm run lint` | Kiểm tra lỗi code với ESLint |

---

##  Hướng Dẫn Git — Commit & Push Lên GitHub

### Lần Đầu Tiên (Khởi Tạo Repository)

```bash
# 1. Khởi tạo Git trong thư mục dự án
git init

# 2. Thêm tất cả files vào staging area
git add .

# 3. Commit đầu tiên
git commit -m "feat: initial commit — Luna Nha Trang Retreat website"

# 4. Đặt tên nhánh chính là main
git branch -M main

# 5. Tạo repo mới trên GitHub rồi kết nối (thay YOUR_USERNAME và REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 6. Push code lên GitHub
git push -u origin main
```

### Workflow Hàng Ngày

```bash
# Kiểm tra trạng thái các file đã thay đổi
git status

# Thêm tất cả thay đổi
git add .

# Commit với message mô tả rõ ràng
git commit -m "style: update Hero section video background"

# Push lên GitHub
git push
```

### Quy Ước Đặt Tên Commit (Conventional Commits)

```
feat:     thêm tính năng mới
fix:      sửa lỗi
style:    chỉnh sửa CSS/giao diện
refactor: cải thiện cấu trúc code (không thay đổi chức năng)
docs:     cập nhật tài liệu
chore:    cập nhật dependencies, cấu hình
```

### Các Lệnh Git Hữu Ích Khác

```bash
# Xem lịch sử commit gọn
git log --oneline

# Tạo nhánh mới cho tính năng
git checkout -b feature/add-gallery-section

# Merge nhánh vào main
git checkout main
git merge feature/add-gallery-section

# Xem thay đổi trước khi commit
git diff

# Hoàn tác thay đổi chưa stage
git checkout -- .

# Xem các remote đã kết nối
git remote -v
```

---

##  Deploy Lên Vercel

Vercel là nền tảng deploy miễn phí lý tưởng cho dự án React/Vite, hỗ trợ tự động deploy khi push code.

### Phương Pháp 1: Kết Nối GitHub với Vercel (Khuyến Nghị)

**Ưu điểm:** Mỗi lần push code lên GitHub, Vercel tự động build và deploy phiên bản mới trong ~60 giây.

#### Bước 1: Tạo Tài Khoản Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Chọn **"Continue with GitHub"**
3. Cấp quyền cho Vercel truy cập GitHub của bạn

#### Bước 2: Import Repository
1. Từ Vercel Dashboard → Click **"Add New..."** → **"Project"**
2. Chọn **"Import Git Repository"**
3. Tìm repo `luna-nha-trang-retreat` → Click **"Import"**

#### Bước 3: Cấu Hình Project
```
Project Name:    luna-nha-trang-retreat
Framework:       Vite                    ← Vercel tự nhận diện
Root Directory:  ./                      ← Để mặc định
Build Command:   npm run build           ← Tự động
Output Dir:      dist                    ← Tự động
```

>  **Lưu ý về file tài nguyên lớn (ảnh/video):** Vercel deploy từ code trong Git. Nếu file ảnh/video không có trong repo (vì dung lượng quá lớn), chúng sẽ không hiển thị trên Vercel. Giải pháp:
> - **Cách 1:** Commit ảnh vào Git (chỉ phù hợp nếu tổng dung lượng < 100MB).
> - **Cách 2:** Dùng dịch vụ CDN như [Cloudinary](https://cloudinary.com) hoặc [Supabase Storage](https://supabase.com) để host ảnh/video, rồi sửa đường dẫn trong code thành URL tuyệt đối.
> - **Cách 3:** Dùng `vercel.json` để cấu hình bổ sung (xem bên dưới).

#### Bước 4: Deploy
1. Click **"Deploy"** — Vercel sẽ build và deploy tự động
2. Sau ~2 phút, website live tại: `https://luna-nha-trang-retreat.vercel.app`

#### Tự Động Deploy Sau Mỗi Lần Push

```bash
git add .
git commit -m "feat: update booking section layout"
git push
# → Vercel nhận webhook → Build → Deploy trong ~60 giây
```

---

### Phương Pháp 2: Deploy bằng Vercel CLI

```bash
# Cài Vercel CLI toàn cục
npm install -g vercel

# Đăng nhập vào Vercel
vercel login

# Deploy từ thư mục dự án (preview)
vercel

# Deploy lên production
vercel --prod
```

---

### Cấu Hình Vercel (vercel.json)

Tạo file `vercel.json` ở thư mục gốc để cấu hình SPA routing và cache cho tài nguyên tĩnh:

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
    },
    {
      "source": "/videos/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

##  Tùy Chỉnh Nội Dung

### Thay Đổi Thông Tin Khách Sạn

| File | Nội Dung Có Thể Chỉnh |
|------|-----------------------|
| `Header.jsx` | Logo, số điện thoại, navigation links |
| `Hero.jsx` | Video nền, tiêu đề, subtitle, thống kê |
| `BookingBar.jsx` | Các tùy chọn số khách, nút tìm kiếm |
| `Concept.jsx` | Nội dung triết lý, quotes, ảnh minh họa |
| `RoomCard.jsx` | Tên phòng, giá (₫), mô tả, đường dẫn ảnh |
| `Dining.jsx` | Menu, thông tin nhà hàng, ảnh |
| `Experiences.jsx` | Các trải nghiệm, giờ giấc, mô tả |
| `Footer.jsx` | Địa chỉ, email, hotline, mạng xã hội |

### Thay Đổi Giá Phòng

Mở `src/components/RoomCard.jsx`, tìm mảng `rooms[]` và sửa trường `price` (đơn vị: VNĐ):

```js
const rooms = [
  {
    name: 'Angelina Suite',
    price: 4800000,   // ← Sửa giá tại đây
    ...
  },
]
```

### Thay Đổi Số Điện Thoại

Tìm và thay thế toàn bộ `+84368789135` trong các file:
- `src/App.jsx` (nút hotline nổi)
- `src/components/Header.jsx` (navbar + mobile menu)
- `src/components/Rooms.jsx` (CTA cuối danh sách phòng)
- `src/components/Footer.jsx` (thông tin liên hệ)

### Thay Đổi Màu Sắc

Mở `src/index.css` và chỉnh sửa trong block `@theme`:

```css
@theme {
  --color-ocean-700: #0369a1;    /* Màu chính ocean blue */
  --color-luxury-gold: #c9a84c;  /* Màu vàng gold */
}
```

---

<p align="center">
  Được tạo với tình yêu cho <strong>Luna Nha Trang Retreat</strong><br/>
  Hotline: <a href="tel:+84368789135">+84 368 789 135</a> · 
  Email: <a href="hydronion14598@gmail.com">hydronion14598@gmail.com</a>
</p>
