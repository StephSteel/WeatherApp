const api = {
    key: "2fa73590fd8b5a4c6e68098ad5625395",
    base : "http://api.openweathermap.org/data/2.5/",
}
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress" , setQuery);

function setQuery(event) {
    if (event.keyCode === 13) {
        getResults(searchBox.value)
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather)=>{
        return weather.json();
    })
    .then(displayResults)
}

function displayResults(weather){
    let city = document.querySelector(".location .city");
    city.innerHTML =  `${weather.name} , ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now)

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weatherEl = document.querySelector(".current .weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let minMax = document.querySelector(".minmax")
    minMax.innerHTML = `Min ${Math.round(weather.main.temp_min)} °C / Max ${Math.round(weather.main.temp_max)} °C`

}
function dateBuilder(d){
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days = [
            "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`
}