var weather = function (cityName) {
    var apiURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=829ab038feb797ebd959e94c190da467&units=imperial";
        var apiFive="http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=829ab038feb797ebd959e94c190da467&units=imperial"

    //making a request to the url
    fetch(apiURL)
        .then(function (response) {
            //request was successful
            if (response.ok)
                response.json().then(function (data) {
                    var city = data.name;
                    var icon = data.weather[0].icon;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
                    var temp = data.main.temp;
                    displayWeather(city, icon, wind, humidity, temp);
                });
        })
    // making a request to the url for five forecast without loop yet
    fetch(apiFive)
    .then(function (response) {
        //reuqest was successful 
        if(response.ok)
        response.json().then(function(data) { 
          for (i=0; i< data.list.length; i=i+8){
            var icon= data.list[i].weather[0].icon;
            var temp = data.list[i].main.temp
            console.log(temp)
            var humidity= data.list[i].main.humidity;
          }

      
        })
    })
        .catch(function (error) {
            alert("unable to connect WeatherApp");
        });
};

var displayWeather = function (city, icon, wind, humidity, temp) {
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png"

    document.querySelector("img").src = iconURL
    document.querySelector("#city").append(city + " (" + moment().format("l") + ")" )
    document.querySelector("#wind").append("Wind Speed: " + wind)
    document.querySelector("#humidity").append("Humidity: " + humidity)
    document.querySelector("#temp").append("Temperature: " + temp)

};

var citySearch = document.querySelector("#search");
var userForm = document.querySelector("#user-form");
// console.log(citySearch)

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = citySearch.value.trim();
    weather(cityName);
    citySearch.textContent = "";
}
userForm.addEventListener("submit", formSubmitHandler);


// var fiveDisplay = fucntion( date,icon, temp,humidity ) 
// create id in html for placeholders 
                                                                                                                                                                                                                                    







// displayWeather(city, icon, speed, humidity, temp)

// every time something with a class of movie is clicked on
// when they are preloaded on html
// $(".searchHistory").on("click", function() {
//     console.log("hi")
// })

// // use this one below
// // every time something with a class of movie is clicked on
// // when they are dynamically loaded via js
// $(document).on("click", ".searchHistory", function() {
//     console.log("hi");
// })
