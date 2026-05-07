Bài Làm - 📋 PHIẾU BÀI TẬP 03
BÀI A1: (Tài liệu tham chiếu: tuan_2_css_core/08_introduction_css.md -> 3 cách thêm CSS)

- Có 3 cách để chèn CSS:

1. Inline Css: Cách này sử dụng thuộc tính style ngay bên trong thẻ mở của phần tử HTML.
   Ex: <h1 style="color: blue; font-size: 24px;">Đây là tiêu đề </h1>

- Ưu và nhược điểm:

* Ưu: Tiện lợi cho việc test nhanh 1 thuộc tính hoặc khi chỉ muốn áp dụng css cho duy nhất 1 phần tử
* Nhược : Khó bảo trì code , code dễ bị rối và khó cho việc tái sử dụng

- Cách 1 thường sử dụng khi chỉ muốn thay đổi duy nhất 1 phần tử

2. Internal CSS (CSS nội bộ): Cách này sử dụng thẻ <style> đặt bên trong phần đầu <head> của file HTML
   Ex: <head>
   <style>
   p {
   color: red;
   }
   </style>
   </head>
   <body>
   <p>Xin chào Việt Nam.</p>
   </body>

- Ưu và nhược điểm:

* Ưu: Có thể định kiểu cho nhiều phần tử trong cùng một trang web mà không cần lặp lại code. Không cần quản lý nhiều file.
* Nhược: Chỉ có tác dụng trong phạm vi của một file HTML đó. Nếu website có 10 trang, bạn phải copy đoạn code này sang cả 10 trang.

- Cách 2 thường được sử dụng khi website của bạn chỉ có duy nhất một trang hoặc khi bạn muốn Css 1 trang mà các trang khác không có.

3. External CSS (CSS bên ngoài): tách biệt hoàn toàn code CSS ra một file riêng (đuôi .css) và liên kết vào HTML bằng thẻ <link>.
   Ex: Tạo file style.css:
   body {
   background-color: black
   }
   button {
   background-color: green;
   }
   Tạo file Index.html
   <head>
   <link rel="stylesheet" href="style.css">
   </head>
   <body>
   <button>Send</button>
   </body>

- Ưu và nhươc điểm:
- Ưu:Giúp dễ quản lý và bảo trì. Một file CSS có thể dùng cho hàng nghìn trang HTML, giúp giảm dung lượng file và tăng tốc độ tải trang
- Nhược: Trình duyệt phải thực hiện thêm một yêu cầu tải file CSS về, nếu đường dẫn sai thì trang web sẽ mất toàn bộ định dạng.

* Cách 3 này thường được sử dụng cho các dự án chuyên nghiệp , có nhiều giao diện phức tạp

- Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách Inline Css sẽ thắng vì theo như quy tắc uu tiên của Css thì kiểu inline dc coi là ưu tiên cao nhất vì nó nằm trực tiếp trên phần tử, trình duyệt coi đây là chỉ thị cụ thể và quan trọng nhất Còn 2 cách còn lại là Internal & External CSS thì có độ ưu tiên ngang nhau và trình duyệt sẽ áp dụng trình đọc từ trên xuống cái nào nằm dưới thì thắng.
Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
Cho HTML sau:
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
Không chạy code, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)

1. h1 → Chọn: <h1>ShopTLU</h1>
2. .price → Chọn: <p class="price">45.990.000đ</p> và <p class="price">25.990.000đ</p>
3. #app header → Chọn:
    <header class="top-bar dark"><h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
   </header>
4. nav a:first-child → Chọn: <a href="/" class="active">Home</a>
5. .product.featured h2 → Chọn: <h2>MacBook Pro</h2>
6. article > p → Chọn:  <p class="price">25.990.000đ</p>
                        <p>Mô tả sản phẩm...</p>
                        <p class="price">45.990.000đ</p>
                        <p>Mô tả sản phẩm...</p>
7. a[href="/"] → Chọn: <a href="/" class="active">Home</a>
8. .top-bar.dark h1 → Chọn: <h1>ShopTLU</h1>

Câu A3 (7đ) — Box Model — Tính toán kích thước
Đọc chương 11 (Box Model). Tính kích thước thực tế (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 450px
→ Không gian chiếm trên trang = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px 
→ Giải thích tại sao KHÔNG PHẢI 65px
→ Nó không phải là 65px vì Khi hai thẻ block nằm chồng dọc, margin của chúng không cộng dồn mà gộp làm một (lấy cái lớn hơn): mà 40px >25px -> lấy 40px
Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = bao nhiêu?
→ Khoảng cách giữa box-a và box-b = 30px
Câu A4 (5đ) — Specificity (Độ ưu tiên)
- Cho các CSS rules sau cùng target 1 element <p class="price" id="main-price">:
  p { color: black; } /_ Rule A _/
  .price { color: blue; } /_ Rule B _/
  #main-price { color: red; } /_ Rule C _/
  p.price { color: green; } /_ Rule D _/
1. Tính specificity score (a, b, c) cho mỗi rule
- Rule A: 1đ (do nó có 1 thẻ element là p)
- Rule B: 10đ ( do nó là class)
- rule C: 100đ ( do nó là ID)
- rule D: 11đ ( do nó có 1 thẻ element + 1 class)
2. Element sẽ có màu gì? Giải thích
- Element đó sẽ có màu đỏ vì trình duyệt sẽ so sánh cái specificity score giữa các selector cùng chỉ vào nó và rule C dùng ID Selector(#main-price) có điểm là 100đ nên nó có thắng 3 rule còn lại
3. Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu gì?
- Element sẽ có màu cam vì theo thứ tự ưu tiên thì Inline Css là cái có độ ưu tiên cao nhất hơn tất cả các selector trong file Css(chỉ sau !important)
4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
- Element sẽ có màu đen vì thuộc tính (!important) có điểm specificity score là cao nhất cho dù nó nằm ở bất kì đâu


Câu C1 (10đ) — Debug CSS Layout
Layout dưới đây bị vỡ. Container rộng 960px, sidebar + content phải nằm cạnh nhau. Nhưng content bị đẩy xuống dòng mới.

.container {
width: 960px;
margin: 0 auto;
}
.sidebar {
width: 300px;
padding: 20px;
border: 1px solid #ccc;
float: left;
}
.content {
width: 660px;
padding: 30px;
border: 1px solid #ccc;
float: left;
}

1. Tính chiều rộng thực tế của sidebar và content (content-box!)

- Sidebar rộng: 342px (1px border trái + 20px padding trái + 300px width + 20px padding phải + 1px border phải)
- Content rộng: 722px (660px width + 30*2px padding + 1*2px border)

2. Giải thích tại sao layout bị vỡ

- Vì width của sidebar + content-box tổng là 1064px > 960px nên phần content-box bị rớt xuống

3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng)

- Cách dùng border-box: cho cả .sidebar và .content thêm thuộc tính box-sizing: border-box; để kích thước thật của element thay vì = content-box = width + padding + border thì giờ width mà ta xét ban đầu sẽ là tổng của content + padding + border (Được tự tính)
- Cách không dùng border-box: tình toán lại cho cả 2 phần:
  - Sidebar: width = 258px còn lại giữ nguyên (có thể thay đổi padding và border làm sao cho tổng width + padding + border = 300px)
  - Content: width = 598px còn lại giữ nguyên

4. Hoàn thiện file
   Câu C2 (10đ) — Cascade Puzzle
   Cho CSS file:

body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }

Và HTML:

<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>
        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
Không chạy code, trả lời:

1. "Sản phẩm A" (h2) có font-size = 20px và color = green

- Do code chạy từ trên xuống nên kế thừa từ trên->dưới và inline > id > class > tag, chỉ !important là ghi đè bất chấp nên ta có: font -> .card .title 20px > .container 14px > body 16px
  color -> .highlight green !important; > tất cả

2. "Mô tả sản phẩm" (p trong card featured) có color = blue

- Color = blue: Selector .card p nhắm trực tiếp vào nó với thuộc tính color: inherit. -> kế thừa lun từ .card
  Từ khóa inherit buộc phần tử phải lấy màu từ cha trực tiếp của nó là .card. Mà .card được khai báo là color: blue.

3. "Sản phẩm B" (h2) có font-size = 20px và color = blue

- Font-size = 20px: Tương tự sản phẩm A, selector .card .title áp dụng trực tiếp lên thẻ này.
  Color = blue: Thẻ h2 này không có ID #featured và cũng không có class .highlight, nên các quy tắc màu đỏ và xanh lá bị loại bỏ mà lấy màu từ .card là blue (kế thừa)

4. "Mô tả sản phẩm B" (p.highlight) có color = green

- Color = green: Mặc dù có quy tắc .card p đòi inherit (lấy màu xanh từ cha), nhưng phần tử này có class .highlight đi kèm !important. Một lần nữa, !important chặn đứng mọi nỗ lực kế thừa hay tính điểm specificity khác để áp đặt màu xanh lá. (yêu em bất chấp !!!)
  PHẦN B — THỰC HÀNH CODE (55 điểm)
  Bài B1 (20đ) — Style trang Profile
- Liệt kê các kiểu selectors sử dụng:

1. Element Selector: `body`, `header`, `footer`, `th`
   - Nhắm trực tiếp vào tên thẻ HTML để định dạng chung.
2. Class Selector: `.nav-link`, `.skills-table`, `.active`
   - Dùng để áp dụng phong cách cho các nhóm phần tử cụ thể có cùng thuộc tính.
3. ID Selector: `#skills-section`, `#main-footer`
   - Nhắm vào các phần tử duy nhất trên trang để định dạng đặc biệt.
4. Descendant Selector (Selector con cháu): `nav ul`, `.skills-table th`
   - Định dạng các phần tử nằm bên trong một phần tử khác để kiểm soát bố cục phân cấp.
5. Pseudo-class Selector: `:hover`, `:nth-child(even)`
   - Xử lý các trạng thái tương tác hoặc vị trí logic của phần tử trong danh sách.
     Bài B2 (20đ) — Box Model Lab

- Hộp 1 (content-box): chiều rộng thực tế = 349,696 px (đo từ DevTools)
- Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)
- Giải thích sự khác biệt: để kích thước thật của element thay vì = content-box = (width + padding + border)thì giờ width mà ta xét ban đầu sẽ là tổng của (content + padding + border) = border-box (Được tự tính)
- Phần 2 tính toán trường hợp không border-box cho thấy > 1000px:
  Cột trái (sidebar): 250px, background nhạt, padding: 15px -> thật ra = 280px vì cộng thêm 15*2px từ padding
  Cột giữa (content): 500px, padding: 20px -> thật ra = 540px vì cộng thêm 20*2px từ padding
  Cột phải (ads): 250px, background nhạt, padding: 15px -> thật ra = 280px vì cộng thêm 15\*2px từ padding
  -> Tổng = 280 + 280 + 540: 1100px quá 100px so với 1000px đề ra => vỡ
  Bài B3 (15đ) — Specificity Battle:

1. Liệt kê 10 rules + specificity score:

- Trong file css
  Element cuối cùng hiển thị màu gì? Tại sao?
- Màu hiển thị: Màu Brown (Nâu). Giải thích: Vì selector #demo.text.highlight có điểm số cao nhất $(1, 2, 0)$ = tầm 120đ. Trong CSS, trình duyệt sẽ ưu tiên rule có độ ưu tiên (Specificity) cao nhất bất kể nó nằm ở vị trí nào trong file.
  Chụp screenshot kết quả
- Trong phần Screenshots
  Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.
- Kết quả: KHÔNG THAY ĐỔI.
  Giải thích: Thứ tự viết code (Cascade) chỉ có tác dụng khi hai selector có cùng điểm Specificity. Trong trường hợp này, 10 rule của chúng ta có điểm số khác nhau hoàn toàn, nên rule mạnh nhất sẽ luôn thắng. Cho vd như ID sẽ là 100đ, class là 10đ, còn tag là 1đ
