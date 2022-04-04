import { useState, useEffect } from "react";
import axios from "axios";
import ShowMovieCard from "./ShowMovieCard";
import ShowBookCard from "./ShowBookCard";
import CompareRating from "./CompareRating";
import LoaderIcon from "./LoaderIcon";
import Swal from "sweetalert2";
import 'animate.css';

function ResultsPage({userQuery, setMatchFound, matchFound}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieResult, setMovieResult] = useState({});
  const [bookResult, setBookResult] = useState({});
  const [ratingCompare, setRatingCompare] = useState("");
  // const [winner, setWinner] = useState({
  //   book: false,
  //   movie: false
  // })

  useEffect(() => {
    setMatchFound(false);
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
              return;
            } 
          }
        } 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          width: '500',
          customClass: {
            popup: 'swal-show'
          },
          html: '<p>We couldn\'t find a match. Please search again.<p>'
        })
      })).catch(() => {
        Swal.fire({
          icon: 'error',
          width: '500',
          customClass: {
            popup: 'swal-show'
          },
          title: 'Network Request Error',
          html: '<p>We couldn\'t connect to our network.<p>'
        })
      });
    } 
  }, [userQuery, setMatchFound]);
        
  useEffect(() => {
    if (matchFound) {
      window.scroll({
        top: 150,
        left: 0,
        behavior: 'smooth'
      });
      
      const movieRating = movieResult.vote_average / 10;
      const bookRating = bookResult.volumeInfo.averageRating / 5;
      if (movieRating > bookRating) {
        setRatingCompare("The movie rating is higher than the book.")
      } else {
        setRatingCompare("The book rating is higher than the movie.");
      }
    } else {

    }
  }, [movieResult, bookResult, matchFound]) 

    return(
      <>
        <div className="wrapper info-card">        
          { isLoading 
          && 
            <LoaderIcon />
          }
          
          { matchFound
          && 
            <>
              {/* <h3 className="info-card__title">{movieResult.title}</h3> */}
              <CompareRating description={ratingCompare}/>              
              <div className="info-card__results">
                  <ShowMovieCard info={movieResult}/>
                  <ShowBookCard info={bookResult}/>
              </div>

              {/* <div className="info-card__save">
                  <button>Save This Result</button>
              </div> */}
            </>
          }
        </div>
    </>
    )
}

export default ResultsPage;