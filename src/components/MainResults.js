import { useState, useEffect } from "react";
import axios from "axios";
import MovieDisplayCard from "./MovieCard";
import BookDisplayCard from "./BookCard";
import RatingInfo from "./RatingInfo";

function MainResults({userQuery}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState();
  const [bookResult, setBookResult] = useState();
  const [matchFound, setMatchFound] = useState(false);
  const [ratingCompare, setRatingCompare] = useState("");

  useEffect(() => {

  // use axios to get results 
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
              setMatchFound(true);
            }
          }
        } 
      }));
    } 
  }, [userQuery]);
        
  useEffect(() => {
    if (matchFound) {
      const movieRating = movieResult.vote_average / 10;
      const bookRating = bookResult.volumeInfo.averageRating / 5;
      if (movieRating > bookRating) {
        setRatingCompare("The movie rating is better than the book.")
      } else {
        setRatingCompare("The book rating is better than the movie.");
      }
    }
  }, [movieResult, bookResult, matchFound]) 

    return(
      <>
      <div className="wrapper info-card__container">        
          {isLoading 
          && <p>Fetching results</p> 
          }
          
          {matchFound
          ? <>
            <div className="info-card__results">
                <MovieDisplayCard info={movieResult}/>
                <BookDisplayCard info={bookResult}/>
            </div>
            <RatingInfo description={ratingCompare}/>
            <div className="info-card__save">
                <button>Save Pair</button>
            </div>
          </>
          : <p></p>}
        </div>
    </>
    )
}

export default MainResults;