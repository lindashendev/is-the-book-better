import "./styles/sass/styles.css";
// import { useState } from "react";
function App() {
  // on submit event from the form
    // use the user query for the axios call
    // use state as the param to the movie database API and goodreads API
    // store the response in a state

  // display information
    // show movie poster and book cover when successful, otherwise ask user for new search query

  // const [userInput, setUserInput] = useState("");

  return (
    <div className="App">
      <h1>Is the Book Better</h1>
      <form action="#">
        <input type="text" id="search" name="search" placeholder="Search" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
