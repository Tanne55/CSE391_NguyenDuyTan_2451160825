/**
 * BTTH03 — jQuery Validation Plugin
 */
$(function () {
  const $tableBody = $("#tableBody");
  const $form = $("#studentForm");
  const $modal = $("#modalOverlay");
  const $modalTitle = $("#modalTitle");
  const $message = $("#message");

  let students = loadStudents();
  let editingId = null;

  function openModal(isEdit) {
    $modalTitle.text(isEdit ? "Cập nhật sinh viên" : "Thêm sinh viên");
    $modal.addClass("open");
    $("#maSV").prop("readonly", isEdit);
    if (isEdit) {
      $("#maSV").rules("remove", "required maSVPattern");
    } else {
      $("#maSV").rules("add", {
        required: true,
        maSVPattern: true,
      });
    }
    $form.validate().resetForm();
  }

  function closeModal() {
    $modal.removeClass("open");
    editingId = null;
    $form[0].reset();
    $("#maSV").prop("readonly", false);
    $form.validate().resetForm();
  }

  function updateStatistics() {
    $("#statTotal").text(students.length);
    $("#statAvg").text(calcAverageGrade(students));
  }

  function renderStudents() {
    if (!students.length) {
      $tableBody.html(
        '<tr class="empty-row"><td colspan="8">Chưa có sinh viên.</td></tr>'
      );
      updateStatistics();
      return;
    }

    const rows = students
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
    $tableBody.html(rows);
    updateStatistics();
  }

  function showMsg(text, type) {
    showMessage(document.getElementById("message"), text, type);
  }

  $.validator.addMethod(
    "maSVPattern",
    function (value, element) {
      return this.optional(element) || /^SV\d{6}$/.test(value);
    },
    "Mã phải đúng dạng SV123456"
  );

  $.validator.addMethod(
    "diemRange",
    function (value, element) {
      if (this.optional(element)) return true;
      const n = parseFloat(value);
      return !Number.isNaN(n) && n >= 0 && n <= 4;
    },
    "Điểm TB từ 0 đến 4"
  );

  $.validator.addMethod(
    "ngaySinhHopLe",
    function (value, element) {
      if (this.optional(element)) return true;
      return value <= "2010-12-31";
    },
    "Ngày sinh không hợp lệ"
  );

  $form.validate({
    rules: {
      maSV: { required: true, maSVPattern: true },
      hoTen: { required: true, minlength: 2, maxlength: 100 },
      ngaySinh: { required: true, ngaySinhHopLe: true },
      lopHoc: { required: true, minlength: 2 },
      diemTB: { required: true, diemRange: true },
      email: { required: true, email: true },
    },
    messages: {
      maSV: {
        required: "Mã sinh viên không được để trống.",
      },
      hoTen: { required: "Họ tên không được để trống." },
      ngaySinh: { required: "Ngày sinh không được để trống." },
      lopHoc: { required: "Lớp học không được để trống." },
      diemTB: { required: "Điểm TB không được để trống." },
      email: {
        required: "Email không được để trống.",
        email: "Email không đúng định dạng.",
      },
    },
    errorElement: "label",
    errorClass: "error",
    submitHandler: function () {
      const data = {
        maSV: $("#maSV").val().trim(),
        hoTen: $("#hoTen").val().trim(),
        ngaySinh: $("#ngaySinh").val(),
        lopHoc: $("#lopHoc").val().trim(),
        diemTB: parseFloat($("#diemTB").val()),
        email: $("#email").val().trim(),
      };

      if (editingId) {
        const idx = students.findIndex((s) => s.id === editingId);
        const dup = students.some(
          (s, i) => i !== idx && s.maSV.toLowerCase() === data.maSV.toLowerCase()
        );
        if (dup) {
          showMsg("Mã sinh viên đã tồn tại.", "error");
          return;
        }
        students[idx] = { ...students[idx], ...data };
        showMsg("Cập nhật thành công.", "success");
      } else {
        if (students.some((s) => s.maSV.toLowerCase() === data.maSV.toLowerCase())) {
          showMsg("Mã sinh viên đã tồn tại.", "error");
          return;
        }
        students.push({ id: createStudentId(), ...data });
        showMsg("Thêm sinh viên thành công.", "success");
      }

      saveStudents(students);
      renderStudents();
      closeModal();
    },
  });

  $("#btnOpenAdd").on("click", function () {
    editingId = null;
    $form[0].reset();
    openModal(false);
  });

  $("#btnCloseModal, #btnCancel").on("click", closeModal);

  $tableBody.on("click", ".btn-edit", function () {
    const id = $(this).closest("tr").data("id");
    const student = students.find((s) => s.id === id);
    if (!student) return;
    editingId = id;
    $("#maSV").val(student.maSV);
    $("#hoTen").val(student.hoTen);
    $("#ngaySinh").val(student.ngaySinh);
    $("#lopHoc").val(student.lopHoc);
    $("#diemTB").val(student.diemTB);
    $("#email").val(student.email);
    openModal(true);
  });

  $tableBody.on("click", ".btn-delete", function () {
    const id = $(this).closest("tr").data("id");
    const student = students.find((s) => s.id === id);
    if (!student) return;
    if (confirm(`Xóa sinh viên ${student.hoTen}?`)) {
      students = students.filter((s) => s.id !== id);
      saveStudents(students);
      renderStudents();
      showMsg("Đã xóa sinh viên.", "success");
    }
  });

  renderStudents();
});
