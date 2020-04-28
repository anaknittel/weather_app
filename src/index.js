let now = new Date();

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let week = weeks[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let h1 = document.querySelector("#date");
h1.innerHTML = `${week}, ${hour}:${minutes}`;

let units = "metric";
let apiKey = "d8429a8ebd488a695822e4245ab96df8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(realTimeTemperature);
let apiUrlForec = `https://api.openweathermap.org/data/2.5/forecast?q=${cityElement.innerHTML}&appid=${apiKey}&units=imperial`;
axios.get(apiUrlForec).then(forecastWeather);

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
  let minTempElement = document.querySelector(".min-temp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxTempElement = document.querySelector(".max-temp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windSpeedElement = document.querySelector(".windSpeed");
  windSpeedElement.innerHTML = response.data.wind.speed;
}

function FahrenheitToCelcius(response) {
  let celciusDegrees = document.querySelector("#temperature-value");
  celciusDegrees.innerHTML = Math.round(response.data.main.temp);
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
}

function fahrenheitApi() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.innerHTML}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(celciusToFahrenheit);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitApi);

function forecastWeather() {}
