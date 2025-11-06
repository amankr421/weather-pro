const apiKey = "24123ecc29e3490ab0d164912250609";
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const realFeelVal = document.getElementById("realFeelVal");
const humidityVal = document.getElementById("humidityVal");
const windSpeedVal = document.getElementById("windSpeedVal");
const forecastSection = document.querySelector(".forecast-section");

// --- Event Listeners ---
searchBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Initial Weather Fetch on Load
document.addEventListener("DOMContentLoaded", () => {
    fetchWeather("Ludhiana, Punjab, India");
});

// Fetch Weather Function
async function fetchWeather(location) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            weatherResult.innerHTML = `<p class="placeholder-text">${data.error.message}</p>`;

            realFeelVal.textContent = "--°C";
            humidityVal.textContent = "--%";
            windSpeedVal.textContent = "-- kph";
            forecastSection.innerHTML = `
                <div class="hourly-forecast-card"><p>11 PM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>12 AM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>01 AM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>02 AM <span class="temp">--°C</span></p></div>
            `;
            return;
        }

        const { name, country, localtime } = data.location;
        const { temp_c, condition, humidity, wind_kph, feelslike_c } = data.current;

        const mainWeatherHTML = `
            <p class="city-name">${name}</p>
            <p class="country-name">${country}</p>
            <div class="temp-display">
                <p class="current-temp">${Math.round(temp_c)}°C</p>
                <p class="feels-like-temp">${Math.round(feelslike_c)}°C</p>
            </div>
            <p class="time-display">${formatTime(localtime)}</p>
            <p class="condition-text">
                <img class="weather-icon" src="https:${condition.icon}" alt="${condition.text}">
                ${condition.text}
            </p>
        `;
        weatherResult.innerHTML = mainWeatherHTML;

        // Update Additional Info Cards
        realFeelVal.textContent = `${Math.round(feelslike_c)}°C`;
        humidityVal.textContent = `${humidity}%`;
        windSpeedVal.textContent = `${Math.round(wind_kph)} kph`;

        forecastSection.innerHTML = `
            <div class="hourly-forecast-card">
                <p>11 PM <span class="temp">${Math.round(temp_c) - 2}°C</span></p>
            </div>
            <div class="hourly-forecast-card">
                <p>12 AM <span class="temp">${Math.round(temp_c) - 3}°C</span></p>
            </div>
            <div class="hourly-forecast-card">
                <p>01 AM <span class="temp">${Math.round(temp_c) - 4}°C</span></p>
            </div>
            <div class="hourly-forecast-card">
                <p>02 AM <span class="temp">${Math.round(temp_c) - 5}°C</span></p>
            </div>
        `;


    } catch (error) {
        weatherResult.innerHTML = `<p class="placeholder-text">Unable to fetch weather. Please try again.</p>`;
        realFeelVal.textContent = "--°C";
        humidityVal.textContent = "--%";
        windSpeedVal.textContent = "-- kph";
        forecastSection.innerHTML = `
                <div class="hourly-forecast-card"><p>11 PM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>12 AM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>01 AM <span class="temp">--°C</span></p></div>
                <div class="hourly-forecast-card"><p>02 AM <span class="temp">--°C</span></p></div>
            `;
        console.error("Error fetching weather:", error);
    }
}

//Helper for Time Formatting
function formatTime(dateTimeString) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));