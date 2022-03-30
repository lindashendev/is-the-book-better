import "./styles/sass/styles.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // on submit event from the form
    // use the user query for the axios call
    // use state as the param to the movie database API and goodreads API
    // store the response in a state

  // display information
    // show movie poster and book cover when successful, otherwise ask user for new search query

  const [userInput, setUserInput] = useState("");
  const [movieResult, setMovieResult] = useState([]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovie(userInput);
    getBook(userInput);
    setUserInput('');
  }

  const apiKey = '35bd123ad3158b39b289afb24d2033f1';

  const getMovie = (userQuery) => {
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: apiKey,
        query: userQuery
      }
    }).then((res) => {
      return res.data;
    }).then((response) => {
      console.log(response);
      setMovieResult(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  // googlebooks api
  const getBook = (userQuery) => {
    axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: userQuery,
        key: 'AIzaSyAf3zyWxUfcixOV4_7na6P5uwuVrLtlZDk'
      }
    }).then((res) => {
      return res.data;
    }).then((response) => {
      console.log(response);
      setMovieResult(response);
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="App">
      <h1>Is the Book Better</h1>
      <form action="#" onSubmit={handleSubmit}>
        <input value={userInput} type="text" onChange={handleChange} id="search" name="search" placeholder="Search" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
