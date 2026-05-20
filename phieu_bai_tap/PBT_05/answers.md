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
