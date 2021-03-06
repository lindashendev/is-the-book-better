import "./styles/sass/styles.css";
import { useState } from "react";
import ResultsPage from "./components/ResultsPage";
import Nav from "./components/Nav"
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

  const popularSearchArray = [
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
          <Nav />
          <div className="wrapper header">
            <h1>Is the Book Better?</h1>
            <p>Enter the name of a book or movie below</p>
            <form action="#" onSubmit={handleSubmit}>
                <input value={userInput} type="text" onChange={handleChange} id="search" name="search" placeholder="Search here" required/>
                <button type="submit">Submit</button>
            </form>
          </div>
        </header>
        <main>
            {userSearch 
            ? 
              <ResultsPage userQuery={userSearch} setMatchFound={setMatchFound} matchFound={matchFound}/>
            :
              <div className="wrapper">
                <div className="btn-search">
                  <p>Popular Searches</p>
                  <div className="btn-search__container">
                    {
                      popularSearchArray.map((title, index) => 
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
