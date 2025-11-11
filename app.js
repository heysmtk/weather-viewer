// API z OWM: 6ced9951620ea6b4cdb3f70805f7e675

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        result.textContent = "Zadej město prosím.";
        return;
    }

    fetchWeather(city);
});

async function fetchWeather(city) {
    result.textContent = "Načítám...";

    const API_KEY = "6ced9951620ea6b4cdb3f70805f7e675";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=cz`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            result.textContent = "Město nenalezeno.";
            return;
        }

        const data = await response.json();

        result.innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>Teplota: ${data.main.temp}°C</p>
            <p>Pocitová teplota: ${data.main.feels_like}°C</p>
            <p>Vlhkost: ${data.main.humidity}%</p>
            <p>Vítr: ${data.wind.speed} m/s</p>
            <p>${data.weather[0].description}</p>
        `;
    } catch (error) {
        result.textContent = "Došlo k chybě při načítání.";
        console.error(error);
    }
}