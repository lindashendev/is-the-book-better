// CompareCard.js
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function ShowMovieCard({info}) {
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
        <div className="info-card__container">
            <div className="info-card__inner">
                <p className="info-card__title">{info.title}</p>
                <h2 className="info-card__rating">Movie Rating: {info.vote_average} <span>/ 10</span></h2>
                <div className="info-card__image">
                    <img src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt="Original Size Movie Poster"/>
                </div>
                <div className="info-card__overlay">
                    <p>{info.release_date}</p>
                    <p className="highlight">{movieDetails}</p>    
                    <p>{info.overview}</p>
                </div>  
                {/* <p>Hover for details</p> */}
            </div>
    </div>
    )
}

export default ShowMovieCard;