import "./styles/sass/styles.css";
import { useState } from "react";
// import axios from "axios";
import MainResults from "./components/MainResults";
import Footer from "./components/Footer";

function App() {
  const [userInput, setUserInput] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const handleChange = (event) => {
      setUserInput(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserInput('');
      setUserSearch(userInput);
  }

  return (
    <div className="App">
        <header>
        <div className="wrapper">
          <h1>Is the Book Better?</h1>
          <p>Enter the name of a book or movie below</p>
          <form action="#" onSubmit={handleSubmit}>
              <input value={userInput} type="text" onChange={handleChange} id="search" name="search" placeholder="Search here..." />
              <button type="submit">Submit</button>
          </form>
        </div>
        </header>
        <main>
            {userSearch 
            ? <MainResults userQuery={userSearch}/>
            : 
            <div className="wrapper">
              <p>Popular Searches</p>
              <div className="btn-group">
                <button>Little Women</button>
                <button>Gone Girl</button>
                <button>The Giver</button>
                <button>Dune</button>
                <button>To Kill a Mockingbird</button>
                <button>The Color Purple</button>
                <button>The Wizard of Oz</button>
                <button>Persepolis</button>
              </div>
              <Footer />
            </div>
            }
        </main>
    </div>
  );
}

export default App;
