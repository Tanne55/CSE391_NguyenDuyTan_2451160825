
export function Header() {
    const headerStyle = {
      backgroundColor: '#2c3e50',
      color: '#white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };
  
    const navStyle = {
      display: 'flex',
      gap: '15px',
      listStyle: 'none',
      margin: 0,
      padding: 0
    };
  
    return (
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>🏪 MyShop</h1>
        <nav>
          <ul style={navStyle}>
            <li><a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Trang chủ</a></li>
            <li><a href="#products" style={{ color: '#fff', textDecoration: 'none' }}>Sản phẩm</a></li>
            <li><a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Liên hệ</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  // Component Footer hiển thị thông tin bản quyền
  export function Footer() {
    const footerStyle = {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      textAlign: 'center',
      padding: '15px 20px',
      borderTop: '1px solid #e9ecef',
      fontSize: '14px'
    };
  
    return (
      <footer style={footerStyle}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} MyShop. Tất cả các quyền được bảo lưu.</p>
      </footer>
    );
  }

  export default Header;