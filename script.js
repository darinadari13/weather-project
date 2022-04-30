
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

function displayWeather(response) {
  const temperatureSpan = document.getElementById("temperature");
  const cityName = document.getElementById('city');
  const descriptionSpan = document.getElementById("description");
  const windSpan = document.getElementById('wind');
  const humiditySpan = document.getElementById('humidity');
  const iconElement = document.getElementById('icon');
  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  let temperature = Math.round(celsiusTemperature);
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperatureSpan.innerHTML = `${temperature}`;
  descriptionSpan.innerHTML = `${description}`;
  windSpan.innerHTML = `Wind: ${wind} km/h`;
  humiditySpan.innerHTML = `Humidity: ${humidity} %`;
}

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

function convertToF(e) {
  e.preventDefault();
  const temperatureSpan = document.getElementById('temperature');
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  const fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureSpan.innerHTML = Math.round(fahrenheit);
}


let celsiusTemperature = null;
function convertToC(e) {
  e.preventDefault();
  const temperatureSpan = document.getElementById('temperature');
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  temperatureSpan.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.getElementById('fahrenheit-link');
fahrenheitLink.addEventListener('click',convertToF);
let celsiusLink = document.getElementById('celsius-link');
celsiusLink.addEventListener('click',convertToC);


