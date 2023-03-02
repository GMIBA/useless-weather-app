const API_key = "41d0045e61a6b609dc86de6b7b86928d"

function getCountryCapital() {
    return fetch('./public/resource/country-by-capital-city.json')
        .then(res => res.json())
        .then(json => json);
}

$(() => {
    $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: async function (location) {
            // $('#country').html(location.country_name);
            // $('#state').html(location.state);
            // $('#city').html(location.city);
            // $('#latitude').html(location.latitude);xz b
            // $('#longitude').html(location.longitude);
            // $('#ip').html(location.IPv4);
            let capital = await getCountryCapital();
            let weather;
            let city;
            if (location.city === null) {
                capital.forEach(ele => {
                    if (location.country_name.toLowerCase() === ele.country.toLowerCase()) {
                        city = ele.city;
                        city = 'Sydney';
                        weather = loadWeather(city);
                    }
                })
            } else {
                city = location.city;
                weather = loadWeather(city);
            }
            view(city,weather);
        }
    });
})
function view(city,weather){
    console.log(weather);
    $('.temp span').text(weather.main.temp + '°');
    $('.temp_min span').text(weather.main.temp_min + '°');
    $('.temp_max span').text(weather.main.temp_max + '°');
    $('.feels_like span').text(weather.main.feels_like + '°');
    $('.weather span').text(weather.weather[0].description);
    $('.humidty span').text(weather.main.humidity);
    let icon = weather.weather[0].icon;
    icon = icon.replace('d','');
    icon = icon.replace('n','');
    $('.full').css({'background':`linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,1)), url("https://source.unsplash.com/random/3840x2160/?${city},Scenery") center/cover`});
    $('.main_title').text(city);
    $('.country span').text(weather.sys.country);
    $('.weather_icon').attr('src',`./public/resource/weather/${icon}.png`)

}
function loadWeather(city) {
    let result;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&appid=${API_key}`,
        async: false,
        success: (res) => {
            return result = res;
        }
    })
    return result;
}
