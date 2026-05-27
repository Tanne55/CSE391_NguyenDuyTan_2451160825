function SimpleVariables() {
    // Các biến JavaScript
    const ten = "Nguyễn Duy Tân";
    const que = "Phú Quốc, An Giang"
    const tuoi = 20;
    const ChieuCao = 1.75;
    const CanNang = 85;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React", "Python"];
    const ngaySinh = "27/05/2006";
    const now = new Date();

    function ChaoBuoi(now)
    {
        if (now.getHours() < 12)
        {
            return "Chào buổi sáng";
        }
        else if (now.getHours() < 18)
        {
            return "Chào buổi chiều";
        }
        else
        {
            return "Chào buổi tối";
        }
    }

    function CanNangTongThe(ChieuCao, CanNang)
    {
        let BMI = CanNang / (ChieuCao*ChieuCao)
        if (BMI.toFixed(3) < 18.5) return <p>BMI: {BMI.toFixed(3)}, Thiếu cân</p>
        else if (BMI.toFixed(3) < 24.9) return <p>BMI: {BMI.toFixed(3)}, Bình thường</p>
        else if (BMI.toFixed(3) < 29.9) return <p>BMI: {BMI.toFixed(3)}, Thừa cân</p>
        else return <p>BMI: {BMI.toFixed(3)}, Béo phì</p>
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>Xin chào {ChaoBuoi(now)}, {ten}!</h1>
            <p>Tuổi: {tuoi}</p>
            <p>Quê: {que}</p>
            <p>Cao: {ChieuCao}m</p>
            <p>Cân nặng: {CanNang}kg</p>
            <p>Ngày sinh: {ngaySinh}</p>
            {CanNangTongThe(ChieuCao, CanNang)}
            <p>Năm sau: {tuoi + 1}</p>
            <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>
            
            <h2>Môn học yêu thích:</h2>
            <p>{monHoc.join(", ")}</p>
        </div>
    );
}

export default SimpleVariables;