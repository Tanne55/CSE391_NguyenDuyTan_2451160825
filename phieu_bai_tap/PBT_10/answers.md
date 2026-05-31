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

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

**1. Network errors (mất mạng giữa chừng):**

```javascript
async function fetchWithNetworkHandling(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        if (error.message === "Failed to fetch" || error.name === "TypeError") {
            // Network error: mất mạng, DNS fail, CORS
            showNotification("⚠️ Lỗi kết nối mạng. Vui lòng kiểm tra internet.", "error");
            return null;
        }
        throw error; // Re-throw nếu không phải network error
    }
}
```

**2. API errors (500, 404, 429):**

```javascript
async function fetchWithStatusHandling(url) {
    const response = await fetch(url);
    
    if (response.status === 404) {
        showNotification("❌ Không tìm thấy dữ liệu", "warning");
        return null;
    }
    
    if (response.status === 429) {
        showNotification("⏳ Quá nhiều request. Vui lòng thử lại sau 1 phút.", "warning");
        // Có thể tự động retry sau delay
        await delay(60000);
        return fetchWithStatusHandling(url); // Retry
    }
    
    if (response.status >= 500) {
        showNotification("🔧 Server đang bảo trì. Vui lòng thử lại sau.", "error");
        return null;
    }
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

**3. Timeout (API chậm > 10 giây):**

```javascript
function fetchWithTimeout(url, ms = 10000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), ms)
        )
    ]);
}

// Sử dụng:
try {
    const response = await fetchWithTimeout("https://api.slow.com/data", 10000);
    const data = await response.json();
} catch (error) {
    if (error.message === "Request timeout") {
        showNotification("⏱️ Request quá lâu. Vui lòng thử lại.", "warning");
    }
}
```

**4. Retry logic (thử lại 3 lần nếu lỗi network):**

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Exponential backoff: 1s, 2s, 4s
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
}

// Sử dụng:
try {
    const data = await fetchWithRetry("https://api.unreliable.com/data", 3);
    console.log(data);
} catch (error) {
    showNotification("❌ Không thể kết nối sau 3 lần thử", "error");
}
```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi **TẤT CẢ** promises resolve | Ngay khi **1 promise** reject | Cần tất cả data mới xử lý được. VD: Load user + orders + profile cùng lúc — thiếu 1 thì không render được |
| `.allSettled()` | Luôn resolve khi **TẤT CẢ** promises hoàn thành (dù thành công hay thất bại) | **Không bao giờ** reject | Dashboard với nhiều widgets độc lập — 1 widget lỗi không ảnh hưởng các widget khác |
| `.race()` | Khi promise **ĐẦU TIÊN** resolve | Khi promise **ĐẦU TIÊN** reject | Timeout mechanism, load từ nhiều CDN (dùng server nào trả về trước) |
| `.any()` | Khi promise **ĐẦU TIÊN** resolve | Khi **TẤT CẢ** promises reject | Fallback APIs — thử nhiều endpoints, dùng cái nào thành công trước |

**Ví dụ code thực tế:**

```javascript
// 1. Promise.all — Load trang profile (cần đủ data)
async function loadProfile(userId) {
    try {
        const [user, posts, friends] = await Promise.all([
            fetch(`/api/users/${userId}`).then(r => r.json()),
            fetch(`/api/users/${userId}/posts`).then(r => r.json()),
            fetch(`/api/users/${userId}/friends`).then(r => r.json())
        ]);
        renderProfile(user, posts, friends);
    } catch (error) {
        showError("Không thể load profile"); // 1 API lỗi → toàn bộ fail
    }
}

// 2. Promise.allSettled — Dashboard widgets độc lập
async function loadDashboard() {
    const results = await Promise.allSettled([
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/notifications").then(r => r.json()),
        fetch("/api/activity").then(r => r.json())
    ]);
    
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            renderWidget(i, result.value);
        } else {
            renderWidgetError(i, result.reason.message);
        }
    });
}

// 3. Promise.race — Timeout cho fetch
async function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeout)
        )
    ]);
}

// 4. Promise.any — Fallback APIs
async function fetchFromMultipleSources() {
    try {
        const data = await Promise.any([
            fetch("https://api1.example.com/data").then(r => r.json()),
            fetch("https://api2.example.com/data").then(r => r.json()),
            fetch("https://api3.example.com/data").then(r => r.json())
        ]);
        return data; // Dùng API nào trả về trước
    } catch (error) {
        console.error("Tất cả APIs đều fail");
    }
}
```
- Không còn "pyramid" lồng nhau