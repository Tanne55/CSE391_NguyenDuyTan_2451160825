/**
 * CRUD + localStorage dùng chung (BTTH03 Bài 1)
 * Validation do từng folder xử lý riêng.
 */
const STORAGE_KEY = "btth03_students_k66";

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStudents(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function createStudentId() {
  return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}

function getFormData(form) {
  return {
    maSV: form.maSV.value.trim(),
    hoTen: form.hoTen.value.trim(),
    ngaySinh: form.ngaySinh.value,
    lopHoc: form.lopHoc.value.trim(),
    diemTB: parseFloat(form.diemTB.value),
    email: form.email.value.trim(),
  };
}

function setFormData(form, student) {
  form.maSV.value = student.maSV;
  form.hoTen.value = student.hoTen;
  form.ngaySinh.value = student.ngaySinh;
  form.lopHoc.value = student.lopHoc;
  form.diemTB.value = student.diemTB;
  form.email.value = student.email;
}

function resetForm(form) {
  form.reset();
}

function calcAverageGrade(students) {
  if (!students.length) return 0;
  const sum = students.reduce((acc, s) => acc + Number(s.diemTB), 0);
  return (sum / students.length).toFixed(2);
}

function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = "message show " + (type || "success");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.classList.remove("show");
  }, 3500);
}
