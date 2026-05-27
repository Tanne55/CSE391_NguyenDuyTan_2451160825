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


