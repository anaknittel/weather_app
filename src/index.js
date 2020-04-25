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

let cityElement = document.querySelector(".city");
let cityInput = document.querySelector("#change-city");

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(realTimeTemperature);

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
  currentCelcius.innerHTML = response.data.main.temp;
  let place = document.querySelector(".city");
  place.innerHTML = response.data.name;
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", realTimeTemperature);

function convertion(response) {
  let currentFahrenheit = document.querySelector("#temperature-value");
  currentFahrenheit.innerHTML = response.data.main.temp;
}

function fahrenheitConvertion() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.innerHTML}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(convertion);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConvertion);
