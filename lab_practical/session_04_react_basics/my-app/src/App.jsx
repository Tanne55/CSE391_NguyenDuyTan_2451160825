import { useState } from 'react';

// ===== TIER 1 — Hiểu luồng hoạt động của React =====

// Bài 1.1 — Component render lần đầu
function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", borderRadius: "8px" }}>
            <h2>Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem log</p>
            <p>Component này chỉ render MỘT lần</p>
        </div>
    );
}

// Bài 1.2 — Biến "bình thường" vs useState

// ❌ Counter tệ (dùng biến thường)
function BadCounter() {
    let count = 0;  // ← Biến bình thường!

    function handleClick() {
        count = count + 1;
        console.log("Count:", count);  // Console: 1, 2, 3...
        // Nhưng UI KHÔNG cập nhật!
    }

    return (
        <div style={{ padding: "20px", border: "2px solid #e74c3c", borderRadius: "8px" }}>
            <h2>❌ Counter "tệ" (dùng biến thường)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "red", marginTop: "10px" }}>
                ⚠️ Nhấn nút → Console tăng, nhưng số trên màn hình KHÔNG đổi!
            </p>
        </div>
    );
}

// ✅ Counter tốt (dùng useState)
function GoodCounter() {
    const [count, setCount] = useState(0);  // ← useState!

    function handleClick() {
        setCount(count + 1);  // React biết cần re-render!
    }

    return (
        <div style={{ padding: "20px", border: "2px solid #27ae60", borderRadius: "8px" }}>
            <h2>✅ Counter "tốt" (dùng useState)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "green", marginTop: "10px" }}>
                ✅ Nhấn nút → Số trên màn hình CẬP NHẬT!
            </p>
        </div>
    );
}

// Bài 1.3 — Luồng hoạt động (Flow)
function FlowDemo() {
    console.log("🔄 Component render!");

    const [step, setStep] = useState(1);

    return (
        <div style={{ padding: "20px", border: "2px solid #9b59b6", borderRadius: "8px" }}>
            <h2>Luồng hoạt động</h2>
            <p>Bước hiện tại: {step}</p>

            <button onClick={() => setStep(step + 1)} style={{ padding: "8px 16px", marginRight: "8px", cursor: "pointer" }}>
                Bước tiếp theo →
            </button>

            <button onClick={() => setStep(1)} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Quay lại đầu
            </button>

            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "4px" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
                {step > 4 && <p>🚀 Bạn đã vượt qua tất cả các bước!</p>}
            </div>
        </div>
    );
}

// Main App component
function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4a90d9' }}>🎯 Tier 1 — Hiểu luồng hoạt động của React</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 1.1 — Component render lần đầu</h2>
                <LifecycleDemo />
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 1.2 — Biến "bình thường" vs useState</h2>
                <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
                    <BadCounter />
                    <GoodCounter />
                </div>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Bài 1.3 — Luồng hoạt động (Flow)</h2>
                <FlowDemo />
            </section>
        </div>
    );
}

export default App;
