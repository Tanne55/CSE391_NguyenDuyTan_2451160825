// ===== PHẦN B2 — Giỏ hàng (Shopping Cart) dùng Closure =====

function createCart() {
    // Private data
    let items = [];
    let discountCode = null;

    // Discount codes
    const discountCodes = {
        "SALE10": { type: "percent", value: 10 },
        "SALE20": { type: "percent", value: 20 },
        "FREESHIP": { type: "fixed", value: 30000 }
    };

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (!item) {
                console.log(`Không tìm thấy sản phẩm id=${productId}`);
                return;
            }
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            if (!discountCode) return subtotal;

            const discount = discountCodes[discountCode];
            if (discount.type === "percent") {
                return subtotal - subtotal * discount.value / 100;
            } else {
                return Math.max(0, subtotal - discount.value);
            }
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            if (discountCodes[code]) {
                discountCode = code;
                console.log(`Áp dụng mã "${code}" thành công!`);
            } else {
                console.log(`Mã "${code}" không hợp lệ!`);
            }
        },

        // In giỏ hàng dạng bảng
        printCart() {
            console.log("┌──────────────────────────────────────────────────────────────┐");
            console.log("│ #  │ Sản phẩm        │ SL │ Đơn giá        │ Tổng           │");
            console.log("├──────────────────────────────────────────────────────────────┤");

            items.forEach((item, index) => {
                const name = item.name.padEnd(15);
                const qty = String(item.quantity).padStart(2);
                const unitPrice = item.price.toLocaleString("vi-VN").padStart(12);
                const lineTotal = (item.price * item.quantity).toLocaleString("vi-VN").padStart(12);
                console.log(`│ ${index + 1}  │ ${name} │ ${qty} │ ${unitPrice}  │ ${lineTotal}  │`);
            });

            console.log("├──────────────────────────────────────────────────────────────┤");

            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const total = this.getTotal();

            if (discountCode) {
                const discountAmount = subtotal - total;
                console.log(`│ Tạm tính:                          ${subtotal.toLocaleString("vi-VN").padStart(14)}đ │`);
                console.log(`│ Giảm giá (${discountCode}):              -${discountAmount.toLocaleString("vi-VN").padStart(13)}đ │`);
            }

            console.log(`│ Tổng cộng:                         ${total.toLocaleString("vi-VN").padStart(14)}đ │`);
            console.log("└──────────────────────────────────────────────────────────────┘");
        },

        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountCode = null;
        }
    };
}

// ===== TEST =====
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

console.log("\n=== ÁP DỤNG MÃ SALE10 ===");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa AirPods:", cart.getItemCount()); // → 2

console.log("\n=== CẬP NHẬT SỐ LƯỢNG ===");
cart.updateQuantity(1, 3);
cart.printCart();

console.log("\n=== XÓA TOÀN BỘ ===");
cart.clearCart();
console.log("Sau clear:", cart.getItemCount()); // → 0
