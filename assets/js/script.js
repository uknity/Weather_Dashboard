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
var fiveDaysRowEl = $("#fiveDaysRow");
var dayBoxDateEl = $(".dayBoxDate");
var dayBoxWeatherPicEl = $(".dayBoxWeatherPic");
var dayBoxTempEl = $("#dayBoxTemp");
var dayBoxHumidityEl = $("#dayBoxHumidity");
var recentSearchesList = $("#recentSearches");
var lineOne = $("#firstLi");
var lineTwo = $("#secondLi");
var lineThree = $("#thirdLi");
var lineFour = $("#fourthLi");
var lineFive = $("#fifthLi");
var lineSix = $("#sixthLi");
var lineSeven = $("#seventhLi");
var lineEight = $("#eightLi");

// var pastSearches = [];

// if(localStorage["pastSearches"]) {
//      pastSearches = JSON.parse(localStorage["pastSearches"]);
// }

// if(pastSearches.indexOf(search) == -1) {
//     pastSearches.unshift(search);
//     if(pastSearches.length > 5) {
//        pastSearches.pop();
//     }
//     localStorage["pastSearches"] = JSON.stringify(pastSearches);
// }

// function drawPastSearches() {
//     if(pastSearches.length) {
//         var html = pastSearchesTemplate({search:pastSearches});
//         $("#pastSearches").html(html);
//     }
// }
searchButton.on("click", function (event) {
  event.preventDefault();
  getCity();
});

searchForm.on("submit", function (event) {
  event.preventDefault();
  getCity();
});

function init() {}

//add searchTermEl.val() to array
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

function currentPic(x) {
  var code = x.slice(0, 2);
  var code2 = "d";
  var dayCode = code.concat(code2);
  return dayCode;
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

        var dayBoxTempDiv = $("<div>").addClass("dayBoxTemp flex-row");
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
        var dayBoxHumiditySpan2 = $("<span class='dayBoxInfo'>");
        dayBoxHumiditySpan2.attr("id", "dayBoxHumidity");
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
