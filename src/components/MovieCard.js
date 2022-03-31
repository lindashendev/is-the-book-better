// CompareCard.js
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function MovieDisplayCard({info}) {
    const [movieDetails, setMovieDetails] = useState([]);
    
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${info.id}/credits`, { 
            params: {
            api_key: '35bd123ad3158b39b289afb24d2033f1'
            }
        }).then((res) => {
            setMovieDetails(createCredsDisplay(res.data.cast));
        }) 
    }, [info]);

    function createCredsDisplay(movieData) {
        return movieData.map((movie) => {
            return movie.name;
        }).slice(0, 3).join(", ");
    }
    
    return(
        <div className="info-card">
        <h2>Movie</h2>
        <h3 className="info-card__title">{info.title}</h3>
        <img src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt="Original Size Movie Poster" className="info-card__image" />
        <p className="info-card__rating">{info.vote_average}</p>
        <div className="info-card__overlay">
            <p>{info.release_date}</p>
            <p>{info.overview}</p>
            <p>{movieDetails}</p>    
        </div>
    </div>
    )
}

export default MovieDisplayCard;