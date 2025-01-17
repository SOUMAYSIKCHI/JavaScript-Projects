let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

// to get the actual country name

const fetchCityName = async(url)=>{
    try{
    const response = await fetch(url,{
        headers: {
            "Accept": "application/json"
        }
        }
    );
    const data = await response.json();
    const {sys,name} = data;
    city = name;
    getWeatherData();
    }catch(error){
        console.log(error);
    }
    
}
const loadFirst = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude,longitude} = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8d772e24ff80ae6653f2e285e6b6c3f5`;
            fetchCityName(url);
        }, (error) => {
            console.log(error.message);
        })
    }
}
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
  };

  const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
  };
  

const getWeatherData = async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8d772e24ff80ae6653f2e285e6b6c3f5`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        w_temperature.innerHTML= `${main.temp_max.toFixed()}&#176`;
        w_maxTem.innerHTML= `Max:${main.temp_max.toFixed()}&#176`;
        w_minTem.innerHTML= `Min:${main.temp_min.toFixed()}&#176`;
        w_feelsLike.textContent= main.feels_like;
        w_humidity.textContent= main.humidity;
        w_pressure.textContent = main.pressure;
        w_wind.innerHTML= `${wind.deg}&#176`;
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    }catch(error){
        console.log(error);
    }
};

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
  
    getWeatherData();
  
    cityName.value = "";
  });
  

  loadFirst();

// document.body.addEventListener('load',getWeatherData());`
