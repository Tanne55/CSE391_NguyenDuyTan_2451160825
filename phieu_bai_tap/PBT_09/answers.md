# 📋 TRẢ LỜI PHIẾU BÀI TẬP 09
# DOM MANIPULATION & EVENTS

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

**1. DOM Tree (sơ đồ cây):**

```
document
└── div#app
    ├── header
    │   ├── h1 ("Todo App")
    │   └── nav
    │       ├── a.active ("All")
    │       ├── a ("Active")
    │       └── a ("Completed")
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button ("Add")
        └── ul#todoList
            ├── li.todo-item ("Learn HTML")
            └── li.todo-item.completed ("Learn CSS")
```

**2. querySelector cho mỗi yêu cầu:**

```javascript
// Chọn thẻ <h1>
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoInput");
// hoặc: document.querySelector("#todoForm input")

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("a.active");

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");
// hoặc: document.querySelector("#todoList li")

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a");
```

---

### Câu A2 (5đ) — innerHTML vs textContent

**Sự khác nhau:**

| | `innerHTML` | `textContent` |
|---|---|---|
| Trả về | HTML markup (bao gồm tags) | Chỉ text thuần (bỏ hết tags) |
| Gán giá trị | Parse HTML → render DOM elements | Chèn text thuần (không parse HTML) |
| Performance | Chậm hơn (phải parse HTML) | Nhanh hơn |
| Bảo mật | Có thể bị XSS | An toàn |

**Khi nào dùng:**
- `innerHTML`: Khi cần chèn HTML có cấu trúc (tags, attributes) từ nguồn TIN CẬY
- `textContent`: Khi chỉ cần hiển thị text, đặc biệt khi text đến từ user input

**Lỗ hổng XSS với innerHTML:**

```javascript
// User nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Browser sẽ tạo thẻ <img>, src=x lỗi → trigger onerror → chạy JS tùy ý
```

**Cách sửa:**
```javascript
// Cách 1: Dùng textContent (an toàn nhất)
document.querySelector("#result").textContent = userInput;

// Cách 2: Escape HTML trước khi dùng innerHTML
function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
document.querySelector("#result").innerHTML = escapeHTML(userInput);
```

---

### Câu A3 (5đ) — Event Bubbling

**Khi click vào button, output:**
```
BUTTON
INNER
OUTER
```

Giải thích: Event bubbling — sự kiện "nổi bọt" từ element được click lên các parent. Thứ tự: button (target) → #inner → #outer.

**Nếu uncomment `e.stopPropagation()`, output:**
```
BUTTON
```

Giải thích: `stopPropagation()` ngăn event tiếp tục bubble lên parent. Chỉ handler trên button được gọi, #inner và #outer không nhận được event.

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

**Danh sách lỗi:**

**Lỗi 1:** `addEventListener("onclick", ...)` — sai tên event
- Vị trí: `document.querySelector("#decrementBtn").addEventListener("onclick", ...)`
- Giải thích: Tên event trong `addEventListener` KHÔNG có prefix "on". `onclick` là property, còn event name là `"click"`.
- Sửa: `addEventListener("click", ...)`

**Lỗi 2:** `countDisplay = count` — gán lại biến const
- Vị trí: Trong handler của `#resetBtn`
- Giải thích: `countDisplay` là DOM element (const). Dòng này gán lại biến thay vì cập nhật nội dung. Cần dùng `.textContent` hoặc `.innerHTML`.
- Sửa: `countDisplay.textContent = count;`

**Lỗi 3:** `historyList.innerHTML = null` — gán null
- Vị trí: Trong handler của `#resetBtn`
- Giải thích: Gán `null` sẽ hiển thị text "null". Muốn xóa nội dung phải gán chuỗi rỗng.
- Sửa: `historyList.innerHTML = "";`

**Lỗi 4:** `item.remove` — thiếu dấu `()`
- Vị trí: Trong handler `#clearHistory`
- Giải thích: `remove` là method, cần gọi bằng `remove()`. Không có `()` thì chỉ tham chiếu hàm mà không thực thi.
- Sửa: `item.remove();`

**Lỗi 5:** `count = localStorage.getItem("count")` — không parse thành số
- Vị trí: Trong handler `window load`
- Giải thích: `localStorage.getItem()` luôn trả về string. Nếu không convert, `count` sẽ là string "0" thay vì number 0, gây lỗi khi `count++` (thành "01", "011"...).
- Sửa: `count = parseInt(localStorage.getItem("count")) || 0;`

**Lỗi 6:** Load history từ localStorage nhưng không restore event listeners
- Vị trí: Handler `window load` — chỉ restore count, không restore history items
- Giải thích: Khi load lại, các `<li>` trong history được khôi phục qua `innerHTML` nhưng không có event listener để xóa từng item.
- Sửa: Sau khi set `historyList.innerHTML`, cần bind lại events cho các `<li>` hoặc dùng Event Delegation.

**Lỗi 7:** `localStorage.getItem("count")` có thể trả về `null` lần đầu
- Vị trí: Handler `window load`
- Giải thích: Lần đầu mở trang, chưa có data trong localStorage → `getItem` trả về `null` → `parseInt(null)` = `NaN`.
- Sửa: `count = parseInt(localStorage.getItem("count")) || 0;` (dùng `|| 0` fallback)

---

### Câu C2 (7đ) — Performance

**1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?**

- **Bộ nhớ:** Mỗi event listener chiếm bộ nhớ. 1000 listeners = 1000 function references + 1000 closures.
- **Performance:** Khi thêm/xóa elements động (CRUD), phải manually add/remove listeners → dễ memory leak nếu quên.
- **Khởi tạo chậm:** Bind 1000 lần khi page load tốn thời gian.

**Event Delegation giải quyết:**
- Chỉ bind 1 listener lên parent container
- Dùng `e.target` để xác định element nào được click
- Elements thêm/xóa động tự động được handle mà không cần bind lại

```javascript
// BAD: 1000 listeners
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", handleClick);
});

// GOOD: 1 listener (Event Delegation)
document.querySelector("#container").addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        handleClick(e);
    }
});
```

**2. Refactor dùng DocumentFragment:**

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Append vào fragment (trong memory, không gây reflow)
}

document.body.appendChild(fragment);  // 1 lần reflow duy nhất
```

**Giải thích tại sao nhanh hơn:**
- `DocumentFragment` là container ảo tồn tại trong memory, KHÔNG thuộc DOM tree.
- Append vào fragment không trigger reflow/repaint vì browser không cần tính toán layout.
- Khi append fragment vào DOM, browser chỉ thực hiện 1 lần reflow cho toàn bộ 1000 elements.
- Code gốc gọi `appendChild` 1000 lần trực tiếp lên `document.body` → mỗi lần browser phải recalculate layout → 1000 lần reflow = cực chậm.
