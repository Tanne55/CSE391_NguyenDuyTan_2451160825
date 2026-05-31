// ===== PHẦN B3 — Higher-Order Functions Challenge =====

// 1. pipe() — Nối chuỗi functions (chạy từ trái sang phải)
function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log("=== PIPE ===");
console.log(process(5));  // → "Kết quả: 20"
console.log(process(10)); // → "Kết quả: 30"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== MEMOIZE ===");
console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)
console.log(expensiveCalc(500000));  // → "Đang tính..." → 124999750000
console.log(expensiveCalc(500000));  // → cache

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId = null;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Demo debounce
console.log("\n=== DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 300);

// Giả lập user gõ liên tục
search("i");
search("ip");
search("iph");
search("ipho");
search("iphon");
search("iphone"); // Chỉ lần này mới thực sự chạy (sau 300ms)

// Đợi để thấy kết quả debounce
setTimeout(() => {
    console.log("(Chỉ 'iphone' được search — các lần trước bị cancel)");
}, 500);

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            console.log(`  Lần ${attempt} thất bại: ${error.message}`);
            if (attempt === maxAttempts) {
                throw new Error(`Thất bại sau ${maxAttempts} lần thử: ${error.message}`);
            }
        }
    }
}

// Demo retry
setTimeout(async () => {
    console.log("\n=== RETRY ===");

    let callCount = 0;
    const unreliableFunction = () => {
        callCount++;
        if (callCount < 3) {
            return Promise.reject(new Error("Server lỗi 500"));
        }
        return Promise.resolve("Dữ liệu thành công!");
    };

    try {
        const result = await retry(unreliableFunction, 5);
        console.log("Kết quả:", result);
    } catch (error) {
        console.log("Lỗi cuối:", error.message);
    }

    // Demo retry thất bại hoàn toàn
    console.log("\n--- Retry thất bại ---");
    const alwaysFail = () => Promise.reject(new Error("Timeout"));
    try {
        await retry(alwaysFail, 3);
    } catch (error) {
        console.log("Lỗi:", error.message);
    }
}, 600);
