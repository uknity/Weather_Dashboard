
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


// var city = #form1 //
// var finalCityApiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc1d108015a60ec6fb2d04e49e6039dd`;

// var cityCurrentData = {
//     cityName: '',
//     currentCondition: '',
//     temperature: '',
//     humidity: '',
//     windSpeed: '',
//     UVIndex: '',
// };

var fiveDayData = {
        date: '',
        weatherPic: '',
        temp: '',
        humidity: '',
};


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
            
            for (i=0; i<5; i++) {
                var arr = 7 + [i];
                console.log(data.list);
                console.log(data.list[arr]);
                console.log(data.list[arr].dt_txt);
                console.log(data.list[arr].main.temp);
                console.log(data.list[arr].weather[0].main);
                console.log(data.list[arr].main.humidity);
            }
        })

        
    fetch(finalCityApiUrl) 
        .then(function (response) {
        return response.json();    
        })
        .then(function (data) {
            currentCity.text(data.name);
            var currentWeatherCondition = data.weather[0].description;
            currentCityTempEl.text(`${data.main.temp} \xB0`);
            currentCityHumidityEl.text(`${data.main.humidity}%`);
            currentCityWindSpeedEl.text(`${data.wind.speed}  MPH`);
       
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

searchButton.on("click", function(event) {
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