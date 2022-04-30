
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
  const descriptionSpan = document.getElementById("description");
  const windSpan = document.getElementById('wind');
  const humiditySpan = document.getElementById('humidity');
  let temperature = Math.round(response.data.main.temp);
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  temperatureSpan.innerHTML = `${temperature}`;
  descriptionSpan.innerHTML = `${description}`;
  windSpan.innerHTML = `Wind: ${wind} km/h`;
  humiditySpan.innerHTML = `Humidity: ${humidity} %`;
}
function showWeather(response) {
  const temperatureSpan = document.getElementById("temperature");
  const cityName = document.getElementById('city');
  const windSpan = document.getElementById('wind');
  const humiditySpan = document.getElementById('humidity');
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  temperatureSpan.innerHTML = `${temperature}`;
  windSpan.innerHTML = `Wind: ${wind} km/h`;
  humiditySpan.innerHTML = `Humidity: ${humidity} %`;
};
function showPosition(position) {
  const apiKey = "e70f9b320d5f26eec768abf6830dd19d";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
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
//   const fahrenheit = parseInt(temperatureSpan.textContent) * 9/5 + 32
//   temperatureSpan.innerHTML = fahrenheit;
// }

// function convertToC(e) {
//   e.preventDefault();
//   const temperatureSpan = document.getElementById('temperature');
//   temperatureSpan.innerHTML = 22;
// }


//   document.getElementById('fahrenheit-link').addEventListener('click',convertToF);
//   document.getElementById('celsius-link').addEventListener('click',convertToC);


