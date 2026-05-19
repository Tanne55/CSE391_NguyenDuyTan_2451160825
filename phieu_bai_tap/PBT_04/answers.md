# PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Mặc định theo normal flow | Có | Các phần tử bình thường trên trang |
| `relative` | Có | Vị trí ban đầu của chính nó | Có | Tinh chỉnh vị trí nhẹ, làm tham chiếu (container) cho `absolute` |
| `absolute` | Không | "Nearest positioned ancestor" (Phần tử cha gần nhất có position khác static) | Có (Cùng phần tử cha) | Badge, tooltip, dropdown menu, modal |
| `fixed` | Không | Viewport (Cửa sổ trình duyệt) | Không (Nằm cố định) | Navbar cố định, nút cuộn lên đầu trang, thanh chat |
| `sticky` | Có | Vị trí ban đầu, đến khi đạt một ngưỡng (top, bottom...) thì tham chiếu viewport | Có (đến ngưỡng thì dính lại) | Sticky header, sticky sidebar, mục lục bài viết |

**Câu hỏi thêm:**
- **Khi nào `absolute` tham chiếu `body`?** Khi không có bất kỳ phần tử cha (hoặc tổ tiên) nào của nó có thuộc tính position khác `static`. Lúc đó nó sẽ lấy `body` (hoặc nói chính xác là initial containing block) làm mốc.
- **Khi nào tham chiếu parent?** Khi phần tử parent đó được set một thuộc tính position khác `static` (thường là người ta set `position: relative` cho parent).
- **"Nearest positioned ancestor" là gì?** Là phần tử tổ tiên (cha, ông nội,...) gần nhất đi ngược lên trên cây DOM mà có thuộc tính `position` không phải là `static` (`relative`, `absolute`, `fixed`, `sticky`).

---

### Câu A2 — Flexbox vs Grid

**Trường hợp 1:**
- **Bố cục:** 1 hàng ngang chứa 4 items. Vì có `flex: 1`, cả 4 items sẽ chia đều không gian của container, tức là mỗi item chiếm 25% chiều rộng.
- **Giải thích:**
```
+--------+ +--------+ +--------+ +--------+
|  item  | |  item  | |  item  | |  item  |
+--------+ +--------+ +--------+ +--------+
```

**Trường hợp 2:**
- **Bố cục:** 3 hàng, 2 cột.
- **Giải thích:** Mỗi item có `width: 45%` và `margin: 2.5%` hai bên (tức là tổng cộng chiếm 45% + 5% = 50% chiều rộng mỗi phần tử). Do có `flex-wrap: wrap`, mỗi hàng sẽ chứa vừa đủ 2 items (50% + 50% = 100%). Vì có 6 items nên rớt xuống thành 3 hàng.
- **Giải thích:**
```
+--------+ +--------+  <- Hàng 1
|  item  | |  item  |
+--------+ +--------+
+--------+ +--------+  <- Hàng 2
|  item  | |  item  |
+--------+ +--------+
+--------+ +--------+  <- Hàng 3
|  item  | |  item  |
+--------+ +--------+
```

**Trường hợp 3:**
- **Bố cục:** 1 hàng ngang chứa 3 items. Item 1 sát lề trái, item 3 sát lề phải, item 2 nằm ở chính giữa. Cả 3 items đều được căn giữa theo chiều dọc. Đây là bố cục điển hình của một thanh Navbar.
- **Giải thích:**
```
+--------+           +--------+           +--------+  
|  item  |           |  item  |           |  item  |  
+--------+           +--------+           +--------+  
```

**Trường hợp 4:**
- **Bố cục:** 1 hàng chứa 3 cột. Cột 1 cố định rộng `200px`, cột 3 cố định rộng `200px`, cột 2 nằm giữa sẽ co giãn để chiếm toàn bộ phần không gian trống còn lại (`1fr`). Ở giữa các cột có khoảng trống `20px`. Cả 3 items sẽ lấp đầy đúng 1 hàng này.
- **Giải thích:**
```
+--------+ +--------+ +--------+  <- 1 hàng
|  200px | |   1fr  | |  200px |  <- item 1,2,3
+--------+ +--------+ +--------+  
```


**Trường hợp 5:**
- **Bố cục:** Lưới chia thành 3 cột bằng nhau (`1fr`). Vì có 7 items, chúng sẽ tự động rớt dòng tạo thành 3 hàng:
  - Hàng 1: 3 items (Cột 1, 2, 3)
  - Hàng 2: 3 items (Cột 1, 2, 3)
  - Hàng 3: 1 item nằm ở cột đầu tiên (ngoài cùng bên trái).

- **Giải thích:**
```
+--------+ +--------+ +--------+  <- Hàng 1
|  item  | |  item  | |  item  |
+--------+ +--------+ +--------+
+--------+ +--------+ +--------+  <- Hàng 2
|  item  | |  item  | |  item  |
+--------+ +--------+ +--------+
+--------+                    <- Hàng 3 (chỉ 1 item, cột 1)
| item 7 |
+--------+
```

---

# PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

| # | Tình huống | Chọn | Giải thích |
|---|------------|------|------------|
| 1 | Navigation bar ngang (logo + menu + buttons) | **Flexbox** | Một hàng, phân bố theo trục chính (`justify-content`, `align-items`). Flexbox tối ưu cho layout 1 chiều. |
| 2 | Lưới ảnh Instagram (3 cột đều, số ảnh không cố định) | **Grid** | Cần lưới 2 chiều: `grid-template-columns: repeat(3, 1fr)` tự xuống hàng khi thêm item. Grid quản lý hàng/cột rõ ràng hơn flex wrap. |
| 3 | Layout blog: main + sidebar | **Grid** (hoặc **kết hợp**) | Bố cục trang 2D: `grid-template-columns: 1fr 300px`. Có thể dùng Grid cho khung trang, Flexbox bên trong từng vùng nếu cần. |
| 4 | Footer 4 cột thông tin | **Grid** | 4 cột song song, đồng đều: `grid-template-columns: repeat(4, 1fr)`. Grid căn cột đều hơn so với flex + width %. |
| 5 | Card sản phẩm (ảnh trên, text giữa, nút dính đáy) | **Flexbox** | Card là container `display: flex; flex-direction: column;` + `margin-top: auto` trên nút đẩy nút xuống đáy dù mô tả dài/ngắn khác nhau. |

---

### Câu C2 — Debug Flexbox

#### Lỗi 1 — Cards không đều chiều cao, nút "Mua" nhảy lên/xuống

**Nguyên nhân:** `.card` không phải flex container theo cột, nên nút không có cơ chế đẩy xuống đáy. Chiều cao card phụ thuộc nội dung từng card → nút không thẳng hàng.

**Code sửa:**

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch; /* các card cùng hàng cao bằng nhau */
}
.card {
    width: 30%;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
}
.card img { width: 100%; }
.card h3 { font-size: 18px; flex-grow: 0; }
.card .btn {
    padding: 10px;
    margin-top: auto; /* đẩy nút xuống đáy card */
}
```

**Screenshot:** Chụp lưới card *trước* (không có flex column + `margin-top: auto`) và *sau* khi sửa — lưu `screenshots/c2_loi1_truoc.png`, `screenshots/c2_loi1_sau.png`.

---

#### Lỗi 2 — Muốn căn giữa ngang + dọc trong 100vh nhưng content dính góc trái trên

**Nguyên nhân:** `.hero` có `display: flex` nhưng thiếu `justify-content` và `align-items` (mặc định `flex-start`).

**Code sửa:**

```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero-content {
    text-align: center;
}
```

**Screenshot:** `screenshots/c2_loi2_truoc.png`, `screenshots/c2_loi2_sau.png`.

---

#### Lỗi 3 — Sidebar bị co khi content quá dài

**Nguyên nhân:** Trong flex container, item mặc định `flex-shrink: 1`. Sidebar có `width: 250px` nhưng vẫn bị co khi `.content` chiếm nhiều chỗ.

**Code sửa:**

```css
.layout { display: flex; }
.sidebar {
    width: 250px;
    flex: 0 0 250px; /* hoặc flex-shrink: 0; */
    min-width: 250px;
}
.content { flex: 1; min-width: 0; }
```

**Screenshot:** `screenshots/c2_loi3_truoc.png`, `screenshots/c2_loi3_sau.png`.
