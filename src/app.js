function searchSubmit(event) {
  event.preventDefault();
  let searchKey = document.querySelector("#city");

  searchLocation(searchKey.value);
}

function searchLocation(city) {
  let apiKey = `713a631324o2dtc013aaf4374b846544`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}

function changeWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  let cityName = document.querySelector("#location");
  let humidity = document.querySelector(".percentage");
  let windSpeed = document.querySelector(".km");
  let condition = document.querySelector(".detail");
  let watchTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icons = document.querySelector("#icon");

  icons.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  watchTime.innerHTML = formatDate(date);
  temperature.innerHTML = Math.round(response.data.temperature.current);
  cityName.innerHTML = response.data.city;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  condition.innerHTML = response.data.condition.description;

  displayForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let formboxSearch = document.querySelector("#form-box");
formboxSearch.addEventListener("submit", searchSubmit);

function displayForecast(city) {
  let apiKey = "713a631324o2dtc013aaf4374b846544";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML=
      forecastHTML +
      `
        <div class="weather-forecast-day">
        <div class="day"> ${day} </div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temps">
            <div class="weather-forecast-1">25°</div>
            <div class="weather-forecast-2"><strong>16°</strong></div>
        </div>
        </div>`;
    
  });

  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = forecastHTML;
}
displayForecast();