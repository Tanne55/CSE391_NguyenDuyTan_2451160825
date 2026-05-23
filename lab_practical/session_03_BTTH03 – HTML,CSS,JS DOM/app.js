// Lay modal
const modalElement = document.getElementById("studentModal");

// Lay form
const form = document.getElementById("studentForm");

const studentTable = document.getElementById("tableStudent");
const studentModal = bootstrap.Modal.getOrCreateInstance(modalElement);

const nameInput = document.getElementById("name");
const khoaInput = document.getElementById("khoa");
const nganhInput = document.getElementById("nganh");
const gpaInput = document.getElementById("gpa");

let students = [
  { name: "Mark", khoa: "K66", nganh: "CNTT", gpa: 3.7 },
  { name: "John", khoa: "K67", nganh: "HTTT", gpa: 2.7 },
  { name: "Kim", khoa: "K65", nganh: "TTNT", gpa: 1.7 },
];

// Render danh sach sinh vien
function renderStudents() {
  studentTable.innerHTML = "";

  students.forEach(function (student, index) {
    studentTable.innerHTML += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${student.name}</td>
        <td>${student.khoa}</td>
        <td>${student.nganh}</td>
        <td>${student.gpa}</td>
        <td>
          <button class="btn btn-info">Sửa</button>
          <button class="btn btn-danger">Xóa</button>
        </td>
      </tr>
    `;
  });
}

function setStudent(student) {
    
}

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const khoa = khoaInput.value.trim();
  const nganh = nganhInput.value.trim();
  const gpa = gpaInput.value.trim();

  // Validate don gian
  if (name === "" || khoa === "" || nganh === "" || gpa === "") {
    alert("Vui long nhap day du");
    return;
  }

  // Them du lieu
  students.push({
    name,
    khoa,
    nganh,
    gpa,
  });

  // Render lai
  renderStudents();

  // Reset form
  form.reset();

  // Dong modal
  studentModal.hide();
});



renderStudents();
