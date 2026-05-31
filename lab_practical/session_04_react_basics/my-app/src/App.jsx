// ===== TIER 0 — Component đầu tiên =====

// Bài 0.1 — Component cơ bản
function HelloReact() {
    return (
        <div>
            <h1>Nguyễn Duy Tân</h1>
            <p>Hôm nay là ngày đẹp trời</p>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
            </ul>
        </div>
    );
}

// Bài 0.2 — Viết lại HTML thành JSX

// Bài 1: UserProfile
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// Bài 2: ProductInfo
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

// Main App component
function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4a90d9' }}>🎯 Tier 0 — Component đầu tiên</h1>

            <section style={{ marginBottom: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h2>Bài 0.1 — Component cơ bản</h2>
                <HelloReact />
            </section>

            <section style={{ marginBottom: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h2>Bài 0.2.1 — UserProfile</h2>
                <UserProfile />
            </section>

            <section style={{ marginBottom: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h2>Bài 0.2.2 — ProductInfo</h2>
                <ProductInfo />
            </section>
        </div>
    );
}

export default App;
