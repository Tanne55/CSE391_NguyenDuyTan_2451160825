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
