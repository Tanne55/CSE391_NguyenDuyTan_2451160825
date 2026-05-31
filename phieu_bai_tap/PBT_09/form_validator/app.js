// ===== Form Validator — Real-time validation =====

const form = document.querySelector("#registerForm");
const submitBtn = document.querySelector("#submitBtn");
const fields = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
    phone: document.querySelector("#phone")
};

const validity = { name: false, email: false, password: false, confirmPassword: false, phone: false };

// ===== VALIDATORS =====
function validateName() {
    const value = fields.name.value.trim();
    if (value.length < 2) {
        setInvalid(fields.name, "Tên phải có ít nhất 2 ký tự");
        validity.name = false;
    } else if (value.length > 50) {
        setInvalid(fields.name, "Tên không quá 50 ký tự");
        validity.name = false;
    } else {
        setValid(fields.name);
        validity.name = true;
    }
    checkSubmit();
}

function validateEmail() {
    const value = fields.email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        setInvalid(fields.email, "Email không được để trống");
        validity.email = false;
    } else if (!regex.test(value)) {
        setInvalid(fields.email, "Email không đúng định dạng (vd: abc@email.com)");
        validity.email = false;
    } else {
        setValid(fields.email);
        validity.email = true;
    }
    checkSubmit();
}

function validatePassword() {
    const value = fields.password.value;
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    if (value.length < 8) {
        setInvalid(fields.password, "Mật khẩu phải có ít nhất 8 ký tự");
        strengthFill.style.width = "33%";
        strengthFill.style.background = "#e74c3c";
        strengthText.textContent = "Yếu";
        strengthText.style.color = "#e74c3c";
        validity.password = false;
    } else {
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

        if (hasUpper && hasLower && hasNumber && hasSpecial) {
            strengthFill.style.width = "100%";
            strengthFill.style.background = "#27ae60";
            strengthText.textContent = "Mạnh";
            strengthText.style.color = "#27ae60";
        } else if ((hasLower || hasUpper) && hasNumber) {
            strengthFill.style.width = "66%";
            strengthFill.style.background = "#f39c12";
            strengthText.textContent = "Trung bình";
            strengthText.style.color = "#f39c12";
        } else {
            strengthFill.style.width = "33%";
            strengthFill.style.background = "#e74c3c";
            strengthText.textContent = "Yếu";
            strengthText.style.color = "#e74c3c";
        }

        setValid(fields.password);
        validity.password = true;
    }

    // Re-validate confirm password khi password thay đổi
    if (fields.confirmPassword.value) validateConfirmPassword();
    checkSubmit();
}

function validateConfirmPassword() {
    const value = fields.confirmPassword.value;
    if (!value) {
        setInvalid(fields.confirmPassword, "Vui lòng xác nhận mật khẩu");
        validity.confirmPassword = false;
    } else if (value !== fields.password.value) {
        setInvalid(fields.confirmPassword, "Mật khẩu không khớp");
        validity.confirmPassword = false;
    } else {
        setValid(fields.confirmPassword);
        validity.confirmPassword = true;
    }
    checkSubmit();
}

function validatePhone() {
    const raw = fields.phone.value.replace(/\D/g, "");

    // Auto-format: 0901-234-567
    let formatted = "";
    for (let i = 0; i < raw.length && i < 10; i++) {
        if (i === 4 || i === 7) formatted += "-";
        formatted += raw[i];
    }
    fields.phone.value = formatted;

    if (raw.length === 0) {
        setInvalid(fields.phone, "Số điện thoại không được để trống");
        validity.phone = false;
    } else if (raw.length < 10) {
        setInvalid(fields.phone, "Số điện thoại phải có 10 chữ số");
        validity.phone = false;
    } else if (!/^0/.test(raw)) {
        setInvalid(fields.phone, "Số điện thoại phải bắt đầu bằng 0");
        validity.phone = false;
    } else {
        setValid(fields.phone);
        validity.phone = true;
    }
    checkSubmit();
}

// ===== HELPERS =====
function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    const icon = input.parentElement.querySelector(".status-icon");
    icon.textContent = "✅";
    const msg = input.parentElement.querySelector(".error-msg");
    msg.textContent = "";
}

function setInvalid(input, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    const icon = input.parentElement.querySelector(".status-icon");
    icon.textContent = "❌";
    const msg = input.parentElement.querySelector(".error-msg");
    msg.textContent = message;
}

function checkSubmit() {
    const allValid = Object.values(validity).every(v => v);
    submitBtn.disabled = !allValid;
}

// ===== EVENT LISTENERS =====
fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.password.addEventListener("input", validatePassword);
fields.confirmPassword.addEventListener("input", validateConfirmPassword);
fields.phone.addEventListener("input", validatePhone);

// ===== SUBMIT =====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const modal = document.querySelector("#successModal");
    const content = document.querySelector("#modalContent");
    content.innerHTML = `
        <p><strong>Tên:</strong> ${fields.name.value}</p>
        <p><strong>Email:</strong> ${fields.email.value}</p>
        <p><strong>SĐT:</strong> ${fields.phone.value}</p>
    `;
    modal.style.display = "flex";
});

document.querySelector("#modalClose").addEventListener("click", () => {
    document.querySelector("#successModal").style.display = "none";
});
