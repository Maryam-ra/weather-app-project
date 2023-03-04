function formatDate(timestamp) {
  let date = new Date(timestamp); 
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
   }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
   }
  let days = ["sunday", "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
   let days = ["Sat", "Sun", "Mon",];

   
  let forecastHTML =  `<div class="row">`; 

  
  days.forEach(function(day) {

 forecastHTML = forecastHTML + 
  
  `<div class="col-2">
        <div class="weather-forecast-date">
        ${day}
    </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png" alt="" width="36"/>

     <div class="weather-forecase-teperatures">
      <span class="weather-forecast-temperature-max">
        18° </span>  
        <span class="weather-forecast-temperature-min">

        12°</span>
     </div>
    </div>
`;

  });
 
  
  forecastHTML = forecastHTML + `</div>`;
  
  forecastElement.innerHTML = forecastHTML; 
   
}


function displayTemperature(response) {


 let temperatureElement= document.querySelector("#temperature");
 let cityElement= document.querySelector("#city");
 let descriptionElement= document.querySelector("#description");
 let humidityElement= document.querySelector("#humidity");
 let windElement= document.querySelector("#wind");
 let dateElement= document.querySelector("#date");
 let iconElement= document.querySelector("#icon");

 temperatureElement.innerHTML= Math.round(response.data.temperature.current);
 cityElement.innerHTML= (response.data.city);
 descriptionElement.innerHTML= (response.data.condition.description);
 humidityElement.innerHTML= (response.data.temperature.humidity);
 windElement.innerHTML= Math.round(response.data.wind.speed); 
 dateElement.innerHTML= formatDate(response.data.time * 1000);
 iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
 iconElement.setAttribute("alt", response.data.condition.description);
   
}

function search(city) {

let apiKey = "e6a3600aed10ca53fe3f64d06f1b6ot8";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}






let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

displayForecast();