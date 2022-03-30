// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// useApiData.js
function MainResults({userQuery}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState();
  const [bookResult, setBookResult] = useState();
  const [matchFound, setMatchFound] = useState(false);
  // Fecth data...

  useEffect(() => {

    if (userQuery) {
        setIsLoading(true);
        
        const movieRequest = axios.get('https://api.themoviedb.org/3/search/movie', { 
          params: {
            api_key: '35bd123ad3158b39b289afb24d2033f1',
            query: userQuery
          }
        });
        const googleBooksRequest = axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
          q: userQuery,
          key: 'AIzaSyAf3zyWxUfcixOV4_7na6P5uwuVrLtlZDk'
          }
        });
  
    axios.all([movieRequest, googleBooksRequest]).then(axios.spread((movieData, booksData) => {
        setIsLoading(false);

        const movieResults = movieData.data.results;
        const bookResults = booksData.data.items

        if (movieResults.length > 0 && bookResults !== undefined) {
          const re = new RegExp(userQuery, 'i')
          const movieFound = movieResults.find(movie => {
            return re.test(movie.title);
          })
          if (movieFound) {
            const title = movieFound.title;
            const bookFound = bookResults.find(book => {
              return book.volumeInfo.title === title;
            })
            if (bookFound) {
              setMovieResult(movieFound);
              setBookResult(bookFound);
              displayResult();
              setMatchFound(true);
            }
          }
        } 
      }));
    } 
  }, [userQuery]);
        
  function displayResult() {
    console.log(movieResult);
    console.log(bookResult.volumeInfo);
    // once we have the results 
    // compare average rating
          // object.vote_average
          // object.volumeInfo.averageRating
  }

    return(
        <div className="results">
          {isLoading 
          ? <p>Fetching results</p> 
          : <div>
            Results here
            <div className="movie">
              <div className="wrapper">
                
              </div>
            </div>
            <div className="book">
              <div className="wrapper"></div>
              </div>
            </div>
          }
          {!matchFound
          && <p>Alert</p>}
        </div>
    )

}

export default MainResults;