// For Geocoding - http://api.openweathermap.org/geo/1.0/direct?q=Islamabad&appid=e9db5b895bfae488958c8f7e3b8f3f5e
// Main - https://api.openweathermap.org/data/2.5/weather?lat=33.6938&lon=73.0651&appid=e9db5b895bfae488958c8f7e3b8f3f5e

fetch("https://api.openweathermap.org/data/2.5/weather?lat=33.6938&lon=73.0651&appid=e9db5b895bfae488958c8f7e3b8f3f5e");
fetch("https://api.openweathermap.org/geo/1.0/direct?q=Islamabad&appid=e9db5b895bfae488958c8f7e3b8f3f5e");


const inputElement = document.querySelector('#input-city-name');

let cityNameElement = document.querySelector('#city-name');
let mainWeatherElement = document.querySelector('#main-weather');
let weatherConditionElement = document.querySelector('#weather-condtion');
let humidityElement = document.querySelector('#main-humidity');
let windElement = document.querySelector('#main-wind');
let iconElement = document.querySelector('#main-weather-icon');
let iconElement2 = document.querySelector('#main-weather-icon-2');

class TemperatureChecker {
    #apiKey;
    cityName;
    geocodingResponse;
    lattitude;
    longitude;
    mainTemp;
    lastModifiedTime;
    weatherCondition;
    humidity;
    wind;
    icon;
    constructor(apiKey, cityName) {
        this.#apiKey = apiKey;
        this.cityName = cityName;
        this.geocodingResponse;
        this.lattitude;
        this.longitude;
        this.mainTemp;
        this.lastModifiedTime;
        this.weatherCondition;
        this.humidity;
        this.wind;
        this.icon;
    }
    async getGeocoding(getFinalData) {
        await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + this.cityName + "&appid=" + this.#apiKey)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.geocodingResponse = data[0];
                this.lattitude = data[0].lat;
                this.longitude = data[0].lon;
            }).catch(() => {
                cityNameElement.innerText = 'Please Enter a correct a City Name'

            });
    }

    getFinalData() {
        let finalUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.lattitude + "&lon=" + this.longitude + "&appid=" + this.#apiKey;
        fetch(finalUrl).then((response) => {
            return response.json();
        }).then((data) => {
            this.cityName = data.name;
            this.mainTemp = Math.round(data.main.temp - 273);
            this.weatherCondition = data.weather[0].main;
            this.humidity = (data.main.humidity);
            this.wind = data.wind.speed;
            this.icon = data.weather[0].icon;
        }).catch(() => { cityNameElement.innerText = 'Please Enter a correct a City Name' });
    }
    lastUpdatedTime() {
        let minutes = 0;
        setInterval(() => {
            minutes++;
            this.lastModifiedTime = `${minutes} min ago`;
            let lastUpdateElement2 = document.querySelector('#last-update-time');
            lastUpdateElement2.innerText = this.lastModifiedTime;
        }, 60000)
    }

    printData() {


        cityNameElement.innerText = this.cityName;
        mainWeatherElement.innerText = this.mainTemp + "°C";
        weatherConditionElement.innerText = this.weatherCondition;
        humidityElement.innerText = `Humidity : ${this.humidity}`;
        windElement.innerText = `Wind Speed : ${this.wind}`;
        iconElement.src = `http://openweathermap.org/img/w/${this.icon}.png`;
        iconElement2.src = `http://openweathermap.org/img/w/${this.icon}.png`;
    }

}

function searchButtonPressed() {
    let inputValue = inputElement.value;
    inputElement.value = "";
    const apiKey = "e9db5b895bfae488958c8f7e3b8f3f5e";
    let temperature1 = new TemperatureChecker(apiKey, inputValue);
    temperature1.getGeocoding();
    setTimeout(() => {
        temperature1.getFinalData();
    }, 1000);
    setTimeout(() => {
        temperature1.printData();
    }, 1500);
    let inputCityDiv = document.body.querySelector('.input-city');
    inputCityDiv.style.display = 'none';
    document.querySelector('.display-after-search').classList.remove('display-none');
    temperature1.lastUpdatedTime();
}

function searchBtn() {
    if ((document.body.querySelector('.input-city').style.display == 'none')) {
        let inputCityDiv = document.body.querySelector('.input-city');
        inputCityDiv.style.display = 'flex';
    } else {
        let inputCityDiv = document.body.querySelector('.input-city');
        inputCityDiv.style.display = 'none';
    }
    document.querySelector('.display-after-search').classList.toggle('display-none');
}
