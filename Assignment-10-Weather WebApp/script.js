function setBackground(weatherMain) {
    const body = document.body;
    switch (weatherMain.toLowerCase()) {
        case "clear":
            body.style.background = "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"; // sunny warm colors
            break;
        case "clouds":
            body.style.background = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"; // cloudy greyish
            break;
        case "rain":
        case "drizzle":
            body.style.background = "linear-gradient(135deg, #667db6 0%, #1b1b2f 100%)"; // rainy blues
            break;
        case "thunderstorm":
            body.style.background = "linear-gradient(135deg, #232526 0%, #1c1c1c 100%)"; // dark stormy
            break;
        case "snow":
            body.style.background = "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"; // snowy cold light blues
            break;
        default:
            body.style.background = "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"; // default
    }
}

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('weather-result');

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        resultDiv.classList.remove('show');
        return;
    }
    
    resultDiv.innerHTML = "Loading...";
    resultDiv.classList.remove('show');

    const apiKey = "8bb11e864a47dfa3ad700abab4cc86cc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        setBackground(data.weather[0].main);

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const weather = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <p><strong>${data.main.temp}°C</strong></p>
            <p>${data.weather[0].main} (${data.weather[0].description})</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        `;

        resultDiv.innerHTML = weather;

        resultDiv.classList.remove('show');
        void resultDiv.offsetWidth;
        resultDiv.classList.add('show');
    } catch (err) {
        resultDiv.innerHTML = "Could not fetch weather: " + err.message;
        resultDiv.classList.remove('show');
    }
}


async function getWeatherByLocation() {
    const resultDiv = document.getElementById('weather-result');

    if (!navigator.geolocation) {
        resultDiv.innerHTML = "Geolocation is not supported by your browser.";
        resultDiv.classList.remove('show');
        return;
    }

    resultDiv.innerHTML = "Detecting your location...";
    resultDiv.classList.remove('show');

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiKey = "YOUR_API_KEY";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather not found for your location');
            const data = await response.json();

            setBackground(data.weather[0].main);

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            const weather = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="${data.weather[0].description}">
                <p><strong>${data.main.temp}°C</strong></p>
                <p>${data.weather[0].main} (${data.weather[0].description})</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
            `;

            resultDiv.innerHTML = weather;

          
            resultDiv.classList.remove('show'); 
            void resultDiv.offsetWidth; 
            resultDiv.classList.add('show');
        } catch (err) {
            resultDiv.innerHTML = "Could not fetch weather: " + err.message;
            resultDiv.classList.remove('show');
        }
    }, () => {
        resultDiv.innerHTML = "Unable to retrieve your location.";
        resultDiv.classList.remove('show');
    });
}
