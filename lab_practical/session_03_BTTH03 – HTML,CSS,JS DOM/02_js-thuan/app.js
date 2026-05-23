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
    clearAllErrors(form);
    form.maSV.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    editingId = null;
    resetForm(form);
    clearAllErrors(form);
    form.maSV.readOnly = false;
  }

  function updateStatistics() {
    statTotal.textContent = students.length;
    statAvg.textContent = calcAverageGrade(students);
  }

  function renderStudents() {
    if (!students.length) {
      tableBody.innerHTML =
        '<tr class="empty-row"><td colspan="8">Chưa có sinh viên.</td></tr>';
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

  function persistFromForm() {
    const data = getFormData(form);
    data.diemTB = parseFloat(form.diemTB.value.trim());

    if (editingId) {
      const idx = students.findIndex((s) => s.id === editingId);
      if (idx === -1) return;
      const dup = students.some(
        (s, i) => i !== idx && s.maSV.toLowerCase() === data.maSV.toLowerCase()
      );
      if (dup) {
        setFieldError(form, "maSV", "Mã sinh viên đã tồn tại.");
        return;
      }
      students[idx] = { ...students[idx], ...data };
      showMessage(messageEl, "Cập nhật thành công.", "success");
    } else {
      if (students.some((s) => s.maSV.toLowerCase() === data.maSV.toLowerCase())) {
        setFieldError(form, "maSV", "Mã sinh viên đã tồn tại.");
        return;
      }
      students.push({ id: createStudentId(), ...data });
      showMessage(messageEl, "Thêm sinh viên thành công.", "success");
    }

    saveStudents(students);
    renderStudents();
    closeModal();
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
    const ok = validateStudentForm(form, { skipMaSV: !!editingId });
    if (!ok) {
      showMessage(messageEl, "Vui lòng sửa các lỗi trong form.", "error");
      return;
    }
    persistFromForm();
  });

  ["maSV", "hoTen", "ngaySinh", "lopHoc", "diemTB", "email"].forEach((name) => {
    form[name].addEventListener("input", () => {
      if (form.querySelector(`[data-error-for="${name}"]`).textContent) {
        validateStudentForm(form, { skipMaSV: !!editingId });
      }
    });
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
      if (confirm(`Xóa sinh viên ${student.hoTen}?`)) {
        students = students.filter((s) => s.id !== id);
        saveStudents(students);
        renderStudents();
        showMessage(messageEl, "Đã xóa sinh viên.", "success");
      }
    }
  });

  renderStudents();
})();
