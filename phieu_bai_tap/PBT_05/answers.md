# PHẦN A — KIỂM TRA ĐỌC HIỂU

> Tài liệu tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md`, `16_sass_scss.md`

---

## Câu A1 — Viewport & Mobile-First

### 1. Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

| Thuộc tính | Ý nghĩa |
|------------|---------|
| `width=device-width` | Chiều rộng layout CSS = chiều rộng thật của màn hình thiết bị (không co về ~980px như desktop giả lập). |
| `initial-scale=1.0` | Mức zoom ban đầu 100% — không phóng to/thu nhỏ trang khi load. |

(Có thể thêm `maximum-scale=1` để chặn zoom — nhưng hạn chế accessibility, thường không khuyên dùng.)

### 2. Nếu THIẾU thẻ viewport trên iPhone

Trình duyệt mobile giả định trang là **bản desktop rộng** (~980px), thu nhỏ toàn trang cho vừa màn hình → chữ và nút **rất nhỏ**, phải pinch-zoom mới đọc được. Media queries vẫn có thể chạy theo viewport “ảo” đó, nên layout **không responsive đúng nghĩa** trên điện thoại.

### 3. Mobile-First vs Desktop-First (breakpoint 768px)

**Mobile-First** — CSS mặc định cho mobile, mở rộng khi màn hình lớn hơn:

```css
/* Mặc định: mobile */
.grid { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Desktop-First** — CSS mặc định cho desktop, thu gọn khi màn hình nhỏ hơn:

```css
/* Mặc định: desktop */
.grid { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 767px) {
  .grid { grid-template-columns: 1fr; }
}
```

**Vì sao nên Mobile-First?**

- Ưu tiên tải CSS cần cho mobile trước (phù hợp đa số traffic mobile).
- Tránh “ghi đè” quá nhiều rule desktop bằng `max-width` phức tạp.
- Dễ mở rộng tính năng theo `min-width` (progressive enhancement).

---

## Câu A2 — Breakpoints

(Bootstrap 5 / thông dụng — có thể khác tùy design system)

| Breakpoint | Pixel (min-width) | Thiết bị đại diện | Lưới sản phẩm gợi ý |
|------------|-------------------|-------------------|---------------------|
| Extra small | &lt; 576px | Điện thoại dọc | **1 cột** |
| Small (`sm`) | ≥ 576px | Điện thoại ngang / máy nhỏ | 1–2 cột |
| Medium (`md`) | ≥ 768px | Tablet | **2 cột** |
| Large (`lg`) | ≥ 992px | Laptop | **3 cột** |
| Extra large (`xl`) | ≥ 1200px | Desktop rộng | **3–4 cột** |
| XXL (`xxl`) | ≥ 1400px | Màn hình lớn | **4 cột** |

---

## Câu A3 — Media Queries (width `.container`)

Quy tắc: áp dụng rule có `min-width` **lớn nhất mà vẫn ≤ chiều rộng viewport**.

| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | `100%` (chưa đạt `min-width: 576px`) |
| 600px | `540px` (đạt `min-width: 576px`) |
| 800px | `720px` (đạt `min-width: 768px`) |
| 1000px | `960px` (đạt `min-width: 992px`) |
| 1400px | `1140px` (đạt `min-width: 1200px`) |

---

## Câu A4 — SCSS Basics

### 1. Variables (`$primary-color`)

Lưu giá trị dùng lại (màu, font, breakpoint):

```scss
$primary-color: #0f172a;
.button { background: $primary-color; }
```

### 2. Nesting

Viết selector lồng nhau, compile ra CSS phẳng:

```scss
.card {
  padding: 16px;
  .card-title { font-size: 1.1rem; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.15); }
}
```

### 3. Mixins (`@mixin`, `@include`)

Khối CSS tái sử dụng, có thể nhận tham số:

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero { @include flex-center; }
```

### 4. `@extend` / Inheritance

Một selector **kế thừa** rule của selector khác (gom chung CSS output):

```scss
.btn-base { padding: 8px 16px; border-radius: 4px; }
.btn-primary { @extend .btn-base; background: blue; }
```

### Trình duyệt không đọc `.scss` — cần bước gì?

Trình duyệt chỉ hiểu **CSS thuần**. File SCSS phải **biên dịch** (compile) sang `.css`, ví dụ:

```bash
sass scss/style.scss responsive.css
```

hoặc `npx sass scss/style.scss css/main.css --watch` khi phát triển.

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Phân tích trang web thực

**Trang chọn:** [TIKI VN](https://tiki.vn/) — trang chủ  
**Công cụ:** Chrome DevTools → Toggle device toolbar (`Ctrl+Shift+M`)


| File | Kích thước DevTools |
|------|---------------------|
| `c1_tiki_375px.png` | iPhone SE / Custom **375×667** |
| `c1_tiki_768px.png` | iPad / Custom **768×1024** |
| `c1_tiki_1440px.png` | Responsive / Custom **1440×900** |
| `c1_media_query_1.png` | DevTools → tab **Styles** → rule `@media` (VD: ẩn/hiện sidebar) |

### 2. Phân tích chi tiết

| Tiêu chí | Mobile 375px | Tablet 768px | Desktop 1440px |
|----------|--------------|--------------|----------------|
| **Navigation** | Hamburger ☰ hoặc icon menu; thanh tìm kiếm thu gọn / icon; ít chữ | Search bar dài hơn; menu ngang một phần | Full search + link danh mục; **sidebar danh mục cố định bên trái** |
| **Lưới sản phẩm** | **2 cột** (card nhỏ) | **4 cột** | **5–6 cột** tùy vùng |
| **Ẩn trên mobile** | Sidebar danh mục desktop; footer nhiều cột gộp; banner phụ; một số promo text | Ít ẩn hơn; sidebar vẫn có thể ẩn đến khi ≥ lg | Hiển thị đầy đủ |
| **Font size** | Nhỏ hơn (title ~12–14px, giá ~14px) | Trung bình | Lớn hơn, khoảng cách thoáng |

**Navigation:** Mobile ưu tiên icon + bottom/tab bar (app-like). Desktop mở rộng **cấu trúc 2 vùng**: sidebar + main — điển hình **desktop-first content**, **mobile-first ẩn bớt**.

**Lưới:** Số cột tăng theo `min-width` (Mobile-First trong CSS của họ).

**Ẩn:** Sidebar trái, chuỗi breadcrumb dài, block “gợi ý” phụ thường **display: none** hoặc chuyển thành carousel ngang trên mobile.

**Font:** Dùng `rem` / media query — heading và giá **scale up** từ 768px và 1200px+ (quan sát trong DevTools → Computed).

### 3. Media queries (DevTools)

**Cách tìm:** Elements → chọn `.container` hoặc grid sản phẩm → Styles → cuộn tìm `@media (...)`.

**Ví dụ rule thường gặp trên site thương mại (minh họa):**

```css
/* Ví dụ kiểu rule — tên class có thể khác trên Shopee */
@media (min-width: 768px) {
  .product-list { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1200px) {
  .category-sidebar { display: block; }
  .product-list { grid-template-columns: repeat(6, 1fr); }
}
```

**Screenshot 2 rule:** Chụp panel Styles khi highlight một rule `@media (min-width: …)` đang **active** (không bị gạch ngang) ở từng breakpoint.

---

## Câu C2 — Thiết kế Responsive Strategy (Đặt bàn nhà hàng)

### Wireframe — Mobile (&lt; 768px)

**Ẩn / thu gọn:** Sidebar; bản đồ có thể **ẩn** hoặc thu thành nút “Xem bản đồ”; menu nav → hamburger.

**Form:** Nằm **ngay dưới hero**, full width, 1 cột các input xếp dọc.

```
┌──────────────────────┐
│ LOGO    📞 Gọi đặt  │
├──────────────────────┤
│    HERO (full width) │
├──────────────────────┤
│  FORM ĐẶT BÀN        │
│  [Ngày]              │
│  [Giờ]               │
│  [Số người]          │
│  [Ghi chú]           │
│  [ Gửi yêu cầu ]     │
├──────────────────────┤
│  MÓN ĂN (1 cột)      │
│  ┌────────────────┐  │
│  │ ảnh món 1      │  │
│  └────────────────┘  │
│  ... (6 món xếp dọc) │
├──────────────────────┤
│ [ Xem bản đồ ] (btn) │  ← map ẩn, mở tab/link
├──────────────────────┤
│ FOOTER               │
└──────────────────────┘
```

### Wireframe — Tablet (768px – 1023px)

**Grid món:** **2 cột** × 3 hàng = 6 ảnh.  
**Bản đồ:** Dưới form hoặc **cạnh form** (2 cột: form trái 50% | map phải 50%).  
**Không sidebar** riêng.

```
┌────────────────────────────────┐
│ LOGO              📞 090x xxx  │
├────────────────────────────────┤
│         HERO                   │
├───────────────┬────────────────┤
│ FORM đặt bàn  │  Google Maps   │
├───────────────┴────────────────┤
│ ┌──────┐ ┌──────┐              │
│ │ món1 │ │ món2 │   2 cột     │
│ ├──────┤ ├──────┤              │
│ │ món3 │ │ món4 │              │
│ └──────┘ └──────┘              │
├────────────────────────────────┤
│ FOOTER                         │
└────────────────────────────────┘
```

### Wireframe — Desktop (≥ 1024px)

**Layout:** **2 cột chính** — không sidebar danh mục; có thể **sidebar phải** nhỏ (giờ mở cửa, hotline).

```
┌──────────────────────────────────────────────────┐
│ LOGO                    📞 Đặt bàn: 1900 xxxx    │
├──────────────────────────────────────────────────┤
│              HERO (full width)                   │
├─────────────────────────────┬────────────────────┤
│ FORM (60%)                  │ MAP + Giờ mở cửa   │
│                             │ (sidebar ~40%)   │
├─────────────────────────────┴────────────────────┤
│  MÓN ĂN — grid 3 cột × 2 hàng (6 ảnh)           │
├──────────────────────────────────────────────────┤
│ FOOTER (3–4 cột link)                            │
└──────────────────────────────────────────────────┘
```

| Câu hỏi | Trả lời |
|---------|---------|
| Mobile ẩn gì? | Sidebar phụ; map embed (thay bằng nút); nav phụ |
| Form mobile ở đâu? | Dưới hero, full width |
| Tablet grid món? | **2 cột** |
| Tablet map? | Cạnh form (2 cột) hoặc dưới form |
| Desktop cột? | **2 cột** (nội dung + sidebar info); món **3 cột** |

### CSS skeleton (Mobile-First, Grid)

File tham khảo: `restaurant_skeleton.css` (layout only).

```css
/* restaurant_skeleton.css — PBT_05 C2 */

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

/* --- Mobile default --- */
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.hero {
  min-height: 40vh;
  background: #ccc center/cover no-repeat;
}

.page-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 16px;
}

.booking-form {
  display: grid;
  gap: 12px;
}

.booking-form input,
.booking-form textarea,
.booking-form select {
  width: 100%;
}

.map-wrap {
  display: none; /* mobile: ẩn embed, dùng nút .map-fallback */
}

.map-fallback {
  display: block;
  text-align: center;
  padding: 12px;
}

.dish-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.dish-grid img {
  width: 100%;
  height: auto;
}

.site-footer {
  padding: 24px 16px;
  background: #1a1a1a;
  color: #fff;
}

/* --- Tablet --- */
@media (min-width: 768px) {
  .page-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "hero hero"
      "form map"
      "dishes dishes"
      "footer footer";
  }

  .hero { grid-area: hero; min-height: 50vh; }
  .booking-form { grid-area: form; }
  .map-wrap {
    display: block;
    grid-area: map;
    min-height: 280px;
  }
  .map-fallback { display: none; }

  .dish-grid {
    grid-area: dishes;
    grid-template-columns: repeat(2, 1fr);
  }

  .site-footer { grid-area: footer; }
}

/* --- Desktop --- */
@media (min-width: 1024px) {
  .page-grid {
    grid-template-columns: 1.2fr 0.8fr;
    grid-template-areas:
      "hero hero"
      "form sidebar"
      "dishes dishes"
      "footer footer";
    max-width: 1200px;
    margin: 0 auto;
  }

  .info-sidebar {
    grid-area: sidebar;
  }

  .dish-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .site-footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
```

**HTML gợi ý khớp `grid-area`:**

```html
<div class="page-grid">
  <section class="hero"></section>
  <form class="booking-form">...</form>
  <aside class="info-sidebar"><!-- giờ mở cửa --></aside>
  <div class="map-wrap"><!-- iframe Maps --></div>
  <a href="#" class="map-fallback">Xem bản đồ</a>
  <section class="dish-grid">...</section>
  <footer class="site-footer">...</footer>
</div>
```
