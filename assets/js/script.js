// var fetchButton = document.getElementById('fetch-button');
var searchForm = $('#search-form');
var searchTermEl = $('#search-term');
var initialCityApiUrl = "api.openweathermap.org/data/2.5/weather?q={city name}&appid=cc1d108015a60ec6fb2d04e49e6039dd";
var searchButton = $('#searchBtn');
var currentCity = $('#currentCityName');
var currentDateEl = $('#currentDate');
var currentWeatherPicEl = $('#currentWeatherPic');
var currentCityTempEl = $('.currentCityTemp');
var currentCityHumidityEl = $('.currentCityHumidity');
var currentCityWindSpeedEl = $('.currentCityWindSpeed');
var currentCityUVIndexEl = $('.currentCityUVIndex');
var brokenCloud = $("<img src='http://openweathermap.org/img/wn/04d@2x.png'>");
var clearSky = $("<img src='http://openweathermap.org/img/wn/01d@2x.png'>");
var snowPic = $("<img src='http://openweathermap.org/img/wn/13d@2x.png'>");
var fewClouds = $("<img src='http://openweathermap.org/img/wn/02d@2x.png'>");
var mist = $("<img src='http://openweathermap.org/img/wn/50d@2x.png'>");
var rain = $("<img src='http://openweathermap.org/img/wn/10d@2x.png'>");
var scatteredClouds = $("<img src='http://openweathermap.org/img/wn/03d@2x.png'>");
var sun = $("<img src='http://openweathermap.org/img/wn/01d@2x.png'>");
var thunderstorm = $("<img src='http://openweathermap.org/img/wn/11d@2x.png'>");


function currentPic(x) {
    console.log(x);
    console.log(typeof x);
    var code = x.slice(0, 2);
    console.log(code);
    var code2 = "d";
    var dayCode = code.concat(code2);
    console.log(dayCode);

    if (dayCode == "04d") {
        var weatherImage = brokenCloud;
    } else if (dayCode == '01d') {
        var weatherImage = clearSky;
    } else if (dayCode == "13d") {
        var weatherImage = snowPic;
    } else if (dayCode == "02d") {
        var weatherImage = fewClouds;
    } else if (dayCode == "50d") {
        var weatherImage = mist;
    } else if (dayCode == "10d") {
        var weatherImage = rain;
    } else if (dayCode == "03d") {
        var weatherImage = scatteredClouds;
    } else if (dayCode == "11d") {
        var weatherImage = thunderstorm;
    } else {
        var weatherImage = sun;
    }    
        console.log(weatherImage);
        currentWeatherPicEl.append(weatherImage);
    
}



function getCity() {

    var city = searchTermEl.val();
    console.log(city);

    var finalCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

    var fiveDayForecastData = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

    // fetch(fiveDayForecastData)
    //     .then(function (response) {
    //     return response.json();
    //     })
    //     .then(function (data) {

    //         console.log(data.list);

    //         console.log(data.list[0].dt_txt);
    //         console.log(data.list[0].main.temp);
    //         console.log(data.list[0].weather[0].main);
    //         console.log(data.list[0].main.humidity);
    //         console.log(data.list[0].weather[0].icon);

    // for (i=8; i < 40; (i+8)) {
    //     console.log(data.list[i].dt_txt);
    //     console.log(data.list[i].main.temp);
    //     console.log(data.list[i].weather[0].main);
    //     console.log(data.list[i].main.humidity);
    // })

    // })


    fetch(finalCityApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentCity.text(data.name);
            var currentWeatherCondition = data.weather[0].description;
            console.log(currentWeatherCondition);
            var currentWeatherIcon = data.weather[0].icon;
            console.log(currentWeatherIcon);
            currentCityTempEl.text(`${data.main.temp} \xB0`);
            currentCityHumidityEl.text(`${data.main.humidity}%`);
            currentCityWindSpeedEl.text(`${data.wind.speed}  MPH`);
            currentPic(currentWeatherIcon);

        })

}


// function handleSearchFormSubmit(event) {
//     event.preventDefault();
//     alert("the search button is working");
// }

//     var searchInputVal = document.querySelector('#search-input').value;
//     var formatInputVal = document.querySelector('#format-input').value;

//     if (!searchInputVal) {
//       console.error('You need a search input value!');
//       return;
//     }

//     searchApi(searchInputVal, formatInputVal);
//   }

searchButton.on("click", function (event) {
    event.preventDefault();
    getCity();
});






// fetchButton.addEventListener('click', getApi);

// function getApi() {

//     var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.753746&lon=-84.386330&exclude=alerts&appid=cc1d108015a60ec6fb2d04e49e6039dd";

//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//           console.log(data);
//           for (var i = 0; i < data.length; i++) {
//               // Creating elements, tablerow, tabledata, and anchor
//               var createTableRow = document.createElement('tr');
//               var tableData = document.createElement('td');
//               var link = document.createElement('a');

//               // Setting the text of link and the href of the link
//               link.textContent = data[i].html_url;
//               link.href = data[i].html_url;

//               // Appending the link to the tabledata and then appending the tabledata to the tablerow
//               // The tablerow then gets appended to the tablebody
//               tableData.appendChild(link);
//               createTableRow.appendChild(tableData);
//               tableBody.appendChild(createTableRow);
//             }


//       });
//   }