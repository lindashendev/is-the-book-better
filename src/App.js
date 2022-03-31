import "./styles/sass/styles.css";
import { useState } from "react";
// import axios from "axios";
import MainResults from "./components/MainResults";
import Footer from "./components/Footer";

function App() {
  const [userInput, setUserInput] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [matchFound, setMatchFound] = useState(false);
  const handleChange = (event) => {
      setUserInput(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserInput('');
    setUserSearch(userInput);
  }

  const popularArray = [
    "Gone Girl",
    "The Giver",
    "Dune",
    "To Kill a Mockingbird",
    "The Color Purple",
    "The Wizard of Oz",
    "Persepolis"
  ]

  function handleBtnClick(e) {
    setUserSearch(e.target.value);
  }
  return (
    <div className="App">
        <header>
        <div className="wrapper">
          <h1>Is the Book Better?</h1>
          <p>Enter the name of a book or movie below</p>
          <form action="#" onSubmit={handleSubmit}>
              <input value={userInput} type="text" onChange={handleChange} id="search" name="search" placeholder="Search here" />
              <button type="submit">Submit</button>
          </form>
        </div>
        </header>
        <main>
            {userSearch 
            && 
              <MainResults userQuery={userSearch} setMatchFound={setMatchFound} matchFound={matchFound}/>
            }

            {!matchFound 
              &&             
              <div className="wrapper">
                <div className="btn-input">
                  <p>Popular Searches</p>
                  <div className="btn-group">
                    {
                      popularArray.map((title, index) => 
                        <button key={index} value={title} onClick={handleBtnClick}>{title}</button>
                      )
                    }
                  </div>
                </div>
                <Footer />
              </div>
            }
        </main>
    </div>
  );
}

export default App;
