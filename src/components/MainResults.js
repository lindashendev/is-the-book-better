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
  
    axios.all([movieRequest, googleBooksRequest]).then(axios.spread((res1, res2) => {
        setIsLoading(false);
        console.log(res1);
        console.log(res2);
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