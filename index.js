let now = new Date();
let h2 = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   
    <div class="col-2">
 <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
  
<img 
src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt=""
width="42"
/>

  <div class="temp-forecast">
  <span class="circle">
    <span class="forecast-max">${Math.round(forecastDay.temp.max)}°</span>

<span class="forecast-min">${Math.round(forecastDay.temp.min)}°</span>

  </div>
 </div>

`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c94111510980f8f1c613796b6fd8da90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function currentWeather(response) {
  celciusTemp = response.data.main.temp;
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "c94111510980f8f1c613796b6fd8da90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(event) {
  event.preventDefault();
  let apiKey = "c94111510980f8f1c613796b6fd8da90";
  let city = document.querySelector("#city-name").value;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(currentWeather);
}

function defaultSearch(city) {
  let apiKey = "c94111510980f8f1c613796b6fd8da90";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(currentWeather);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelTemp(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temperature");
  celLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celciusTemp);
}
let searchCity = document.querySelector("#search-city");

searchCity.addEventListener("submit", search);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

let celciusTemp = null;

defaultSearch("Stockholm");
