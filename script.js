
function displayDate() {
  const date = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[date.getDay()];
 
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  const time = day + ' ' + hours + ':' + minutes;
  document.getElementById('date').innerHTML = time;
}
displayDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  const key = 'e70f9b320d5f26eec768abf6830dd19d'
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  const temperatureSpan = document.querySelector("#temperature");
  temperatureSpan.innerHTML = Math.round(response.data.main.temp);
  const cityName = document.getElementById('city');
  const descriptionSpan = document.getElementById("description");
  const windSpan = document.getElementById('wind');
  const humiditySpan = document.getElementById('humidity');
  const iconElement = document.getElementById('icon');



  cityName.innerHTML = response.data.name;
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 
  descriptionSpan.innerHTML = `${description}`;
  windSpan.innerHTML = `Wind: ${wind} km/h`;
  humiditySpan.innerHTML = `Humidity: ${humidity} %`;

  getForecast(response.data.coord);
}
function search(city) {
let apiKey = 'e70f9b320d5f26eec768abf6830dd19d';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
};
function showPosition(position) {
  const apiKey = "e70f9b320d5f26eec768abf6830dd19d";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
};

function getCurrentPosition(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);    
};

const button = document.getElementById('current-location-button');
button.addEventListener("click", getCurrentPosition);

function submitForm(e) {
  const city = e.target.value;
  const key = 'e70f9b320d5f26eec768abf6830dd19d';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
  document.getElementById('city').innerHTML = e.target.value;
}

document.getElementById('city-form').onkeydown = function(e){
   if(e.keyCode == 13){
    e.preventDefault();
    submitForm(e)
   }
};

// function convertToF(e) {
//   e.preventDefault();
//   const temperatureSpan = document.getElementById('temperature');
//   celsiusLink.classList.remove('active');
//   fahrenheitLink.classList.add('active');
//   const fahrenheit = (celsiusTemperature * 9) / 5 + 32;
//   temperatureSpan.innerHTML = Math.round(fahrenheit);
// }


// let celsiusTemperature = null;
// function convertToC(e) {
//   e.preventDefault();
//   const temperatureSpan = document.getElementById('temperature');
//   celsiusLink.classList.add('active');
//   fahrenheitLink.classList.remove('active');
//   temperatureSpan.innerHTML = Math.round(celsiusTemperature);
// }

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
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + '</div>';
  forecastElement.innerHTML = forecastHTML;
}



// let fahrenheitLink = document.getElementById('fahrenheit-link');
// fahrenheitLink.addEventListener('click',convertToF);
// let celsiusLink = document.getElementById('celsius-link');
// celsiusLink.addEventListener('click',convertToC);


search("Kyiv");