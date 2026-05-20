# PBT_06 — TRACK A: BOOTSTRAP 5

> Tài liệu tham chiếu: Bootstrap 5 Grid, Utilities, Components

---

# PHẦN A — ĐỌC HIỂU

## Câu A1 — Grid System

### Bảng layout (4 box)

| Kích thước | &lt; 768px (xs) | 768px – 991px (md) | ≥ 992px (lg) |
|------------|-----------------|---------------------|--------------|
| **Số cột** | 1 | 2 | 4 |
| **Box layout** | 4 hàng, mỗi box full width | 2 hàng × 2 cột | 1 hàng × 4 cột |

**Mobile (&lt; 768px):**
```
┌────────────────┐
│     Box 1      │
├────────────────┤
│     Box 2      │
├────────────────┤
│     Box 3      │
├────────────────┤
│     Box 4      │
└────────────────┘
```

**Tablet (768–991px):**
```
┌────────┬────────┐
│ Box 1  │ Box 2  │
├────────┼────────┤
│ Box 3  │ Box 4  │
└────────┴────────┘
```

**Desktop (≥ 992px):**
```
┌──────┬──────┬──────┬──────┐
│ Box1 │ Box2 │ Box3 │ Box4 │
└──────┴──────┴──────┴──────┘
```

### Câu hỏi thêm

- **`col-md-6` nghĩa là gì?** Từ breakpoint **md** (≥768px) trở lên, cột chiếm **6/12** chiều rộng hàng (= 50%).
- **Tại sao không cần `col-sm-12`?** Class **`col-12`** đã áp dụng cho mọi kích thước (mặc định full width). Từ `md` trở lên, `col-md-6` **ghi đè** phần tablet/desktop; dưới 768px vẫn dùng `col-12` — không cần khai báo lại `col-sm-12`.

---

## Câu A2 — Utilities & Components

### 1. `d-none d-md-block`

| Viewport | Hiển thị? |
|----------|-----------|
| &lt; 768px | **Ẩn** (`d-none`) |
| ≥ 768px | **Hiện** dạng block (`d-md-block`) |

### 2. Năm spacing utilities

| Class | Ý nghĩa |
|-------|---------|
| `mt-3` | `margin-top: 1rem` (spacing scale 3) |
| `px-4` | `padding-left` + `padding-right: 1.5rem` |
| `mb-auto` | `margin-bottom: auto` — đẩy phần tử xuống trong flex container |
| `py-2` | `padding-top` + `padding-bottom: 0.5rem` |
| `ms-lg-4` | `margin-inline-start: 1.5rem` từ breakpoint `lg` |

Bootstrap dùng thang spacing 0–5 (và `auto`), responsive prefix: `mt-md-2`, `p-lg-0`, …

### 3. `.container` vs `.container-fluid` vs `.container-md`

| Class | Hành vi |
|-------|---------|
| `.container` | Max-width theo breakpoint, **căn giữa**, padding hai bên |
| `.container-fluid` | Luôn **100%** chiều rộng viewport |
| `.container-md` | Full width đến khi ≥ **md**, sau đó hành xử như `.container` (max-width cố định) |

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tùy biến Bootstrap

### 1. Đổi `$primary` sang `#E63946`

1. Cài **Sass** + lấy source Bootstrap (npm: `bootstrap` package hoặc clone repo).
2. Tạo file tùy biến, ví dụ `_custom.scss`:
   ```scss
   $primary: #E63946;
   ```
3. Import **trước** khi import Bootstrap:
   ```scss
   @import "custom";
   @import "bootstrap/scss/bootstrap";
   ```
4. **Compile** SCSS → `custom-bootstrap.css` và link vào HTML.
5. Công cụ: `sass`, Vite, Webpack, hoặc `npm run build` của dự án.

### 2. Vì sao không override `.btn-primary { background: red; }`?

- Override trực tiếp dễ **đụng specificity**, khó đồng bộ `hover`, `focus`, `disabled`, `btn-outline-primary`, v.v.
- Biến SASS `$primary` được dùng **xuyên suốt** theme (buttons, links, alerts, form focus…) — đổi một chỗ, đồng bộ toàn hệ.
- Dễ **nâng cấp** phiên bản Bootstrap; override rời rạc dễ vỡ khi update.

---

## Câu C2 — So sánh CSS thuần vs Bootstrap

**Ví dụ:** Navbar responsive + 1 product card (PBT_04/05).

| Tiêu chí | CSS thuần | Bootstrap |
|----------|-----------|-----------|
| **Số dòng CSS** | ~80–150 dòng (layout + responsive + card) | ~0–20 dòng custom; phần lớn là class trong HTML |
| **Thời gian** | Lâu hơn (tự viết grid, breakpoint, reset) | Nhanh hơn khi đã quen class |
| **Tùy biến** | Tự do 100% | Bị khung design Bootstrap; tùy biên sâu cần SASS/build |
| **Khi NÊN dùng Bootstrap** | — | MVP, admin dashboard, team đồng nhất UI, deadline gấp |
| **Khi KHÔNG NÊN** | — | Branding độc quyền, bundle nhẹ tối đa, cần animation/layout rất đặc thù |

**Kết luận:** Bootstrap đổi **tốc độ & nhất quán** lấy **kích thước file + giới hạn visual** nếu không build custom.
