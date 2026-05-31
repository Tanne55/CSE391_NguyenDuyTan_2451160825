import { useState } from 'react';

// ===== TIER 2 — Biến trong JSX =====

// Bài 2.1 — Hiển thị biến đơn giản
function SimpleVariables() {
    const ten = "Nguyễn Duy Tân";
    const tuoi = 20;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React"];
    const canNang = 70;
    const chieuCao = 1.75;
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(2);

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", borderRadius: "8px" }}>
            <h2>Thông tin cá nhân</h2>
            <p><strong>Tên:</strong> {ten}</p>
            <p><strong>Tuổi:</strong> {tuoi} (Năm sau: {tuoi + 1})</p>
            <p><strong>Sinh viên:</strong> {laSinhVien ? "Có" : "Không"}</p>
            <p><strong>BMI:</strong> {bmi}</p>
            <p><strong>Môn học:</strong> {monHoc.join(", ")}</p>
        </div>
    );
}

// Bài 2.2 — Conditional Rendering
function ConditionalDemo() {
    const isLoggedIn = true;
    const score = 85;
    const hasNotification = true;
    const notificationCount = 5;
    const stock = 0;

    return (
        <div style={{ padding: "20px", border: "2px solid #9b59b6", borderRadius: "8px" }}>
            <h2>Conditional Rendering</h2>

            {/* Ternary */}
            <p>{isLoggedIn ? "🟢 Đã đăng nhập" : "🔴 Chưa đăng nhập"}</p>
            <p>Kết quả: {score >= 50 ? "Đậu ✅" : "Rớt ❌"}</p>
            <p>Xếp loại: {
                score >= 90 ? "Xuất sắc" :
                score >= 80 ? "Giỏi" :
                score >= 70 ? "Khá" :
                score >= 50 ? "Trung bình" : "Yếu"
            }</p>

            {/* && operator */}
            {hasNotification && (
                <div style={{ background: "#fff3cd", padding: "10px", marginTop: "10px", borderRadius: "4px" }}>
                    📬 Bạn có {notificationCount} thông báo mới!
                </div>
            )}

            {stock === 0 && <p style={{ color: "red" }}>⚠️ Hết hàng</p>}
        </div>
    );
}

// Bài 2.3 — List Rendering
function ListRendering() {
    const fruits = ["Táo", "Chuối", "Cam", "Nho"];
    const students = [
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "Lan", age: 21 },
        { id: 3, name: "Hùng", age: 19 }
    ];

    return (
        <div style={{ padding: "20px", border: "2px solid #27ae60", borderRadius: "8px" }}>
            <h2>Danh sách</h2>

            <h3>Trái cây:</h3>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>

            <h3>Sinh viên:</h3>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - {student.age} tuổi
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Main App
function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4a90d9' }}>🎯 Tier 2 — Biến trong JSX</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 2.1 — Hiển thị biến đơn giản</h2>
                <SimpleVariables />
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 2.2 — Conditional Rendering</h2>
                <ConditionalDemo />
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 2.3 — List Rendering</h2>
                <ListRendering />
            </section>
        </div>
    );
}

export default App;
