/**
 * BTTH03 — Chỉ dùng HTML5 Constraint Validation.
 * Submit: checkValidity() / reportValidity() — không viết rule JS.
 */
(function () {
  const tableBody = document.getElementById("tableBody");
  const form = document.getElementById("studentForm");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const messageEl = document.getElementById("message");
  const statTotal = document.getElementById("statTotal");
  const statAvg = document.getElementById("statAvg");

  let students = loadStudents();
  let editingId = null;

  function openModal(isEdit) {
    modalTitle.textContent = isEdit ? "Cập nhật sinh viên" : "Thêm sinh viên";
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    form.maSV.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    editingId = null;
    resetForm(form);
    form.maSV.readOnly = false;
  }

  function updateStatistics() {
    statTotal.textContent = students.length;
    statAvg.textContent = calcAverageGrade(students);
  }

  function renderStudents() {
    if (!students.length) {
      tableBody.innerHTML =
        '<tr class="empty-row"><td colspan="8">Chưa có sinh viên. Bấm "Thêm sinh viên".</td></tr>';
      updateStatistics();
      return;
    }

    tableBody.innerHTML = students
      .map(
        (s, i) => `
      <tr data-id="${s.id}">
        <td>${i + 1}</td>
        <td>${s.maSV}</td>
        <td>${s.hoTen}</td>
        <td>${s.ngaySinh}</td>
        <td>${s.lopHoc}</td>
        <td>${s.diemTB}</td>
        <td>${s.email}</td>
        <td>
          <button type="button" class="btn btn-info btn-sm btn-edit">Sửa</button>
          <button type="button" class="btn btn-danger btn-sm btn-delete">Xóa</button>
        </td>
      </tr>`
      )
      .join("");
    updateStatistics();
  }

  document.getElementById("btnOpenAdd").addEventListener("click", () => {
    editingId = null;
    resetForm(form);
    form.maSV.readOnly = false;
    openModal(false);
  });

  document.getElementById("btnCloseModal").addEventListener("click", closeModal);
  document.getElementById("btnCancel").addEventListener("click", closeModal);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = getFormData(form);

    if (editingId) {
      const idx = students.findIndex((s) => s.id === editingId);
      if (idx !== -1) {
        const dup = students.some(
          (s, i) => i !== idx && s.maSV.toLowerCase() === data.maSV.toLowerCase()
        );
        if (dup) {
          alert("Mã sinh viên đã tồn tại.");
          return;
        }
        students[idx] = { ...students[idx], ...data };
        showMessage(messageEl, "Cập nhật sinh viên thành công.", "success");
      }
    } else {
      if (students.some((s) => s.maSV.toLowerCase() === data.maSV.toLowerCase())) {
        alert("Mã sinh viên đã tồn tại.");
        return;
      }
      students.push({ id: createStudentId(), ...data });
      showMessage(messageEl, "Thêm sinh viên thành công.", "success");
    }

    saveStudents(students);
    renderStudents();
    closeModal();
  });

  tableBody.addEventListener("click", function (e) {
    const row = e.target.closest("tr[data-id]");
    if (!row) return;
    const id = row.dataset.id;
    const student = students.find((s) => s.id === id);
    if (!student) return;

    if (e.target.classList.contains("btn-edit")) {
      editingId = id;
      setFormData(form, student);
      form.maSV.readOnly = true;
      openModal(true);
    }

    if (e.target.classList.contains("btn-delete")) {
      if (confirm(`Xóa sinh viên ${student.hoTen} (${student.maSV})?`)) {
        students = students.filter((s) => s.id !== id);
        saveStudents(students);
        renderStudents();
        showMessage(messageEl, "Đã xóa sinh viên.", "success");
      }
    }
  });

  renderStudents();
})();
