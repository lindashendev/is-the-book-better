// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// useApiData.js
function MainResults({userQuery}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState();
  const [bookResult, setBookResult] = useState();
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
        // using response, if data matches, set State object 
        // if no data found, alert trigger 
          // if either are empty
        // console.log(movieData.data.results);
        // console.log(booksData.data.items);
        const movieResults = movieData.data.results;
        const booksResults = booksData.data.items
        // loop through the arrays - of objects 
          // movieData contains Object
            // object.title
            // object.vote_average
          // booksData contains Object
            // object.volumeInfo.title
            // object.volumeInfo.averageRating
        // loop find first item in each list that matches exactly, despite case used
          // find separately if the search term exists 
          // loop to get the term out of the first then find it in the second
          // use the userQuery
        const re = new RegExp(userQuery, 'i')
        const found = movieResults.find(movie => {
          return re.test(movie.title);
        })
    }));
    } 
  }, [userQuery]);

    return(
        <div className="MaiResults">
          {isLoading 
          ? <p>Fetching results</p> 
          : <div>
            Results here
            </div>
          }
        </div>
    )

}

export default MainResults;