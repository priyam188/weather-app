import React, { useState } from "react";
import n from "./assets/normal.jpg";
import b from "./assets/bad.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const[city, setCity] = useState("Kolkata");
  const[weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")

  useEffect(() => {
    const fetchWeatherData = async() => {

      const data = await getFormattedWeatherData(city, units);
        setWeather(data);
    };

    fetchWeatherData();
  }, [units,city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    // console.log(currentUnit);

    const isCelsius=currentUnit ==="C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric": "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keycode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (

    <div className="app" style={{ backgroundImage: `url(${n})`}}>

<div className="overlay">
  {
    weather &&(
      <div className="container">
      <div className="section section_inputs">
  <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..." />
  
  <button onClick={(e) => handleUnitsClick(e)} >°F</button>
      </div>
      <div className="section section_temperature">
      
        <div className="icon">
          <h3>{`${weather.name}, ${weather.country}`}</h3>
          <img id="logo" src="http://drive.google.com/uc?export=view&id=1MtBhHQl6hSkqxPNwXl9_hC1YBFq3UlL1" alt="icon" />
          <h3 >weather.description</h3>

        </div>
        <div className="temperature">
          <h1>{`${weather.temp.toFixed()} °${units==='metric' ? 'C':'F'}`}</h1>
        </div>
      </div>
       {/* bottom description */}
       <Descriptions weather={weather} units={units} />
    </div>

    )
  }

</div>

</div>
  );
}


export default App;
