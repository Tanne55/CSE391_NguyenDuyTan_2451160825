// ===== Product Catalog — 100% DOM render bằng JavaScript =====

const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/300x200/4a90d9/fff?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/300x200/2ecc71/fff?text=Samsung+S24", rating: 4.4, inStock: true },
    { id: 3, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/300x200/9b59b6/fff?text=Pixel+9", rating: 4.6, inStock: true },
    { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/300x200/34495e/fff?text=MacBook+Pro", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/300x200/e67e22/fff?text=Dell+XPS", rating: 4.7, inStock: true },
    { id: 6, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/300x200/c0392b/fff?text=ThinkPad", rating: 4.5, inStock: false },
    { id: 7, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/300x200/1abc9c/fff?text=iPad+Air", rating: 4.6, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/300x200/f39c12/fff?text=Xiaomi+Pad", rating: 4.2, inStock: true },
    { id: 9, name: "Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/300x200/8e44ad/fff?text=Galaxy+Tab", rating: 4.4, inStock: true },
    { id: 10, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/300x200/2c3e50/fff?text=AirPods", rating: 4.3, inStock: true },
    { id: 11, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/300x200/16a085/fff?text=Galaxy+Buds", rating: 4.1, inStock: true },
    { id: 12, name: "Apple Watch", price: 11990000, category: "accessory", image: "https://placehold.co/300x200/d35400/fff?text=Apple+Watch", rating: 4.5, inStock: false },
];

let currentCategory = "all";
let currentSort = "default";
let searchQuery = "";
let cartCount = 0;

// ===== BUILD UI =====
function buildApp() {
    const app = document.querySelector("#app");

    // Header
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
        <h1>🛒 Product Catalog</h1>
        <input type="text" class="search-box" placeholder="Tìm kiếm sản phẩm...">
        <div class="header-right">
            <div class="cart-icon">🛍️<span class="cart-badge" style="display:none">0</span></div>
            <button class="dark-toggle">🌙</button>
        </div>
    `;
    app.appendChild(header);

    // Controls
    const controls = document.createElement("div");
    controls.classList.add("controls");
    const categories = ["all", "phone", "laptop", "tablet", "accessory"];
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("category-btn");
        if (cat === "all") btn.classList.add("active");
        btn.dataset.category = cat;
        btn.textContent = cat === "all" ? "Tất cả" : cat.charAt(0).toUpperCase() + cat.slice(1);
        controls.appendChild(btn);
    });

    const sortSelect = document.createElement("select");
    sortSelect.classList.add("sort-select");
    sortSelect.innerHTML = `
        <option value="default">Sắp xếp</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
        <option value="name-asc">Tên A-Z</option>
        <option value="rating-desc">Đánh giá cao nhất</option>
    `;
    controls.appendChild(sortSelect);
    app.appendChild(controls);

    // Product grid
    const grid = document.createElement("div");
    grid.classList.add("product-grid");
    grid.id = "productGrid";
    app.appendChild(grid);

    // Events
    setupEvents();
    renderProducts();
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.querySelector("#productGrid");
    grid.innerHTML = "";

    let filtered = filterByCategory(products, currentCategory);
    filtered = searchProducts(filtered, searchQuery);
    filtered = sortProducts(filtered, currentSort);

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.dataset.id = product.id;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const body = document.createElement("div");
        body.classList.add("card-body");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = product.price.toLocaleString("vi-VN") + "đ";

        const rating = document.createElement("div");
        rating.classList.add("rating");
        rating.textContent = "⭐".repeat(Math.floor(product.rating)) + ` ${product.rating}`;

        const stock = document.createElement("div");
        stock.classList.add("stock");
        stock.textContent = product.inStock ? "✅ Còn hàng" : "❌ Hết hàng";

        body.appendChild(title);
        body.appendChild(price);
        body.appendChild(rating);
        body.appendChild(stock);

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-cart-btn");
        if (!product.inStock) addBtn.classList.add("out-of-stock");
        addBtn.textContent = product.inStock ? "🛒 Thêm giỏ" : "Hết hàng";
        addBtn.disabled = !product.inStock;

        card.appendChild(img);
        card.appendChild(body);
        card.appendChild(addBtn);
        grid.appendChild(card);
    });
}

// ===== FILTER / SEARCH / SORT =====
function filterByCategory(products, category) {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
}

function searchProducts(products, query) {
    if (!query) return products;
    const lower = query.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lower));
}

function sortProducts(products, sortType) {
    const sorted = [...products];
    switch (sortType) {
        case "price-asc": return sorted.sort((a, b) => a.price - b.price);
        case "price-desc": return sorted.sort((a, b) => b.price - a.price);
        case "name-asc": return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "rating-desc": return sorted.sort((a, b) => b.rating - a.rating);
        default: return sorted;
    }
}

// ===== MODAL =====
function showModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
        <p>⭐ Rating: ${product.rating}/5</p>
        <p>Category: ${product.category}</p>
        <p>${product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}</p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target.classList.contains("modal-close")) {
            overlay.remove();
        }
    });
}

// ===== EVENTS =====
function setupEvents() {
    // Search realtime
    document.querySelector(".search-box").addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Category filter
    document.querySelector(".controls").addEventListener("click", (e) => {
        if (!e.target.classList.contains("category-btn")) return;
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        renderProducts();
    });

    // Sort
    document.querySelector(".sort-select").addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Product grid — delegation
    document.querySelector("#productGrid").addEventListener("click", (e) => {
        // Add to cart
        if (e.target.classList.contains("add-cart-btn") && !e.target.disabled) {
            e.stopPropagation();
            cartCount++;
            const badge = document.querySelector(".cart-badge");
            badge.textContent = cartCount;
            badge.style.display = "flex";
            return;
        }

        // Card click → modal
        const card = e.target.closest(".product-card");
        if (card) {
            showModal(Number(card.dataset.id));
        }
    });

    // Dark mode toggle
    document.querySelector(".dark-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const btn = document.querySelector(".dark-toggle");
        btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
}

// ===== INIT =====
buildApp();
