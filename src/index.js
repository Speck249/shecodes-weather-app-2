function fetchData(query) {
  // Invoke updateTemperature() with return value of fetch request
  let key = "4b10c2a77454teo9d0ff304c4b0d513b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;
  axios.get(url).then(updateTemperature);
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

  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let today = days[day];
  return `${today} ${hours}:${minutes}`;
}

function updateTemperature(response) {
  // Weather and Date / Time values based on API fetch return values
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.city;

  let currentDateElement = document.querySelector("#current-date");
  let timeValue = response.data.time * 1000;
  let date = new Date(timeValue);
  currentDateElement.innerHTML = formatDate(date);

  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = response.data.condition.description;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;

  let currentWindSpeed = document.querySelector("#current-wind");
  currentWindSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let currentIcon = document.querySelector("#current-icon");
  currentIcon.innerHTML = `<img src=${response.data.condition.icon_url} alt=${response.data.condition.icon} class="current-temperature-icon" />`;

  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
}

function handleSubmit(event) {
  // Invoke fetchData() with user input
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  fetchData(cityInput.value);
}

// Add an event listner to the form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

fetchData("Paris");
