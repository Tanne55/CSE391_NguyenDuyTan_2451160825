function TernaryDemo() {
    const isLoggedIn = true;
    const score = 85;
    
    return (
        <div style={{ padding: "20px" }}>
            {/* Cách 1: Toán tử 3 ngôi */}
            <h2>{isLoggedIn ? "Chào mừng bạn!" : "Vui lòng đăng nhập"}</h2>
            
            {/* Kết quả học tập */}
            <p>Kết quả: {score >= 5 ? "Đậu" : "Rớt"}</p>
            
            {/* Điểm xếp loại */}
            <p>Xếp loại: {
                score >= 9 ? "Xuất sắc" :
                score >= 8 ? "Giỏi" :
                score >= 7 ? "Khá" :
                score >= 5 ? "Trung bình" : "Yếu"
            }</p>
        </div>
    );
}

export default TernaryDemo;