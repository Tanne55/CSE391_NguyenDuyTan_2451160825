📋 TRẢ LỜI PHIẾU BÀI TẬP 07
JAVASCRIPT BASICS — Variables, Data Types, Control Structures

PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
Câu A1 (5đ) — var / let / const
Đọc chương 03. Không chạy code, dự đoán output cho từng đoạn:

// Đoạn 1
console.log(x);
var x = 5;
output = undefined

// Đoạn 2
console.log(y);
let y = 10;
output = lỗi do truy cập giá trị trước khi khởi tạo

// Đoạn 3
const z = 15;
z = 20;
console.log(z);
output = lỗi do gán giá trị cho giá trị hằng

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
output = [1, 2, 3, 4]

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
output:
Trong block: 2
Trong block: 1

Câu A2 (5đ) — Data Types & Coercion
Không chạy code, dự đoán kết quả:

console.log(typeof null);              // object
console.log(typeof undefined);         // undefined
console.log(typeof NaN);              // number
console.log("5" + 3);                 // 53
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (do chuyển thành toString() trước khi cộng)
console.log([] + {});                // [object Object]
console.log({} + []);                // [object Object]

Tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau.
- "5" + 3 : phép + có trong việc ghép chuỗi, nên js sẽ yêu tiên kiểu vế đầu cho vế còn lại -> "5" + "3" = "53"
- "5" - 3 : phép - chỉ tồn tại trong toán học -> chuyển vế đầu thành số nếu có thể rồi thực hiện phép tính -> 5 - 3 = 2

Câu A3 (5đ) — So sánh == vs ===
Dự đoán true hay false:

console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
Giải thích: Áp dụng quy tắc nghiêm ngặt: typeof null là "object" (như đã giải thích ở phần trước) còn typeof undefined là "undefined". Khác kiểu dữ liệu nên kết quả chắc chắn là false.
console.log(NaN == NaN);             // false
Giải thích: Đây là một trong những điều kỳ quặc nhất của JS. Theo đặc tả IEEE 754, NaN là giá trị duy nhất trong JavaScript không tự bằng chính nó.
Lý do logic: NaN nghĩa là "Không phải số". Ví dụ "hello" * 2 ra NaN, và "world" * 5 cũng ra NaN. Nhưng rõ ràng kết quả của hai phép toán vô lý này không thể coi là bằng nhau được. Để kiểm tra một giá trị có phải NaN hay không, người ta phải dùng hàm isNaN() hoặc Number.isNaN().
console.log(0 == false);             // true
Giải thích: Khi so sánh một số với một giá trị Boolean bằng ==, JS sẽ chuyển giá trị Boolean đó thành số. Như ở phần trước ta biết, false được chuyển thành số 0. Do đó phép toán trở thành 0 == 0, kết quả là true.
console.log(0 === false);            // false
Giải thích: Tương tự như câu số 2, 0 có kiểu dữ liệu là number, còn false có kiểu dữ liệu là boolean. Vì khác kiểu dữ liệu hoàn toàn nên toán tử nghiêm ngặt === sẽ trả về false.
console.log("" == false);            // true
Giải thích: Một pha ép kiểu "bắc cầu" của toán tử ==:
1. Đầu tiên, JS chuyển false thành số 0. Phép toán thành "" == 0.
2. Tiếp theo, JS chuyển chuỗi rỗng "" thành số (chuỗi không có ký tự nào thì giá trị số của nó là 0). Phép toán thành 0 == 0.
3. Kết quả cuối cùng là true

Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?
Bạn nên dùng === vì việc so sánh hay bị JS tự động ép kiểu, và rất khó xử lí.

Câu A4 (5đ) — Truthy & Falsy
Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:

if ("0") console.log("A");           // In 
if ("") console.log("B");            // Không
if ([]) console.log("C");            // In
if ({}) console.log("D");            // In
if (null) console.log("E");          // Không
if (0) console.log("F");             // Không
if (-1) console.log("G");            // In
if (" ") console.log("H");           // In

Câu A5 (5đ) — Template Literals
Viết lại 3 cách nối chuỗi sau bằng template literal (backtick):

// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
- var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
- var url = `https://api.example.com/users/${userId}/orders?page=${page}`

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
- var html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
        <span>Giá: ${price} đ</span>
    </div>
`

PHẦN C — SUY LUẬN (20 điểm)
Câu C1 (10đ) — Debug JavaScript
Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):

function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
Liệt kê lỗi + giải thích + cách sửa. Có 1 lỗi "ẩn" liên quan đến var trong vòng lặp — giải thích tại sao và sửa bằng let.

Trả lời: 
1. Danh sách các lỗi và cách sửa
Lỗi 1: Dính chữ và thiếu dấu xuống dòng (Lỗi cú pháp)
Vị trí: return giaSauGiam}// Testconst gia = tinhGiaGiamGia("100000", 20)console.log(...)

Giải thích: Các câu lệnh và ghi chú (// Test, const gia, console.log) bị dính liền trên một dòng mà không có dấu chấm phẩy ; hoặc xuống dòng hợp lý. Điều này khiến trình biên dịch JavaScript bị lỗi cú pháp.

Cách sửa: Tách chúng ra các dòng riêng biệt.

Lỗi 2: Sai toán tử gán thay vì so sánh (Lỗi logic nghiêm trọng)
Vị trí: if (giaSauGiam = 0)

Giải thích: Dấu = là toán tử gán giá trị, không phải toán tử so sánh. Câu lệnh này sẽ gán giaSauGiam = 0, và biểu thức if (0) luôn trả về false, khiến dòng chữ "Sản phẩm miễn phí!" không bao giờ được in ra, đồng thời làm sai lệch kết quả trả về (luôn trả về 0 nếu điều kiện này chạy).

Cách sửa: Đổi thành toán tử so sánh bằng === (hoặc ==).

Lỗi 3: Truyền sai kiểu dữ liệu (Lỗi Logic/Tối ưu)
Vị trí: const gia = tinhGiaGiamGia("100000", 20)

Giải thích: Giá bán đang bị truyền vào dưới dạng một chuỗi (String) "100000" chứ không phải số (Number). Dù JavaScript có cơ chế tự động ép kiểu khi thực hiện phép tính nhân/chia, việc truyền sai kiểu dữ liệu rất dễ gây lỗi toán học ở các phép tính khác (như phép cộng + sẽ bị biến thành nối chuỗi).

Cách sửa: Đổi thành kiểu số 100000.

Lỗi 4: Scope của var trong vòng lặp setTimeout (Lỗi "ẩn")
Vị trí: for (var i = 0; i < 5; i++) { setTimeout(...) }

Giải thích tại sao: Từ khóa var có function-scope hoặc global-scope, không có block-scope. Khi vòng lặp chạy, nó không tạo ra một biến i riêng cho mỗi lượt lặp mà dùng chung một biến i. Hàm setTimeout là bất đồng bộ, nó sẽ đợi 1 giây sau mới chạy. Trong 1 giây đó, vòng lặp for đã chạy xong và biến i đã tăng lên đến 5. Kết quả là màn hình sẽ in ra 5 lần chữ "Item 5" thay vì từ 0 đến 4.

Cách sửa: Thay var i bằng let i. Từ khóa let có block-scope, tạo ra một phạm vi biến riêng biệt cho mỗi lần lặp, giúp giữ đúng giá trị của i tại thời điểm đó.

Lỗi 5: Thiếu các dấu chấm phẩy ; (Lỗi định dạng/Best Practice)
Vị trí: Cuối các câu lệnh return "Phần trăm giảm không hợp lệ", var giamGia = ..., console.log(...)

Giải thích: Dù JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI), việc thiếu dấu chấm phẩy ở cuối câu lệnh rất dễ gây ra các lỗi không mong muốn khi gộp file (minify) hoặc viết code liền dòng.

Cách sửa: Thêm ; vào cuối mỗi câu lệnh.

Lỗi 6: Sử dụng var bừa bãi trong hàm (Lỗi Tối ưu)
Vị trí: var giamGia = giaBan * phanTramGiam / 100

Giải thích: Trong JavaScript hiện đại (ES6+), ta nên hạn chế dùng var vì nó dễ gây rò rỉ biến do không có block-scope. Biến giamGia không bị thay đổi sau khi tính toán, nên dùng const thay vì var.

Cách sửa: Thay var giamGia bằng const giamGia.
[](./C1.js)
Câu C2 (10đ) — Bài toán thực tế
[](./C2.js)



