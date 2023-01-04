import './App.css';
import {useState} from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");

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
      </main>
      <footer className="footer">
        Page created by Cynthia Lei
      </footer>
    </div>
  );
}

export default App;
