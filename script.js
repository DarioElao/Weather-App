//assign variables
let citySearch = document.querySelector(".city")
let cityTemp = document.querySelector(".temp")
let cityWind = document.querySelector(".wind")
let cityHumidity = document.querySelector(".humidity")
let forecast = document.querySelector(".forecast")
let newDate = document.querySelector(".date")


// get city name function
function getCity(cityName){
fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=3be2b2b6acc21e3760901d15acf91f72&q=${cityName}`)
  .then(function (response) {
    return response.json();
  })
  //retrieve data based on the lat & lon of the city
  .then(function (data) {
    getWeather(data[0].lat,data[0].lon)
}
  )};


//obtain weather info with the lat & long
function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3be2b2b6acc21e3760901d15acf91f72&units=imperial`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather)



    //get date from API list
    let currentDate = weather.list[0].dt_txt
    newDate.innerHTML = (currentDate)

    //get city name and display on page
    let cityText = weather.city.name;
    // document.getElementById("city").append(cityText);
    citySearch.innerHTML = (cityText) 
    
    //icon image
    let iconData = weather.list[0].weather[0].icon
    console.log(iconData);
    let icon =  document.createElement("img")
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}@2x.png`)
    document.querySelector(".icon").append(icon);
   
    //append new button with city text
    let btnText = weather.city.name;
    document.querySelector(".citybutton").append(btnText);

    //get temperature
    let temp = weather.list[0].main.temp
    // document.querySelector(".temp").append("Temperature: "+temp+" F°");
    cityTemp.innerHTML = ("Temperature: "+ temp +"F°")
    
    //get wind speed
    let wind = weather.list[0].wind.speed
    // document.querySelector(".wind").append("Wind: "+cityWind+" MPH")
    cityWind.innerHTML = ("Wind: "+ wind +" MPH")

    //get humidity
    let humid = weather.list[0].main.humidity
    // document.querySelector(".humidity").append("Humidity "+humid+" %")
    cityHumidity.innerHTML = ("Humidity: "+ humid +" %")


    //loop to display 5 day forecast
    for (let index = 0; index < weather.list.length; index+=8) {
      const currentDay = weather.list[index];
      console.log(currentDay)
      
      //create a new element to display data
      var div = document.createElement("div")

      //5 day forecast section
      div.className = "card bg-primary col m-1"
      var cardContent = `
      <div class="m-1">${currentDay.dt_txt}</div>
      <div class="m-1">${weather.city.name}</div>
      <div class="m-1">Temp:${currentDay.main.temp}</div>
      <div class="m-1">Wind:${currentDay.wind.speed}</div>
      <div class="m-1">Humidity:${currentDay.main.humidity}</div>
      </section>
      `
      div.innerHTML = cardContent
      forecast.appendChild(div)
    }

  });
}

//display data when clicking the search button
let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    var cityName = document.getElementById("name").value
    getCity(cityName)
});