var weather = function (cityName) {
    var apiURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=829ab038feb797ebd959e94c190da467&units=imperial";
    var apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=829ab038feb797ebd959e94c190da467&units=imperial"
   
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
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    displayWeather(city, icon, wind, humidity, temp,);
                    
                     var apiUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=829ab038feb797ebd959e94c190da467&units=imperial"
                     
                    fetch(apiUV)
                        .then(function (response) {
                            if (response.ok)
                                response.json().then(function (data) {
                                    uv = data.value;
                                    document.querySelector("#UV").innerHTML = "UV: " + uv

                                    if (uv < 3) {
                                        document.querySelector("#UV").className = "green"
                                    }
                                    else if (uv < 6) {
                                        document.querySelector("#UV").className = "yellow"
                                    }
                                    else if (uv < 8) {
                                        document.querySelector("#UV").className = "organe"
                                    }
                                    else if (uv < 11) {
                                        document.querySelector("#UV").className = "red"
                                    }
                                    else {
                                        document.querySelector("#UV").className = "purple"
                                    }
                                })
                        })
                        .catch(function (error) {
                            alert("unable to connect WeatherApp");
                        });

                })
        });


    fetch(apiFive)
        .then(function (response) {
            //reuqest was successful 
            if (response.ok)
                response.json().then(function (data) {
                    for (i = 0; i < data.list.length; i = i + 8) {
                        var icon = data.list[i].weather[0].icon;
                        var temp = data.list[i].main.temp
                        var humidity = data.list[i].main.humidity;
                        var date = data.list[i].dt_txt;
                        var wind = data.list[i].wind.speed;
                        var iconURL = "https://openweathermap.org/img/w/" + icon + ".png"
                        document.querySelector("#icon-" + i).src = iconURL
                        document.querySelector("#date-" + i).append((moment(data.list[i].dt_txt).format("l")))
                        document.querySelector("#temp-" + i).append(temp)
                        document.querySelector("#hum-" + i).append(humidity)
                        document.querySelector("#wind-" + i).append(wind)

                    }
                });
        })

        .catch(function (error) {
            alert("unable to connect WeatherApp");
        })
}

var displayWeather = function (city, icon, wind, humidity, temp, UV) {
    var iconURL = "https://openweathermap.org/img/w/" + icon + ".png"

    document.querySelector("img").src = iconURL
    document.querySelector("#city").append(city + " (" + moment().format("l") + ")")
    document.querySelector("#wind").innerHTML = "Wind: " + wind
    document.querySelector("#humidity").innerHTML = "Humdity: " + humidity
    document.querySelector("#temp").innerHTML = "Temperature: " + temp
};


var citySearch = document.querySelector("#search");
var userForm = document.querySelector("#user-form");
var citySave = {
    city: [],
}
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = citySearch.value.trim();
    weather(cityName);
    citySearch.textContent = "";
    citySave.city.push({
        "city": cityName
    })
    localStorage.setItem("city", JSON.stringify(citySave))
}


userForm.addEventListener("submit", formSubmitHandler);

function loadStorage() {
    citystorage = JSON.parse(localStorage.getItem("city"))
    for (i = 0; i < citystorage.city.length; i++) {

        var cities = citystorage.city[i].city

        var pastCity = document.getElementById("pastCity")
        var cityList = document.createElement("button")
        cityList.className = "list-group-item"
        cityList.id = "cityValue"
        cityList.innerHTML = cities
        pastCity.appendChild(cityList)
    }
}

loadStorage()

document.getElementById("pastCity").addEventListener("click", function () {
    var cityValue = document.getElementById("cityValue").innerHTML
    weather(cityValue)
});
