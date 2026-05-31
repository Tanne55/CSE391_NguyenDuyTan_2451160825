# 📋 TRẢ LỜI PHIẾU BÀI TẬP 08
# JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**3 cách viết hàm `tinhThueBaoHiem(luong)`:**

```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

// 2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**Về hoisting:**

Có, 3 cách này khác nhau về hoisting:

- **Function Declaration** được hoisted hoàn toàn — có thể gọi hàm TRƯỚC khi khai báo:
```javascript
console.log(tinhThueBaoHiem(15000000)); // OK, hoạt động bình thường
function tinhThueBaoHiem(luong) { ... }
```

- **Function Expression** và **Arrow Function** KHÔNG được hoisted (nếu dùng `const`/`let`). Gọi trước khi khai báo sẽ bị ReferenceError (TDZ):
```javascript
console.log(tinhThueBaoHiem2(15000000)); // ReferenceError: Cannot access before initialization
const tinhThueBaoHiem2 = function(luong) { ... };
```

- Nếu dùng `var` cho Function Expression, biến được hoisted nhưng giá trị là `undefined`, gọi sẽ bị TypeError:
```javascript
console.log(tinhVar(15000000)); // TypeError: tinhVar is not a function
var tinhVar = function(luong) { ... };
```

---

### Câu A2 (5đ) — Scope & Closure

**Đoạn 1:**
```javascript
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

Giải thích: Hàm `counter()` tạo ra một closure. Biến `count` được giữ trong bộ nhớ (không bị garbage collected) vì các hàm `increment`, `decrement`, `getCount` vẫn tham chiếu đến nó. Mỗi lần gọi method, chúng đều thao tác trên cùng một biến `count` đó.

**Đoạn 2:**
```
// Sau 100ms:
var: 3
var: 3
var: 3

// Sau 200ms:
let: 0
let: 1
let: 2
```

**Giải thích chi tiết:**

- Với `var i`: `var` có function-scope, không có block-scope. Chỉ tồn tại MỘT biến `i` duy nhất cho toàn bộ vòng lặp. Khi setTimeout callback chạy (sau 100ms), vòng lặp đã kết thúc và `i` đã bằng 3. Cả 3 callback đều tham chiếu đến cùng biến `i = 3`.

- Với `let j`: `let` có block-scope. Mỗi lần lặp tạo ra một biến `j` MỚI với giá trị riêng tại thời điểm đó. Callback của setTimeout "nhớ" đúng giá trị `j` của lần lặp tương ứng nhờ closure trên block-scope.

---

### Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter(x => x % 2 === 0);                    // → [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
nums.map(x => x * 3);                             // → [3, 6, 9, ..., 30]

// 3. Tính tổng tất cả
nums.reduce((sum, x) => sum + x, 0);              // → 55

// 4. Tìm số đầu tiên > 7
nums.find(x => x > 7);                            // → 8

// 5. Kiểm tra CÓ số > 10 không
nums.some(x => x > 10);                           // → false

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every(x => x > 0);                           // → true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map(x => `Số ${x} là ${x % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse();                               // → [10, 9, ..., 1]
```

---

### Câu A4 (5đ) — Object Destructuring & Spread

```javascript
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                     // ReferenceError: specs is not defined
```
Giải thích: Khi destructure `specs: { ram, color }`, `specs` chỉ là đường dẫn để truy cập sâu hơn, nó KHÔNG được khai báo thành biến. Chỉ `ram` và `color` mới là biến.

```javascript
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (gốc KHÔNG đổi)
```
Giải thích: Spread tạo bản sao nông (shallow copy). Các property sau sẽ ghi đè property trùng tên. Object gốc không bị ảnh hưởng.

```javascript
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (BỊ ĐỔI!)
```
Giải thích: Spread chỉ copy **shallow** (1 cấp). Property `specs` là object lồng nhau — spread chỉ copy reference (địa chỉ tham chiếu), không copy giá trị bên trong. Do đó `copy.specs` và `product.specs` trỏ đến CÙNG MỘT object trong bộ nhớ. Sửa một bên sẽ ảnh hưởng bên kia.

Để deep copy, cần dùng: `structuredClone(product)` hoặc `JSON.parse(JSON.stringify(product))`.

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

**Code SAU khi refactor:**

```javascript
function processOrders(orders) {
    return orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

**Giải thích refactor:**

1. Thay vòng lặp `for` + `if` lồng nhau bằng `.filter()` — lọc đơn hàng completed và total > 100k
2. Thay tạo object thủ công bằng `.map()` với destructuring — code ngắn gọn, rõ ý
3. Thay bubble sort thủ công bằng `.sort()` — built-in, tối ưu hơn, 1 dòng
4. Dùng `const` thay `var`, arrow functions thay function expressions
5. Chain methods liền mạch — dễ đọc theo flow: lọc → biến đổi → sắp xếp

---

### Câu C2 (10đ) — Thiết kế API miniArray

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;

        // Nếu không truyền initialValue, dùng phần tử đầu tiên
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            accumulator = arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// Test:
// miniArray.map([1,2,3], x => x * 2)         → [2, 4, 6]
// miniArray.filter([1,2,3,4], x => x > 2)    → [3, 4]
// miniArray.reduce([1,2,3,4], (a,b) => a+b, 0) → 10
```

**Giải thích thiết kế:**

- `map`: Duyệt mảng, gọi `fn(element, index, array)` cho mỗi phần tử, push kết quả vào mảng mới. Không mutate mảng gốc.
- `filter`: Duyệt mảng, chỉ giữ lại phần tử mà `fn` trả về truthy.
- `reduce`: Tích lũy giá trị qua mỗi phần tử. Nếu không có `initialValue`, dùng phần tử đầu tiên làm accumulator ban đầu và bắt đầu lặp từ index 1. Callback nhận `(accumulator, currentValue, index, array)`.
