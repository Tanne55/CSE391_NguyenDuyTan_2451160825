// ===== User Directory — CRUD với JSONPlaceholder API =====

// ===== API LAYER =====
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    }
};

// ===== UI LAYER =====
const ui = {
    showLoading() {
        document.querySelector("#loading").style.display = "block";
        document.querySelector("#userList").style.display = "none";
    },

    hideLoading() {
        document.querySelector("#loading").style.display = "none";
        document.querySelector("#userList").style.display = "grid";
    },

    showToast(message, isError = false) {
        const toast = document.querySelector("#toast");
        toast.textContent = message;
        toast.classList.toggle("error", isError);
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    },

    renderUsers(users) {
        const list = document.querySelector("#userList");
        list.innerHTML = "";

        if (users.length === 0) {
            list.innerHTML = "<p style='text-align:center;color:#888'>Không tìm thấy user nào</p>";
            return;
        }

        users.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");
            card.innerHTML = `
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>📧 ${user.email}</p>
                    <p>👤 @${user.username}</p>
                </div>
                <div class="user-actions">
                    <button class="btn-edit" data-id="${user.id}">✏️ Sửa</button>
                    <button class="btn-delete" data-id="${user.id}">🗑️ Xóa</button>
                </div>
            `;
            list.appendChild(card);
        });
    }
};

// ===== STATE =====
let users = [];
let filteredUsers = [];

// ===== LOAD USERS =====
async function loadUsers() {
    ui.showLoading();
    try {
        users = await api.getUsers();
        filteredUsers = users;
        ui.renderUsers(filteredUsers);
    } catch (error) {
        ui.showToast("Lỗi khi tải danh sách users: " + error.message, true);
    } finally {
        ui.hideLoading();
    }
}

// ===== SEARCH =====
document.querySelector("#searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    );
    ui.renderUsers(filteredUsers);
});

// ===== MODAL =====
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const userForm = document.querySelector("#userForm");
const userIdInput = document.querySelector("#userId");
const userNameInput = document.querySelector("#userName");
const userEmailInput = document.querySelector("#userEmail");
const userUsernameInput = document.querySelector("#userUsername");

function openModal(user = null) {
    if (user) {
        modalTitle.textContent = "Sửa User";
        userIdInput.value = user.id;
        userNameInput.value = user.name;
        userEmailInput.value = user.email;
        userUsernameInput.value = user.username;
    } else {
        modalTitle.textContent = "Thêm User";
        userForm.reset();
        userIdInput.value = "";
    }
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

document.querySelector("#addUserBtn").addEventListener("click", () => openModal());
document.querySelector("#cancelBtn").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// ===== CREATE / UPDATE =====
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = userIdInput.value;
    const data = {
        name: userNameInput.value,
        email: userEmailInput.value,
        username: userUsernameInput.value
    };

    try {
        if (id) {
            // UPDATE
            await api.updateUser(id, data);
            const index = users.findIndex(u => u.id == id);
            if (index !== -1) {
                users[index] = { ...users[index], ...data };
            }
            ui.showToast("Cập nhật user thành công!");
        } else {
            // CREATE
            const newUser = await api.createUser(data);
            users.unshift({ ...newUser, id: Date.now() }); // Fake ID vì JSONPlaceholder không persist
            ui.showToast("Thêm user thành công!");
        }
        filteredUsers = users;
        ui.renderUsers(filteredUsers);
        closeModal();
    } catch (error) {
        ui.showToast("Lỗi: " + error.message, true);
    }
});

// ===== DELETE =====
document.querySelector("#userList").addEventListener("click", async (e) => {
    // EDIT
    if (e.target.classList.contains("btn-edit")) {
        const id = e.target.dataset.id;
        const user = users.find(u => u.id == id);
        if (user) openModal(user);
        return;
    }

    // DELETE
    if (e.target.classList.contains("btn-delete")) {
        const id = e.target.dataset.id;
        if (!confirm("Bạn có chắc muốn xóa user này?")) return;

        try {
            await api.deleteUser(id);
            users = users.filter(u => u.id != id);
            filteredUsers = filteredUsers.filter(u => u.id != id);
            ui.renderUsers(filteredUsers);
            ui.showToast("Xóa user thành công!");
        } catch (error) {
            ui.showToast("Lỗi khi xóa: " + error.message, true);
        }
    }
});

// ===== INIT =====
loadUsers();
