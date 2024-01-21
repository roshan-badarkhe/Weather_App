import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import humidity from "../../assets/humidity.png";
import clear from "../../assets/clear.png";
import cloud from "../../assets/cloud.png";
import drizzle from "../../assets/drizzle.png";
import rain from "../../assets/rain.png";
import search from "../../assets/search.png";
import snow from "../../assets/snow.png";
import wind from "../../assets/wind.png";
const Weather = () => {
  const api_key = "741346486987c51218307d2c22a9b795";

  const [current, setCurrent] = useState({
    name: "",
    temp: "",
    humidity: "",
    speed: "",
    icon: "",
  });

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Washington&appid=${api_key}&units=metric`;
    axios.get(url).then((res) => {
      const decide = () => {
        const u = res.data.weather[0].main;
        var r = "";
        switch (u) {
          case "Clouds":
            r = cloud;
            break;
          case "Clear":
            r = clear;
            break;
          case "Snow":
            r = snow;
            break;
          case "Rain":
            r = rain;
            break;
          default:
            r = drizzle;
        }
        return r;
      };
      const icon = decide();

      setCurrent({
        name: res.data.name,
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        speed: res.data.wind.speed,
        icon: icon,
      });
    });
  }, []);

  const [input, setInput] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    setInput("");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        const decide = () => {
          const u = res.data.weather[0].main;
          var r = "";
          switch (u) {
            case "Clouds":
              r = cloud;
              break;
            case "Clear":
              r = clear;
              break;
            case "Snow":
              r = snow;
              break;
            case "Rain":
              r = rain;
              break;
            default:
              r = drizzle;
          }
          return r;
        };
        const icon = decide();

        setCurrent({
          name: res.data.name,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          icon: icon,
        });
      });
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <div className="search_bar">
          <input
            placeholder="Search"
            type="text"
            value={input}
            name="input"
            onChange={handleChange}
          />
          <button className="search_icon" type="submit">
            <img src={search} alt="search_icon"></img>
          </button>
        </div>
      </form>
      <div className="city_name">{current.name}</div>
      <div className="indicator">
        <img src={current.icon} alt="indicator"></img>
      </div>
      <div className="temperature">{current.temp} °C</div>
      <div className="data">
        <div className="element">
          <img src={humidity} alt="humidity"></img>
          <div className="humidity_data"> {current.humidity}% Humidity</div>
        </div>
        <div className="element">
          <img src={wind} alt="wind"></img>
          <div className="wind_data">{current.speed} km/h Wind</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
