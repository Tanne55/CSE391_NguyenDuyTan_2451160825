function AndDemo() {
    const hasNotification = true;
    const notificationCount = 5;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thông báo</h2>
            
            {/* Hiện khi có thông báo */}
            {hasNotification && (
                <div style={{ background: "#fff3cd", padding: "10px" }}>
                    Bạn có {notificationCount} thông báo mới!
                </div>
            )}
            
            {/* Không hiện gì khi không có */}
            {!hasNotification && <p>Không có thông báo</p>}
        </div>
    );
}

function Online_Offline(){
    let isOnline = true;
    if (isOnline) return <p>🟢</p>
    else return <p>🔴</p>
    return (
        <div style={{ padding: "20px" }}>
            <h2>Trạng thái online/offline</h2>
            {Online_Offline()}
        </div>
    );
}

function Menu(){
    let isLoggedIn = true;
    return (
        <div style={{ padding: "20px" }}>
            <h2>Menu</h2>
            {isLoggedIn && <p>🟢</p>}
            {!isLoggedIn && <p>🔴</p>}
        </div>
    );
}

function OutOfStock() {
    let stock = 0;
    function CheckHang(stock) {
        if (stock === 0) return <p>Hết hàng</p>
        else return <p>Còn hàng</p>
    }
    return (
        <div style={{ padding: "20px" }}>
            <h2>Trạng thái hàng</h2>
            {CheckHang(stock)}
        </div>
    );
}
export default AndDemo;
export {Online_Offline, Menu, OutOfStock};