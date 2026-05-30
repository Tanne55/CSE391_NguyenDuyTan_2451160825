const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
let index = 1;
let XepLoaiHocLuc = {
    "Giỏi": 0,
    "Khá": 0,
    "Trung bình": 0,
    "Yếu": 0
};
let maxDTB = 0;
let minDTB = 10;
let DTBMath = 0;
let DTBPhysics = 0;
let DTBCS = 0;
let DTBnam = 0;
let DTBnu = 0;
const HSNam = students.filter(student => student.gender === "M");
const HSNu = students.filter(student => student.gender === "F");
function DTB(math,physics,cs)
{
    return ((math*0.4 + physics*0.3 + cs*0.3))
}
function XepLoai(DTB)
{
    if (DTB > 8.0) {
        return "Giỏi";
    }
    if (DTB >= 6.5) {
        return "Khá";
    }
    if (DTB >= 5.0) {
        return "Trung bình";
    }
    return "Yếu";
}
console.log(`
| STT | Tên    | TB   | Xếp loại    |\n
|-----|--------|------|-------------|`)
students.forEach(student => {
    console.log(`\n| ${index++}   | ${student.name}     | ${DTB(student.math, student.physics, student.cs).toFixed(2)}   | ${XepLoai(DTB(student.math, student.physics, student.cs))}      |`);
    XepLoaiHocLuc[XepLoai(DTB(student.math, student.physics, student.cs))]++;
    if (DTB(student.math, student.physics, student.cs) > maxDTB) {
        maxDTB = DTB(student.math, student.physics, student.cs);
    }
    if (DTB(student.math, student.physics, student.cs) < minDTB) {
        minDTB = DTB(student.math, student.physics, student.cs);
    }
    DTBMath += student.math;
    DTBPhysics += student.physics;
    DTBCS += student.cs;
    if (student.gender === "M") {
        DTBnam += DTB(student.math, student.physics, student.cs);
    } else {
        DTBnu += DTB(student.math, student.physics, student.cs);
    }
});

console.log(`|-----|--------|------|-------------|   `)
console.log(`\nSố sinh viên giỏi: ${XepLoaiHocLuc["Giỏi"]}`);
console.log(`Số sinh viên khá: ${XepLoaiHocLuc["Khá"]}`);
console.log(`Số sinh viên trung bình: ${XepLoaiHocLuc["Trung bình"]}`);
console.log(`Số sinh viên yếu: ${XepLoaiHocLuc["Yếu"]}`);
console.log(`Điểm trung bình môn Toán: ${(DTBMath / students.length).toFixed(2)}`);
console.log(`Điểm trung bình môn Lý: ${(DTBPhysics / students.length).toFixed(2)}`);
console.log(`Điểm trung bình môn Học: ${(DTBCS / students.length).toFixed(2)}`);``
console.log(`Điểm trung bình của nam: ${((DTBnam / HSNam.length)).toFixed(2)}`);
console.log(`Điểm trung bình của nữ: ${((DTBnu / HSNu.length)).toFixed(2)}`);