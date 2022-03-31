import "./styles/sass/styles.css";
import { useState } from "react";
// import axios from "axios";
import MainResults from "./components/MainResults";
import Footer from "./components/Footer";

function App() {
  // destructure the return
  // on submit event from the form
    // use the user query for the axios call
    // use state as the param to the movie database API and goodreads API
    // store the response in a state

  // display information
    // show movie poster and book cover when successful, otherwise ask user for new search query

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
            <MainResults userQuery={userSearch}/>
        </main>
        <Footer />
    </div>
  );
}

export default App;
