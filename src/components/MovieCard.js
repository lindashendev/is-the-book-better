// CompareCard.js
function MovieDisplayCard({info}) {
    return(
        <div className="info-card">
        <h2>Movie</h2>
        <h3 className="info-card__title">{info.title}</h3>
        <img src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt="Original Size Movie Poster" className="info-card__image" />
        <p className="info-card__rating">{info.vote_average}</p>
    </div>
    )
}

export default MovieDisplayCard;