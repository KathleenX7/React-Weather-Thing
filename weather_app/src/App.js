import './App.css';
import {useState} from 'react';
import styles from "./index.css";

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [temperature, setTemperature] = useState("");

  const helperFunctiontoSetWeatherState = (weatherCode) => {
    if(weatherCode === 0){
      return "sun";
    }else if(weatherCode >= 1 && weatherCode <= 3){
      return "cloud";
    }else if(weatherCode <= 48){
      return "fog";
    }else if((51 <= weatherCode && weatherCode <= 55) || (61 <= weatherCode && weatherCode <= 65) || (80 <= weatherCode && weatherCode <= 82)){
      return "rain";
    }else if(weatherCode <= 67){
      return "freezing";
    }else if(weatherCode <= 86){
      return "snow";
    }else{
      return "lightning";
    }
  }

  const handleTyping = (event) => {
    setSearchQuery(event.target.value);
  }
  
  const search = () => {
    fetch(`https://geocode.maps.co/search?q=${searchQuery}`).then((response) => response.json()).then((data) => {
      console.log(data);
      if ((data === undefined) || (data.length === 0)) {
        // error handling
      } else {
        // console.log(data[0]);
        // console.log(`${data[0].lat} ${data[0].lon}`);
        setCity(data[0].display_name);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data[0].lat}&longitude=${data[0].lon}&current_weather=true`).then((response) => response.json()).then((data2) => {
          console.log(data2);
          setTemperature(data2.current_weather.temperature);
          setWeatherState(helperFunctiontoSetWeatherState(data2.current_weather.weathercode));
        })
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={"./Logo.png"} className="App-logo" alt="logo" />
        <h1>Weather Thing App</h1>
      </header>
      <main>
        Search for your city: <input
         type="text"
         value={searchQuery}
         onChange={handleTyping}
         ></input>
        <button onClick={search}>Search</button>
        <div>{city}</div>
        <div><img src={weatherState}></img></div>
        <div>{temperature}</div>
      </main>
      <footer className="footer">
        Page created by Cynthia Lei
      </footer>
    </div>
  );
}

export default App;
