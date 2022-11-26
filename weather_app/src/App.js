import './App.css';
import {useState} from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");

  const search = () => {
    fetch("https://geocode.maps.co/search?q=asdguaysgd").then((response) => {
      console.log(response);
      setCity(searchQuery);
    })
  }

  const handleTyping = (event) => {
    setSearchQuery(event.target.value);
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
        <div>{}</div>
      </main>
      <footer className="footer">
        Page created by Cynthia Lei
      </footer>
    </div>
  );
}

export default App;
