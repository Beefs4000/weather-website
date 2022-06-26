// Your API key is 635e1dd03bf30b4aa7bbed631494e814

const apiKey = '635e1dd03bf30b4aa7bbed631494e814';

// const city;

// const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// fetch(queryURL);
const searchForm = document.getElementById('search-form');
const inputSearch = document.getElementById('input-search');
const currentDayCity = document.getElementById('current-day-city');
const currentDayTemp = document.getElementById('current-day-temp');
const currentDayWind = document.getElementById('current-day-wind');
const currentDayHumidity = document.getElementById('current-day-humidity');
const currentDayUV = document.getElementById('current-day-uv');
// let locationIcon = document.querySelector('.weather-icon');



function getOneCallApi(lon, lat) {

    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
    // .then(function (oneCallData){
    //     console.log(oneCallData)
    // })
}

function getWeatherData(city) {


    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentWeather) {

            // console.log(currentWeather);

            return getOneCallApi(currentWeather.coord.lon, currentWeather.coord.lat, currentWeather.dt)
        })



}


// When I click on the search button
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // get user input
    const userInput = inputSearch.value;


    // send req to weatherboard api
    // fetch weather data based on city name

    getWeatherData(userInput)
        .then(function (weatherData) {

            console.log(weatherData);

            // once we got the data
            // populate the data into the DOM

            // current 
            // locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
            const icon = weatherData.current.weather.main;
            const dateTime = moment(weatherData.current.dt, 'X').format("YYYY-MM-DD");
            console.log(dateTime)
            currentDayCity.innerHTML = `${userInput} ${dateTime}`
            currentDayHumidity.textContent = weatherData.current.humidity;
            currentDayTemp.textContent = Math.floor(weatherData.current.temp) - 273 + ' C';
            currentDayWind.textContent = weatherData.current.wind_speed + ' kmh';
            currentDayUV.textContent = weatherData.current.uvi;
            // store the city name into local storage

            localStorage.setItem(userInput, userInput);
            // render the history in the search list

        })

});