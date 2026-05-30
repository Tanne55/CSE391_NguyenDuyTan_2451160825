function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    const giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) { // Đã sửa từ = thành ===
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test case 1: Sửa dính dòng và sửa "100000" thành số 100000
const gia = tinhGiaGiamGia(100000, 20); 
console.log("Giá sau giảm: " + gia + "đ");

// Test case 2
const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Vòng lặp: Đã sửa var thành let để sửa lỗi ẩn bất đồng bộ
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}