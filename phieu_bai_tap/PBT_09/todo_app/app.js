// ===== Todo App — Vanilla JS + LocalStorage + Event Delegation =====

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const itemCount = document.querySelector("#itemCount");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filtersContainer = document.querySelector(".filters");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ===== RENDER =====
function render() {
    list.innerHTML = "";

    const filtered = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;
        if (todo.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.classList.add("todo-text");
        span.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateCount();
    save();
}

// ===== ADD =====
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now().toString(),
        text,
        completed: false
    });

    input.value = "";
    input.focus();
    render();
});

// ===== EVENT DELEGATION trên #todoList =====
list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    // Delete
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        render();
        return;
    }

    // Toggle completed
    if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            render();
        }
    }
});

// ===== DOUBLE-CLICK TO EDIT =====
list.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;

    const li = e.target.closest("li");
    const id = li.dataset.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.value = todo.text;

    // Thay span bằng input
    const span = li.querySelector(".todo-text");
    span.style.display = "none";
    li.insertBefore(editInput, span);
    editInput.focus();
    editInput.select();

    // Save on Enter or blur
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText) {
            todo.text = newText;
        }
        render();
    };

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") render(); // Cancel
    });
    editInput.addEventListener("blur", saveEdit);
});

// ===== FILTERS =====
filtersContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    filtersContainer.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentFilter = e.target.dataset.filter;
    render();
});

// ===== CLEAR COMPLETED =====
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
});

// ===== HELPERS =====
function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ===== INIT =====
render();
