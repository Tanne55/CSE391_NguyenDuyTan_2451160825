# 📋 TRẢ LỜI PHIẾU BÀI TẬP 10
# ASYNC JAVASCRIPT & API INTEGRATION

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

**Thứ tự output:**

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

**Giải thích Event Loop, Microtask Queue, Macrotask Queue:**

JavaScript có 3 hàng đợi chính:

1. **Call Stack** — Nơi thực thi code đồng bộ
2. **Microtask Queue** — Hàng đợi ưu tiên cao (Promises, queueMicrotask)
3. **Macrotask Queue** — Hàng đợi ưu tiên thấp (setTimeout, setInterval, I/O)

**Event Loop hoạt động:**
1. Chạy hết code đồng bộ trong Call Stack
2. Khi Call Stack rỗng → xử lý **TẤT CẢ** Microtasks (Promises)
3. Sau khi Microtask Queue rỗng → lấy **1** Macrotask (setTimeout) chạy
4. Lặp lại: Check Microtasks → 1 Macrotask → Check Microtasks...

**Phân tích từng bước:**

```javascript
console.log("1 - Start");                    // → Call Stack, in ngay
setTimeout(() => console.log("2 - ..."), 0); // → Macrotask Queue
Promise.resolve().then(() => console.log("3 - Promise")); // → Microtask Queue
console.log("4 - End");                      // → Call Stack, in ngay
setTimeout(() => console.log("5 - ..."), 100); // → Macrotask Queue (delay 100ms)
Promise.resolve().then(() => {
    console.log("6 - Promise 2");            // → Microtask Queue
    setTimeout(() => console.log("7 - ..."), 0); // → Macrotask Queue (sau khi Promise chạy)
});
```

**Thứ tự thực thi:**
1. Call Stack: "1 - Start", "4 - End"
2. Microtask Queue: "3 - Promise", "6 - Promise 2" (chạy hết trước khi sang Macrotask)
3. Macrotask: "2 - Timeout 0ms" (setTimeout đầu tiên)
4. Macrotask: "7 - Nested timeout" (được thêm vào sau khi Promise 2 chạy)
5. Macrotask: "5 - Timeout 100ms" (delay 100ms nên chạy sau)

---

### Câu A2 (5đ) — Fetch API

**Giải thích từng dòng:**

```javascript
async function getData() {
    try {
        // 1. await fetch(...) — fetch trả về gì? Tại sao cần await?
        const response = await fetch("https://api.example.com/data");
```

**1. `await fetch(...)`:**
- `fetch()` trả về một **Promise** resolve thành **Response object**
- Response chứa metadata: status, headers, ok, statusText...
- Cần `await` vì fetch là **bất đồng bộ** — phải đợi server trả response về

```javascript
        // 2. response.ok — Khi nào false? Liệt kê 3 status codes
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
```

**2. `response.ok`:**
- `ok` là `true` khi status code trong khoảng **200-299** (thành công)
- `ok` là `false` khi:
  - **404 Not Found** — Resource không tồn tại
  - **500 Internal Server Error** — Lỗi server
  - **403 Forbidden** — Không có quyền truy cập

```javascript
        // 3. response.json() — Tại sao cần await lần nữa?
        const data = await response.json();
        return data;
```

**3. `response.json()`:**
- `.json()` cũng trả về **Promise** (không phải data trực tiếp)
- Vì phải **parse** body từ text → JSON object (quá trình bất đồng bộ)
- Cần `await` lần 2 để đợi parsing hoàn tất

```javascript
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

**4. `try...catch` — Catch những lỗi gì?**

Catch được:
- ✅ **Network error** — Mất mạng, DNS fail, CORS error
- ✅ **JSON parse error** — Response body không phải JSON hợp lệ
- ✅ **Error được throw thủ công** — `throw new Error(...)` khi `!response.ok`
- ❌ **KHÔNG catch status 404/500** tự động — phải check `response.ok` và throw manually

---

### Câu A3 (5đ) — Promise States

**Sơ đồ 3 trạng thái Promise:**

```
                    ┌─────────────┐
                    │   Pending   │ (Đang chờ)
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
      ┌───────────────┐         ┌──────────────┐
      │   Fulfilled   │         │   Rejected   │
      │  (Thành công) │         │   (Thất bại) │
      └───────────────┘         └──────────────┘
           .then()                   .catch()
```

**Callback Hell là gì?**

Callback Hell (Pyramid of Doom) là hiện tượng lồng nhiều callback functions, khiến code khó đọc và maintain:

```javascript
// Callback Hell — 4 cấp lồng nhau
getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getPaymentInfo(details.paymentId, (payment) => {
                console.log(payment);
            });
        });
    });
});
```

**Refactor thành async/await:**

```javascript
async function getUserPayment(userId) {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const payment = await getPaymentInfo(details.paymentId);
    return payment;
}

// Sử dụng
const payment = await getUserPayment(userId);
console.log(payment);
```

**Ưu điểm:**
- Code đọc như đồng bộ, dễ hiểu
- Error handling tập trung bằng try/catch
- Không còn "pyramid" lồng nhau