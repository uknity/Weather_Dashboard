// var fetchButton = document.getElementById('fetch-button');
var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var initialCityApiUrl =
  "api.openweathermap.org/data/2.5/weather?q={city name}&appid=cc1d108015a60ec6fb2d04e49e6039dd";
var searchButton = $("#searchBtn");
var currentCity = $("#currentCityName");
var currentDateEl = $("#currentDate");
var currentWeatherPicEl = $("#currentWeatherPic");
var currentCityTempEl = $(".currentCityTemp");
var currentCityHumidityEl = $(".currentCityHumidity");
var currentCityWindSpeedEl = $(".currentCityWindSpeed");
var currentCityUVIndexEl = $(".currentCityUVIndex");
var brokenCloud = $("<img src='http://openweathermap.org/img/wn/04d@2x.png'>");
var clearSky = $("<img src='http://openweathermap.org/img/wn/01d@2x.png'>");
var snowPic = $("<img src='http://openweathermap.org/img/wn/13d@2x.png'>");
var fewClouds = $("<img src='http://openweathermap.org/img/wn/02d@2x.png'>");
var mist = $("<img src='http://openweathermap.org/img/wn/50d@2x.png'>");
var rain = $("<img src='http://openweathermap.org/img/wn/10d@2x.png'>");
var scatteredClouds = $(
  "<img src='http://openweathermap.org/img/wn/03d@2x.png'>"
);
var sun = $("<img src='http://openweathermap.org/img/wn/01d@2x.png'>");
var thunderstorm = $("<img src='http://openweathermap.org/img/wn/11d@2x.png'>");
var fiveDaysRowEl = $("#fiveDaysRow");
var dayBoxDateEl = $(".dayBoxDate");
var dayBoxWeatherPicEl = $(".dayBoxWeatherPic");
var dayBoxTempEl = $("#dayBoxTemp");
var dayBoxHumidityEl = $("#dayBoxHumidity");

function currentPic(x) {
  console.log(x);
  var code = x.slice(0, 2);
  var code2 = "d";
  var dayCode = code.concat(code2);
  console.log(dayCode);
  weatherImg(dayCode);
}

function weatherImg(dayCode) {
    console.log(dayCode);
    if (dayCode == "04d") {
    var weatherImage = brokenCloud;
  } else if (dayCode == "01d") {
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

    return `${weatherImage}`;
}

function getCity() {
  var city = searchTermEl.val();
  console.log(city);

  var finalCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  var fiveDayForecastData = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  fetch(fiveDayForecastData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var x = 0;
    //   var a = 7;
    //   var b = 15;
    //   var c = 23;
    //   var d = 31;

      dayData(x);
    //   dayData(a);
    //   dayData(b);
    //   dayData(c);
    //   dayData(d);

      function dayData(x) {
        console.log(data.list[x].dt_txt);
        console.log(data.list[x].main.temp);
        console.log(data.list[x].weather[0].main);
        console.log(data.list[x].main.humidity);
        console.log(data.list[x].weather[0].icon);

        var dayBoxCol = $('<div>').addClass("dayBox flex-column col-12 col-md-2");
        fiveDaysRowEl.append(dayBoxCol);
        var dayBoxDateDiv = $('<div>').text(`${data.list[x].dt_txt}`);
        var dateDiv = (dayBoxDateDiv[0].textContent).slice(0, 10);
        dayBoxDateDiv.addClass("dayBoxDate");
        console.log(dateDiv);
        dayBoxCol.append(dateDiv);

        var dayBoxWeatherPicDiv = $('<div>');
        dayBoxWeatherPicDiv.addClass("dayBoxWeatherPic");
        dayBoxCol.append(dayBoxWeatherPicDiv);

        // var dayBoxTempDiv = $("<div>").addClass("dayBoxTemp flex-row");
        // var dayBoxTempSpan1 = $("<span class="dayBoxInfo">").text("Temp: ");
        // var dayBoxTempSpan2 = $("<span class="dayBoxInfo">;
        // dayBoxTempSpan2.attr("id", dayBoxTempEl)
        // dayBoxTempSpan2.text(data.list[x].main.temp);
        // dayBoxTempDiv.append(dayBoxTempSpan1);
        // dayBoxTempDiv.append(dayBoxTempSpan1);

        // var dayBoxHumidityDiv = $("<div>").addClass("dayBoxHumidity flex-row");
        // var dayBoxHumiditySpan1 = $("<span class="dayBoxInfo">").text("Humidity: ");
        // var dayBoxHumiditySpan2 = $("<span class="dayBoxInfo">;
        // dayBoxHumiditySpan2.attr("id", dayBoxHumidity)
        // dayBoxTempSpan2.text(data.list[x].main.temp);
        // dayBoxHumidityDiv.append(dayBoxTempSpan1);
        // dayBoxHumidityDiv.append(dayBoxTempSpan1);

        
        
      }

    });

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
      currentWeatherPicEl.empty();
      var newPic = currentPic(currentWeatherIcon);
      currentWeatherPicEl.append(newPic);
    });
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
