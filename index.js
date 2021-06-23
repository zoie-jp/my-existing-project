let now = new Date();
let h2 = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `${minutes}`;
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

///2
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
function currentWeather(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(event) {
  event.preventDefault();
  let apiKey = "c94111510980f8f1c613796b6fd8da90";
  let city = document.querySelector("#city-name").value;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(currentWeather);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);
let iconElement = document.querySelector("#icon");
