// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather
let citySearch = document.querySelector(".city")
let cityTemp = document.querySelector(".temp")
let cityWind = document.querySelector(".wind")
let cityHumidity = document.querySelector(".humidity")


let tempTwo = document.querySelector(".temp2")
let windTwo = document.querySelector(".wind2")
let humidTwo = document.querySelector(".humid2")



function getCity(cityName){
fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=3be2b2b6acc21e3760901d15acf91f72&q=${cityName}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getWeather(data[0].lat,data[0].lon)
 
}
  )};

  
function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3be2b2b6acc21e3760901d15acf91f72&units=imperial`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather)



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
   


    let temp = weather.list[0].main.temp
    document.querySelector(".temp").append("Temperature: "+temp+" F°");
    // cityTemp.innerHTML = ("Temperature: "+ temp +"F°")
    



    let wind = weather.list[0].wind.speed
    // document.querySelector(".wind").append("Wind: "+cityWind+" MPH")
    cityWind.innerHTML = ("Wind: "+ wind +" MPH")



    let humid = weather.list[0].main.humidity
    // document.querySelector(".humidity").append("Humidity "+humid+" %")
    cityHumidity.innerHTML = ("Humidity: "+ humid +" %")



    //Day 2
    let temp2 = weather.list[6].main.temp
    tempTwo.innerHTML = ("Temperature: "+ temp2 +"F°")
    let wind2 = weather.list[6].wind.speed
    windTwo.innerHTML = ("Wind: "+ wind2 +" MPH")
    let humid2 = weather.list[6].main.humidity
    humidTwo.innerHTML = ("Humidity: "+ humid2 +" %")
    
    





  });
}







let submitBtn = document.getElementById("submit");


submitBtn.addEventListener("click", () => {
    var cityName = document.getElementById("city-name").value
    getCity(cityName)

});




