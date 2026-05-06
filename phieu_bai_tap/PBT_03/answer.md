Bài Làm - 📋 PHIẾU BÀI TẬP 03
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
    + Sidebar: width = 258px còn lại giữ nguyên (có thể thay đổi padding và border làm sao cho tổng width + padding + border = 300px)
    + Content: width = 598px còn lại giữ nguyên
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
- Do code chạy từ trên xuống nên kế thừa từ trên->dưới và inline > id > class > tag, chỉ !important là ghi đè bất chấp nên ta có:     font -> .card .title 20px > .container 14px > body 16px
                        color -> .highlight green !important; > tất cả
2. "Mô tả sản phẩm" (p trong card featured) có color = blue
- Color = blue: Selector .card p nhắm trực tiếp vào nó với thuộc tính color: inherit. -> kế thừa lun từ .card
Từ khóa inherit buộc phần tử phải lấy màu từ cha trực tiếp của nó là .card. Mà .card được khai báo là color: blue.
3. "Sản phẩm B" (h2) có font-size = 20px và color = blue
-   Font-size = 20px: Tương tự sản phẩm A, selector .card .title áp dụng trực tiếp lên thẻ này.
    Color = blue: Thẻ h2 này không có ID #featured và cũng không có class .highlight, nên các quy tắc màu đỏ và xanh lá bị loại bỏ mà lấy màu từ .card là blue (kế thừa)
4. "Mô tả sản phẩm B" (p.highlight) có color = green
- Color = green: Mặc dù có quy tắc .card p đòi inherit (lấy màu xanh từ cha), nhưng phần tử này có class .highlight đi kèm !important. Một lần nữa, !important chặn đứng mọi nỗ lực kế thừa hay tính điểm specificity khác để áp đặt màu xanh lá. (yêu em bất chấp !!!)
