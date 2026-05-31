// ===== Weather App — Open-Meteo API =====

const form = document.querySelector("#searchForm");
const input = document.querySelector("#cityInput");
const loading = document.querySelector("#loading");
const result = document.querySelector("#weatherResult");
const error = document.querySelector("#error");
const historyList = document.querySelector("#historyList");

let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

// ===== CITY COORDINATES (simplified) =====
const cityCoords = {
    "hanoi": { lat: 21.0285, lon: 105.8542, name: "Hà Nội" },
    "saigon": { lat: 10.8231, lon: 106.6297, name: "Sài Gòn" },
    "hcm": { lat: 10.8231, lon: 106.6297, name: "TP.HCM" },
    "danang": { lat: 16.0544, lon: 108.2022, name: "Đà Nẵng" },
    "haiphong": { lat: 20.8449, lon: 106.6881, name: "Hải Phòng" },
    "cantho": { lat: 10.0452, lon: 105.7469, name: "Cần Thơ" },
    "nhatrang": { lat: 12.2388, lon: 109.1967, name: "Nha Trang" },
    "dalat": { lat: 11.9404, lon: 108.4583, name: "Đà Lạt" },
    "hue": { lat: 16.4637, lon: 107.5909, name: "Huế" },
    "vungtau": { lat: 10.3460, lon: 107.0843, name: "Vũng Tàu" },
};

// ===== FETCH WEATHER =====
async function fetchWeather(cityKey) {
    const coords = cityCoords[cityKey.toLowerCase()];
    if (!coords) {
        throw new Error("Thành phố không tồn tại trong danh sách");
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=Asia/Bangkok`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return { ...data, cityName: coords.name };
}

// ===== WEATHER CODE TO ICON =====
function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    return "⛈️";
}

function getWeatherDescription(code) {
    if (code === 0) return "Trời quang";
    if (code <= 3) return "Có mây";
    if (code <= 67) return "Mưa";
    if (code <= 77) return "Tuyết";
    if (code <= 82) return "Mưa rào";
    return "Giông bão";
}

// ===== DISPLAY STATES =====
function showLoading() {
    loading.style.display = "block";
    result.style.display = "none";
    error.style.display = "none";
}

function showResult(data) {
    loading.style.display = "none";
    result.style.display = "block";
    error.style.display = "none";

    const weather = data.current_weather;
    document.querySelector("#cityName").textContent = data.cityName;
    document.querySelector("#temp").textContent = Math.round(weather.temperature) + "°C";
    document.querySelector("#icon").textContent = getWeatherIcon(weather.weathercode);
    document.querySelector("#humidity").textContent = "N/A"; // Open-Meteo không có humidity trong current_weather
    document.querySelector("#description").textContent = getWeatherDescription(weather.weathercode);
    document.querySelector("#windSpeed").textContent = weather.windspeed + " km/h";
}

function showError(message) {
    loading.style.display = "none";
    result.style.display = "none";
    error.style.display = "block";
    error.textContent = "❌ " + message;
}

// ===== HISTORY =====
function addToHistory(cityName) {
    // Remove duplicate
    history = history.filter(c => c !== cityName);
    // Add to front
    history.unshift(cityName);
    // Keep only 5
    history = history.slice(0, 5);
    // Save
    localStorage.setItem("weatherHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            input.value = city;
            form.dispatchEvent(new Event("submit"));
        });
        historyList.appendChild(li);
    });
}

// ===== FORM SUBMIT =====
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    showLoading();

    try {
        const data = await fetchWeather(city);
        showResult(data);
        addToHistory(data.cityName);
    } catch (err) {
        if (err.message.includes("Failed to fetch")) {
            showError("Lỗi mạng: Không thể kết nối đến server");
        } else {
            showError(err.message);
        }
    }
});

// ===== INIT =====
renderHistory();
