# PBT_06 — CSS FRAMEWORKS (CẢ HAI TRACK)

> Đề bài: chọn **1 track** để nộp chính thức. Repo này làm **cả Bootstrap (A) và Tailwind (B)** để học/so sánh.

---

# 🅱️ TRACK A — BOOTSTRAP 5

## PHẦN A — ĐỌC HIỂU (Bootstrap)

### Câu A1 — Grid System

| Kích thước | &lt; 768px | 768px – 991px | ≥ 992px |
|------------|------------|---------------|---------|
| **Số cột** | 1 | 2 | 4 |
| **Box layout** | 4 hàng (full width) | 2×2 | 1 hàng × 4 cột |

**`col-md-6`:** từ `md` (≥768px) mỗi box chiếm 6/12 = 50%.  
**Không cần `col-sm-12`:** `col-12` đã full width dưới 768px; `col-md-6` ghi đè từ tablet lên.

### Câu A2 — Utilities & Components

1. **`d-none d-md-block`:** ẩn mobile; từ ≥768px hiện `display: block`.
2. **Spacing:** `mt-3` (margin-top 1rem), `px-4` (padding ngang 1.5rem), `mb-auto`, `py-2`, `ms-lg-4`.
3. **Container:** `.container` max-width + căn giữa; `.container-fluid` 100% width; `.container-md` fluid đến md rồi container.

## PHẦN C — PHÂN TÍCH (Bootstrap)

### C1 — Tùy biến `$primary` → `#E63946`

SASS custom → import trước Bootstrap → compile `custom-bootstrap.css`. Không nên override `.btn-primary { background: red }` vì mất đồng bộ hover/focus/outline và khó upgrade.

### C2 — CSS thuần vs Bootstrap

Bootstrap: ít CSS tự viết, nhanh, khó branding độc quyền. CSS thuần: tự do, nhiều dòng hơn. Nên dùng Bootstrap cho MVP/dashboard; không nên khi cần bundle cực nhẹ + UI độc nhất.

### File Bootstrap (Track A)

| Bài | File |
|-----|------|
| B1 | `bootstrap_landing.html` |
| B2 | `bootstrap_dashboard.html` |

---

# 🌊 TRACK B — TAILWIND CSS

> Tài liệu tham chiếu: Tailwind CSS Utilities, Responsive, States

---

# PHẦN A — ĐỌC HIỂU (Tailwind)

## Câu A1 — Utility Classes

```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg 
            hover:shadow-xl transition-shadow duration-300">
```

| Class | CSS tương đương |
|-------|-----------------|
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `justify-between` | `justify-content: space-between` |
| `p-4` | `padding: 1rem` (16px) |
| `bg-white` | `background-color: #fff` |
| `shadow-md` | `box-shadow` mức medium |
| `rounded-lg` | `border-radius: 0.5rem` |
| `hover:shadow-xl` | Khi hover → shadow lớn hơn |
| `transition-shadow` | Transition cho thuộc tính box-shadow |
| `duration-300` | Thời gian transition 300ms |

```html
<img class="w-16 h-16 rounded-full object-cover" ...>
```

| Class | CSS tương đương |
|-------|-----------------|
| `w-16` | `width: 4rem` (64px) |
| `h-16` | `height: 4rem` |
| `rounded-full` | `border-radius: 9999px` |
| `object-cover` | `object-fit: cover` |

```html
<div class="ml-4 flex-1">
```

| Class | CSS tương đương |
|-------|-----------------|
| `ml-4` | `margin-left: 1rem` |
| `flex-1` | `flex: 1 1 0%` — chiếm phần còn lại |

```html
<h3 class="text-lg font-semibold text-gray-800 truncate">
```

| Class | CSS tương đương |
|-------|-----------------|
| `text-lg` | `font-size: 1.125rem` |
| `font-semibold` | `font-weight: 600` |
| `text-gray-800` | Màu chữ gray-800 |
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |

```html
<p class="text-sm text-gray-500">
```

| Class | CSS tương đương |
|-------|-----------------|
| `text-sm` | `font-size: 0.875rem` |
| `text-gray-500` | Màu chữ gray-500 |

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-md 
               hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
```

| Class | CSS tương đương |
|-------|-----------------|
| `px-4` | `padding-left/right: 1rem` |
| `py-2` | `padding-top/bottom: 0.5rem` |
| `bg-blue-500` | Nền xanh 500 |
| `text-white` | Chữ trắng |
| `rounded-md` | `border-radius: 0.375rem` |
| `hover:bg-blue-600` | Hover → nền đậm hơn |
| `focus:ring-2` | Focus → ring 2px |
| `focus:ring-blue-300` | Màu ring xanh nhạt |

---

## Câu A2 — Responsive & States

### 1. Prefix responsive (`md:`, `lg:`, `xl:`)

Áp dụng utility **từ breakpoint đó trở lên** (mobile-first).

`md:grid-cols-2 lg:grid-cols-4` nghĩa là:

| Viewport | Grid columns |
|----------|--------------|
| &lt; 768px | 1 cột (mặc định, không có prefix) |
| ≥ 768px (`md`) | 2 cột |
| ≥ 1024px (`lg`) | 4 cột |

### 2. State modifiers

| Modifier | Khi nào áp dụng |
|----------|-----------------|
| `hover:` | Con trỏ hover lên element |
| `focus:` | Element được focus (keyboard/tab) |
| `active:` | Đang nhấn chuột (mousedown) |
| `group-hover:` | Khi **cha** có class `group` đang được hover → style con |

### 3. Ẩn mobile, hiện flex từ tablet

Tương đương Bootstrap `d-none d-md-flex`:

```html
class="hidden md:flex"
```

- `hidden` → `display: none` (mobile)
- `md:flex` → từ ≥768px: `display: flex`

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tailwind vs CSS thuần

**Component:** Product card (PBT_04 `flexbox.css` / PBT_05 responsive).

| Tiêu chí | CSS thuần | Tailwind (HTML) |
|----------|-----------|-----------------|
| **Kích thước file** | HTML gọn + file `.css` riêng (~100+ dòng) | HTML dài (nhiều class) + CSS build nhỏ (chỉ class dùng) |
| **Maintainability** | Logic tách CSS — dễ đọc HTML | HTML “ồn” class; cần quen utility; đổi style = sửa class trực tiếp |
| **Reusability** | Class BEM/component tái dùng | Lặp chuỗi class; gom bằng `@apply` trong build hoặc component framework (Vue/React) |

**`@apply`:** Trong file CSS build Tailwind, gom utilities thành class semantic:

```css
@layer components {
  .card-product {
    @apply rounded-lg shadow-md hover:shadow-xl transition-shadow;
  }
}
```

## Câu C2 — Performance

### 1. HTML dài nhưng CSS output nhỏ hơn Bootstrap?

Bootstrap ship **toàn bộ** grid, components, utilities (~200KB+ minified). Tailwind **JIT/Purge** chỉ giữ class **thực sự xuất hiện** trong HTML/JS → file CSS cuối thường **vài KB–vài chục KB**.

### 2. PurgeCSS / Tailwind JIT

Quét source (HTML, JSX, Vue…) → chỉ **generate CSS cho class tìm thấy**. Loại bỏ hàng nghìn utility không dùng (`bg-fuchsia-900`, `mt-96`, …).

### 3. Khi KHÔNG nên dùng Tailwind (2 tình huống)

1. **Email templates** — hỗ trợ utility class kém, cần inline CSS cổ điển.
2. **Dự án bắt buộc design system riêng phức tạp** với component API chặt — team đã có hệ thống SCSS/BEM lớn, migrate Tailwind tốn kém hơn lợi ích.

---

# PHẦN B — FILE NỘP (TỔNG HỢP)

| Track | Bài | File |
|-------|-----|------|
| **Bootstrap** | B1 Landing | `bootstrap_landing.html` |
| **Bootstrap** | B2 Dashboard | `bootstrap_dashboard.html` |
| **Tailwind** | B1 Landing | `tailwind_landing.html` |
| **Tailwind** | B2 Components | `tailwind_components.html` |

**Tailwind dark mode:** Bấm 🌙 trên `tailwind_landing.html` → toggle class `dark` trên `<html>`.

**Screenshot gợi ý:** mỗi landing ở 375px / 768px / 1440px + (Tailwind) dark mode.
