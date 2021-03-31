//DOM Variables
var currentDayEl = $("#currentDay");
var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
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

//javaScript variables
// variable to displayDate() {
var currentDate = moment().format("MMM DD, YYYY");
currentDayEl.text(currentDate);
var pastSearches = [];

//functions
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

//function to turn night weather icons into day icons
function currentPic(x) {
  var code = x.slice(0, 2);
  var code2 = "d";
  var dayCode = code.concat(code2);
  return dayCode;
}

//pulls weather data for searched city and displays
function getCity(s) {
  var city = s;
  //pastSearches.push(`${city}`);
  console.log(pastSearches);

  var finalCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  var fiveDayForecastData = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

  //fetches 5-day forecast data
  fetch(fiveDayForecastData)
    .then(function (response) {
      return response.json();
    })
    //pulls data for 5 days - couldn't loop because first parameter was different
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

      //adds 5-day data to page
      function dayData(x) {
        var dayBoxCol = $("<div>").addClass(
          "dayBox flex-column col-12 col-md-2"
        );

        fiveDaysRowEl.append(dayBoxCol);
        var dayBoxDateDiv = $("<div>").text(`${data.list[x].dt_txt}`);
        var dateDiv = dayBoxDateDiv[0].textContent.slice(0, 10);
        var formattedDate = moment(dateDiv).format('MMMM D, YYYY');
        dayBoxDateDiv.addClass("dayBoxDate");
        dayBoxCol.append(formattedDate);

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

  //fetches current weather data
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

      //pulls data for the city's latitude and longitude in order to display UV index
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
//listener events
//upon clicking a saved city on the page, it's weather data will be presented
$(document).ready(function () {
  $(".searchInput").click(function () {
    var text = $(this).text();
    console.log(text);
    getCity(text);
  });
});

//provides weather data when search button is pushed
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

//provides weather data when "enter" is pushed
searchForm.on("submit", function (event) {
  event.preventDefault();
  var s = searchTermEl.val();
  checkSearches(s);
  getCity(s);
});

init();