function ListRendering() {
    const fruits = ["Táo", "Chuối", "Cam", "Nho"];
    
    const students = [
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ];

    const products = [
        { id: 1, name: "iPhone 16", price: 25990000 },
        { id: 2, name: "MacBook Pro", price: 45990000 },
        { id: 3, name: "AirPods Pro", price: 6990000 },
        { id: 4, name: "iPad Air", price: 16990000 },
        { id: 5, name: "Galaxy Buds", price: 3490000 }
    ]
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h2>Danh sách sinh viên</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>STT</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tuổi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>
                Danh sách tất cả sản phầm
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>STT</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên sản phẩm</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => (
                        <tr key={prod.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{prod.name}</td>
                            {
                                prod.price < 10000000 ? <td style={{ border: "1px solid #ddd", padding: "8px" }}>{prod.price}</td> : <td style={{ border: "1px solid #ddd", padding: "8px", color: "red" }}>{prod.price}</td>
                            }
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <p>Tổng giá trị các sản phẩm: {products.reduce((total, prod) => total + prod.price, 0)}</p>
        </div>
    );
}

export default ListRendering;