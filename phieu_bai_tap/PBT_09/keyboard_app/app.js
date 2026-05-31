// ===== Keyboard Shortcuts App =====

// ===== DATA =====
const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/seed/${i + 10}/800/500`,
    thumb: `https://picsum.photos/seed/${i + 10}/100/100`,
    alt: `Ảnh ${i + 1}`
}));

const commands = [
    { name: "Ảnh tiếp theo", action: () => navigateGallery(1), shortcut: "→" },
    { name: "Ảnh trước", action: () => navigateGallery(-1), shortcut: "←" },
    { name: "Play/Pause slideshow", action: () => toggleSlideshow(), shortcut: "Space" },
    { name: "Mở ảnh lớn", action: () => openLightbox(), shortcut: "Enter" },
    { name: "Ảnh đầu tiên", action: () => goToImage(0), shortcut: "1" },
    { name: "Ảnh cuối cùng", action: () => goToImage(images.length - 1), shortcut: "9" },
    { name: "Đóng Command Palette", action: () => closePalette(), shortcut: "Esc" },
];

// ===== STATE =====
let currentIndex = 0;
let isPlaying = false;
let slideshowInterval = null;
let paletteSelectedIndex = 0;
let filteredCommands = [...commands];

// ===== GALLERY =====
function renderGallery() {
    const img = document.querySelector("#galleryImg");
    const counter = document.querySelector(".gallery-counter");
    const thumbnails = document.querySelector(".thumbnails");

    img.src = images[currentIndex].src;
    img.alt = images[currentIndex].alt;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;

    // Thumbnails
    thumbnails.innerHTML = "";
    images.forEach((image, i) => {
        const thumb = document.createElement("img");
        thumb.src = image.thumb;
        thumb.alt = `Thumbnail ${i + 1}`;
        thumb.tabIndex = 0;
        thumb.role = "tab";
        thumb.setAttribute("aria-selected", i === currentIndex);
        if (i === currentIndex) thumb.classList.add("active");
        thumb.addEventListener("click", () => goToImage(i));
        thumb.addEventListener("keydown", (e) => {
            if (e.key === "Enter") goToImage(i);
        });
        thumbnails.appendChild(thumb);
    });
}

function navigateGallery(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    renderGallery();
}

function goToImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        renderGallery();
    }
}

function toggleSlideshow() {
    const btn = document.querySelector("#playBtn");
    if (isPlaying) {
        clearInterval(slideshowInterval);
        btn.textContent = "▶ Play";
        isPlaying = false;
    } else {
        slideshowInterval = setInterval(() => navigateGallery(1), 2000);
        btn.textContent = "⏸ Pause";
        isPlaying = true;
    }
}

// ===== LIGHTBOX =====
function openLightbox() {
    const lightbox = document.querySelector("#lightbox");
    const img = document.querySelector("#lightboxImg");
    img.src = images[currentIndex].src;
    img.alt = images[currentIndex].alt;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.querySelector("#lightbox").style.display = "none";
}

// ===== COMMAND PALETTE =====
function openPalette() {
    const palette = document.querySelector("#commandPalette");
    palette.style.display = "flex";
    const input = document.querySelector("#paletteInput");
    input.value = "";
    input.focus();
    filteredCommands = [...commands];
    paletteSelectedIndex = 0;
    renderPaletteList();
}

function closePalette() {
    document.querySelector("#commandPalette").style.display = "none";
}

function renderPaletteList() {
    const list = document.querySelector("#paletteList");
    list.innerHTML = "";
    filteredCommands.forEach((cmd, i) => {
        const li = document.createElement("li");
        li.role = "option";
        li.setAttribute("aria-selected", i === paletteSelectedIndex);
        if (i === paletteSelectedIndex) li.classList.add("selected");
        li.innerHTML = `<span>${cmd.name}</span><span class="shortcut">${cmd.shortcut}</span>`;
        li.addEventListener("click", () => {
            cmd.action();
            closePalette();
        });
        list.appendChild(li);
    });
}

// ===== EVENT LISTENERS =====

// Gallery nav buttons
document.querySelector(".prev").addEventListener("click", () => navigateGallery(-1));
document.querySelector(".next").addEventListener("click", () => navigateGallery(1));
document.querySelector("#playBtn").addEventListener("click", toggleSlideshow);

// Gallery image click → lightbox
document.querySelector("#galleryImg").addEventListener("click", openLightbox);

// Lightbox close
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector("#lightbox").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeLightbox();
});

// Command palette input
document.querySelector("#paletteInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    paletteSelectedIndex = 0;
    renderPaletteList();
});

// Palette overlay click to close
document.querySelector("#commandPalette").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closePalette();
});

// ===== GLOBAL KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (e) => {
    const palette = document.querySelector("#commandPalette");
    const lightbox = document.querySelector("#lightbox");
    const paletteOpen = palette.style.display !== "none";
    const lightboxOpen = lightbox.style.display !== "none";

    // Ctrl+K → Command Palette
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
        return;
    }

    // Escape
    if (e.key === "Escape") {
        if (paletteOpen) { closePalette(); return; }
        if (lightboxOpen) { closeLightbox(); return; }
    }

    // Inside palette — keyboard navigation
    if (paletteOpen) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            paletteSelectedIndex = (paletteSelectedIndex + 1) % filteredCommands.length;
            renderPaletteList();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            paletteSelectedIndex = (paletteSelectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderPaletteList();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands[paletteSelectedIndex]) {
                filteredCommands[paletteSelectedIndex].action();
                closePalette();
            }
        }
        return;
    }

    // Gallery shortcuts (only when palette/lightbox closed)
    if (!paletteOpen && !lightboxOpen) {
        if (e.key === "ArrowRight") navigateGallery(1);
        else if (e.key === "ArrowLeft") navigateGallery(-1);
        else if (e.key === " ") { e.preventDefault(); toggleSlideshow(); }
        else if (e.key === "Enter") openLightbox();
        else if (e.key >= "1" && e.key <= "9") goToImage(parseInt(e.key) - 1);
    }
});

// ===== INIT =====
renderGallery();
