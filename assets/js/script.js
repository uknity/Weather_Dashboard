// var fetchButton = document.getElementById('fetch-button');
var currentDayEl = $("#currentDay");
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
var fiveDaysRowEl = $("#fiveDaysRow");
var dayBoxDateEl = $(".dayBoxDate");
var dayBoxWeatherPicEl = $(".dayBoxWeatherPic");
var dayBoxTempEl = $("#dayBoxTemp");
var dayBoxHumidityEl = $("#dayBoxHumidity");
var recentSearchesList = $("#recentSearches");
var listLineEl = $(".listLine");

// function displayDate() {
var currentDate = moment().format("MMM DD, YYYY");
currentDayEl.text(currentDate);
//}
//upon init, if there are pastSearches in local storage, populates the array
function init() {
  pastSearches = JSON.parse(localStorage.getItem("pastSearches"));
  if (pastSearches == null) {
    pastSearches = [];
    console.log(pastSearches);
  }
  for (i = 0; i < pastSearches.length; i++) {
    // create listItem
    var listItem = $(
      '<a class="list-group-item list-group-item-action listLine">'
    );
    var textSpan = $(`<span id=item${+[i]}>`);
    textSpan.addClass("searchInput");
    textSpan.text(pastSearches[i]);
    listItem.append(textSpan);
    $("#recentSearches").append(listItem);
  }
}
$(document).ready(function() {
  $(".searchInput").click(function() {
    var text = $(this).text();
    console.log(text);
    getCity(text);
  })
})

var pastSearches = [];

//adds "search" if no pastSearches; removes a search item if there are more than 8; stores pastSearches in local storage

function checkSearches(search) {
  //if the search is not in the array

  if (pastSearches.indexOf(search) == -1) {
    //add the search to the beginning of the array
    pastSearches.unshift(search);
    //if there are already 8 items in the array, pop the last one
    if (pastSearches.length > 7) {
      pastSearches.pop();
    }
    //put the array into local storage
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  }
}

searchButton.on("click", function (event) {
  event.preventDefault();
  var s = searchTermEl.val();
  if (!s) {
    alert("You must enter the name of a city.");
    return;
  }
  checkSearches(s);
  getCity(s);
});

searchForm.on("submit", function (event) {
  event.preventDefault();
  var s = searchTermEl.val();
  checkSearches(s);
  getCity(s);
});

init();

function currentPic(x) {
  var code = x.slice(0, 2);
  var code2 = "d";
  var dayCode = code.concat(code2);
  return dayCode;
}

function getCity(s) {
  var city = s;
  //pastSearches.push(`${city}`);
  console.log(pastSearches);

  var finalCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  var fiveDayForecastData = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  fetch(fiveDayForecastData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fiveDaysRowEl.empty();
      var y = 6;
      var a = 14;
      var b = 22;
      var c = 30;
      var d = 38;

      dayData(y);
      dayData(a);
      dayData(b);
      dayData(c);
      dayData(d);

      function dayData(x) {
        var dayBoxCol = $("<div>").addClass(
          "dayBox flex-column col-12 col-md-2"
        );

        fiveDaysRowEl.append(dayBoxCol);
        var dayBoxDateDiv = $("<div>").text(`${data.list[x].dt_txt}`);
        var dateDiv = dayBoxDateDiv[0].textContent.slice(0, 10);
        dayBoxDateDiv.addClass("dayBoxDate");
        dayBoxCol.append(dateDiv);

        var currentWeatherIconDay = data.list[x].weather[0].icon;
        var dayCode = currentPic(currentWeatherIconDay);
        var imgEl = $("<img>");
        imgEl.attr("src", `http://openweathermap.org/img/wn/${dayCode}@2x.png`);
        dayBoxCol.append(imgEl);

        var dayBoxTempDiv = $("<div class='dayBoxTemp flex-row'>");
        var dayBoxTempSpan1 = $("<span class='dayBoxInfo'>").text("Temp: ");
        var dayBoxTempSpan2 = $("<span class='dayBoxInfo'>");
        dayBoxTempSpan2.attr("id", dayBoxTempEl);
        dayBoxTempSpan2.text(`${data.list[x].main.temp} \xB0`);
        dayBoxTempDiv.append(dayBoxTempSpan1);
        dayBoxTempDiv.append(dayBoxTempSpan2);
        dayBoxCol.append(dayBoxTempDiv);

        var dayBoxHumidityDiv = $("<div>").addClass("dayBoxHumidity flex-row");
        var dayBoxHumiditySpan1 = $("<span class='dayBoxInfo'>").text(
          "Humidity: "
        );
        var dayBoxHumiditySpan2 = $(
          "<span class='dayBoxInfo' id='dayBoxHumidity'>"
        );
        dayBoxHumiditySpan2.text(`${data.list[x].main.humidity}%`);
        dayBoxHumidityDiv.append(dayBoxHumiditySpan1);
        dayBoxHumidityDiv.append(dayBoxHumiditySpan2);
        dayBoxCol.append(dayBoxHumidityDiv);
      }
    });

  fetch(finalCityApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      currentCity.text(data.name);
      var currentWeatherIcon = data.weather[0].icon;
      currentCityTempEl.text(`${data.main.temp} \xB0`);
      currentCityHumidityEl.text(`${data.main.humidity}%`);
      currentCityWindSpeedEl.text(`${data.wind.speed}  MPH`);
      currentWeatherPicEl.empty();
      var dayCode = currentPic(currentWeatherIcon);
      var imgEl = $("<img>");
      imgEl.attr("src", `http://openweathermap.org/img/wn/${dayCode}@2x.png`);
      currentWeatherPicEl.append(imgEl);

      var uvApi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

      fetch(uvApi)
        .then(function (response) {
          return response.json();
        })

        .then(function (data) {
          currentCityUVIndexEl.text(data.value);
        });
    });
}
