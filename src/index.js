function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  let days = weekDays[date.getDay()];
  return `${days}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let units = "metric";
let apiKey = "d8429a8ebd488a695822e4245ab96df8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(realTimeTemperature);
let apiUrlForec = `https://api.openweathermap.org/data/2.5/forecast?q=Lisbon&appid=${apiKey}&units=${units}`;
axios.get(apiUrlForec).then(updateForecastApiUrl);

let cityElement = document.querySelector(".city");
let cityInput = document.querySelector("#change-city");

function newCity(event) {
  event.preventDefault();
  cityElement.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(realTimeTemperature);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(realTimeTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let changeCity = document.querySelector("form");
changeCity.addEventListener("submit", newCity);

let changeCityButton = document.querySelector("#search-city");
changeCityButton.addEventListener("button", newCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

function realTimeTemperature(response) {
  let currentCelcius = document.querySelector("#temperature-value");
  currentCelcius.innerHTML = Math.round(response.data.main.temp);
  let place = document.querySelector(".city");
  place.innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let minTempElement = document.querySelector(".min-temp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxTempElement = document.querySelector(".max-temp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windSpeedElement = document.querySelector(".windSpeed");
  windSpeedElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function FahrenheitToCelcius(response) {
  let celciusDegrees = document.querySelector("#temperature-value");
  celciusDegrees.innerHTML = Math.round(response.data.main.temp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function celciusApi() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(FahrenheitToCelcius);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celciusApi);

function celciusToFahrenheit(response) {
  let fahrenheitDegrees = document.querySelector("#temperature-value");
  fahrenheitDegrees.innerHTML = Math.round(response.data.main.temp);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function fahrenheitApi() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.innerHTML}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(celciusToFahrenheit);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitApi);

function updateForecastApiUrl() {
  let apiUrlForec = `https://api.openweathermap.org/data/2.5/forecast?q=${cityElement.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForec).then(forecastWeather);
}

function forecastWeather(response) {
  let apiUrlForec = `https://api.openweathermap.org/data/2.5/forecast?q=${cityElement.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForec).then(forecastWeather);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <div>${formatHours(forecast.dt * 1000)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="forecastTemperature">${Math.round(forecast.main.temp)}ºC</div>
      <div class="forecastHumidity">${forecast.main.humidity}%</div>
    </div>`;
  }
}
