📋 PHIẾU TRẢ LỜI BÀI TẬP 04
CSS LAYOUT — Positioning, Flexbox & Grid
PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
Câu A1 (10đ) — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | ??? | ??? | ??? |
| `relative` | Có | ??? | ??? | ??? |
| `absolute` | Không | ??? | ??? | ??? |
| `fixed` | Không | ??? | Không | ??? |
| `sticky` | Có | ??? | Có (khi scroll) | ??? |
Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".
Trả lời: Element tuyệt đối (`absolute`) sẽ tham chiếu đến phần tử cha gần nhất có `position` khác `static` (gọi là "nearest positioned ancestor"). Nếu không có phần tử nào như vậy trong DOM tree, nó sẽ tham chiếu đến `<body>`.
Câu A2 (10đ) — Flexbox vs Grid
```css
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */
Trả lời: 4 items xếp thành 1 hàng ngang, chia đều chiều rộng container.
text-art: 
```
+--------+ +--------+ +--------+ +--------+
|  item  | |  item  | |  item  | |  item  |
+--------+ +--------+ +--------+ +--------+
```
--------------------------
/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */
Trả lời: 3 hàng, mỗi hàng 2 item.
text-art:
```
+--------+ +--------+  <- Hàng 1
|  item  | |  item  |
+--------+ +--------+
+--------+ +--------+  <- Hàng 2
|  item  | |  item  |
+--------+ +--------+
+--------+ +--------+  <- Hàng 3
|  item  | |  item  |
+--------+ +--------+
```

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */
Trả lời: 1 hàng ngang, 3 item cách đều nhau ở 2 đầu và ở giữa.
text-art:
```
+--------+           +--------+           +--------+  
|  item  |           |  item  |           |  item  |  
+--------+           +--------+           +--------+  
```

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */
Trả lời: 1 hàng ngang, 3 item chiếm hết chiều rộng container.
text-art:
```
+--------+ +--------+ +--------+  <- 1 hàng
|  200px | |   1fr  | |  200px |  <- item 1,2,3
+--------+ +--------+ +--------+  
```
--------------------------
/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
Trả lời: 3 hàng, item cuối cùng ở hàng 3 cột 1.
text-art:
```
+--------+ +--------+ +--------+  <- Hàng 1
|  item  | |  item  | |  item  |
+--------+ +--------+ +--------+
+--------+ +--------+ +--------+  <- Hàng 2
|  item  | |  item  | |  item  |
+--------+ +--------+ +--------+
+--------+ +--------+          <- Hàng 3
|  item  | |  item  |  <-- item cuối
+--------+ +--------+          
```
