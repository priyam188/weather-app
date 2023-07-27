// const API_KEY ='96edb39a8e9e7e16370146751eed4c78';
const makeIconURL = (iconId)=>"http://drive.google.com/uc?export=view&id=1MtBhHQl6hSkqxPNwXl9_hC1YBFq3UlL1"

const getFormattedWeatherData = async(city, units = 'metric') => {
    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96edb39a8e9e7e16370146751eed4c78&units=${units}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);

      console.log(data);

    const{weather,
        main:{temp,feels_like, temp_min, temp_max, pressure, humidity},
    wind: {speed},
    sys: {country},
    name,

    } = data;

    const{ description, icon }=weather[0];
    return{
        description,
        iconURL:makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,

    };

};

export { getFormattedWeatherData };