// CompareCard.js
function BookDisplayCard({info}) {
    return(
    <div className="info-card">
        <h2>Book</h2>
        <h3 className="info-card__title">{info.volumeInfo.title}</h3>
        <img src={info.volumeInfo.imageLinks.thumbnail} alt="Book Cover Thumbnail" className="info-card__image" />
        <p className="info-card__rating">{info.volumeInfo.averageRating}</p>
    </div>
    )
}

export default BookDisplayCard;