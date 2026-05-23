/**
 * Validation JavaScript thuần — BTTH03
 */
const MA_SV_REGEX = /^SV\d{6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BIRTH_DATE = "2010-12-31";

function setFieldError(form, fieldName, message) {
  const input = form[fieldName];
  const box = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (box) box.textContent = message || "";
  if (input) {
    input.style.borderColor = message ? "#f87171" : "";
  }
}

function clearAllErrors(form) {
  ["maSV", "hoTen", "ngaySinh", "lopHoc", "diemTB", "email"].forEach((name) =>
    setFieldError(form, name, "")
  );
}

function validateStudentForm(form, options) {
  clearAllErrors(form);
  const skipMaSV = options && options.skipMaSV;
  let valid = true;

  const maSV = form.maSV.value.trim();
  const hoTen = form.hoTen.value.trim();
  const ngaySinh = form.ngaySinh.value;
  const lopHoc = form.lopHoc.value.trim();
  const diemRaw = form.diemTB.value.trim();
  const email = form.email.value.trim();

  if (!skipMaSV) {
    if (!maSV) {
      setFieldError(form, "maSV", "Mã sinh viên không được để trống.");
      valid = false;
    } else if (!MA_SV_REGEX.test(maSV)) {
      setFieldError(form, "maSV", "Mã phải đúng dạng SV123456 (SV + 6 chữ số).");
      valid = false;
    }
  }

  if (!hoTen) {
    setFieldError(form, "hoTen", "Họ tên không được để trống.");
    valid = false;
  } else if (hoTen.length < 2) {
    setFieldError(form, "hoTen", "Họ tên tối thiểu 2 ký tự.");
    valid = false;
  }

  if (!ngaySinh) {
    setFieldError(form, "ngaySinh", "Ngày sinh không được để trống.");
    valid = false;
  } else if (ngaySinh > MAX_BIRTH_DATE) {
    setFieldError(form, "ngaySinh", "Ngày sinh không hợp lệ (sinh viên phải trước 2011).");
    valid = false;
  }

  if (!lopHoc) {
    setFieldError(form, "lopHoc", "Lớp học không được để trống.");
    valid = false;
  }

  if (!diemRaw) {
    setFieldError(form, "diemTB", "Điểm TB không được để trống.");
    valid = false;
  } else {
    const diem = parseFloat(diemRaw);
    if (Number.isNaN(diem) || diem < 0 || diem > 4) {
      setFieldError(form, "diemTB", "Điểm TB phải là số từ 0 đến 4.");
      valid = false;
    }
  }

  if (!email) {
    setFieldError(form, "email", "Email không được để trống.");
    valid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    setFieldError(form, "email", "Email không đúng định dạng.");
    valid = false;
  }

  return valid;
}
