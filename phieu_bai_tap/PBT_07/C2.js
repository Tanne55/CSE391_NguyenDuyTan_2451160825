function inHoaDon(danhSachMon, coTip = false) {
    // 1. Tính tổng tiền gốc (Chưa giảm giá, thuế, tip)
    let tongCong = 0;
    danhSachMon.forEach(mon => {
        tongCong += mon.gia * mon.soLuong;
    });

    // 2. Xác định phần trăm giảm giá theo tổng tiền
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    // 3. Kiểm tra nếu là Thứ 4 (Wednesday) thì giảm thêm 5%
    // Lưu ý: Trong JS, ngày Thứ 4 (Wednesday) có index là 3 khi dùng .getDay()
    const homNay = new Date();
    if (homNay.getDay() === 3) { 
        phanTramGiam += 5;
    }

    // Tính số tiền được giảm giá
    let tienGiamGia = tongCong * (phanTramGiam / 100);

    // 4. Tính VAT (8%) và Tip (5%) dựa trên số tiền SAU KHI GIẢM GIÁ
    let tienSauGiam = tongCong - tienGiamGia;
    let tienVAT = tienSauGiam * 0.08;
    let tienTip = coTip ? (tienSauGiam * 0.05) : 0;

    // 5. Tổng số tiền cuối cùng phải thanh toán
    let tongThanhToan = tienSauGiam + tienVAT + tienTip;

    // --- CÔNG CỤ HELPER ĐỂ FORMAT VÀ CĂN LỀ BOX ---
    const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(Math.round(num)) + 'đ';
    const formatK = (num) => (num / 1000) + 'k';
    const chieuRongBox = 44; // Độ rộng cố định của hóa đơn

    // Hàm căn giữa chữ
    const padCenter = (str, width) => {
        let pad = width - str.length;
        if (pad <= 0) return str;
        let left = Math.floor(pad / 2);
        let right = pad - left;
        return ' '.repeat(left) + str + ' '.repeat(right);
    };

    // Hàm căn hai lề trái phải
    const padBetween = (leftStr, rightStr, width) => {
        let spaceNeeded = width - leftStr.length - rightStr.length;
        return leftStr + ' '.repeat(spaceNeeded > 0 ? spaceNeeded : 1) + rightStr;
    };

    // --- IN HÓA ĐƠN ---
    console.log("Size box: " + chieuRongBox);
    console.log(`╔${'═'.repeat(chieuRongBox)}╗`);
    console.log(`║${padCenter("HÓA ĐƠN NHÀ HÀNG", chieuRongBox)}║`);
    console.log(`╠${'═'.repeat(chieuRongBox)}╣`);

    // In danh sách món ăn
    danhSachMon.forEach((mon, index) => {
        let giaMon = mon.gia * mon.soLuong;
        let lineLeft = `${index + 1}. ${mon.ten.padEnd(12)} x${mon.soLuong}`;
        let lineRight = `@${formatK(mon.gia)}  = ${formatK(giaMon)}`;
        
        console.log(`║ ${padBetween(lineLeft, lineRight, chieuRongBox - 2)} ║`);
    });

    console.log(`╠${'═'.repeat(chieuRongBox)}╣`);

    // In phần tổng kết chi phí
    console.log(`║ ${padBetween("Tổng cộng:", formatVND(tongCong), chieuRongBox - 2)} ║`);
    console.log(`║ ${padBetween(`Giảm giá (${phanTramGiam}%):`, `-${formatVND(tienGiamGia)}`, chieuRongBox - 2)} ║`);
    console.log(`║ ${padBetween("VAT (8%):", formatVND(tienVAT), chieuRongBox - 2)} ║`);
    console.log(`║ ${padBetween(`Tip (${coTip ? 5 : 0}%):`, formatVND(tienTip), chieuRongBox - 2)} ║`);

    console.log(`╠${'═'.repeat(chieuRongBox)}╣`);
    console.log(`║ ${padBetween("THANH TOÁN:", formatVND(tongThanhToan), chieuRongBox - 2)} ║`);
    console.log(`╚${'═'.repeat(chieuRongBox)}╝`);
}

// --- CHẠY THỬ CHƯƠNG TRÌNH ---

// Test case 1: Dưới 500k, không giảm giá cơ bản, có bật option Tip 5%
const donHang1 = [
    { ten: "Phở bò", gia: 65000, soLuong: 2 },
    { ten: "Trà đá", gia: 5000, soLuong: 3 },
    { ten: "Bún chả", gia: 55000, soLuong: 1 }
];
console.log("--- TEST CASE 1 ---");
inHoaDon(donHang1, true); 

// Test case 2: Trên 500k (Giảm 10%), không lấy Tip
const donHang2 = [
    { ten: "Lẩu Thái", gia: 450000, soLuong: 1 },
    { ten: "Ba chỉ bò", gia: 90000, soLuong: 2 },
    { ten: "Nước ngọt", gia: 15000, soLuong: 4 }
];
console.log("\n--- TEST CASE 2 ---");
inHoaDon(donHang2, false);