import { useState, useEffect } from "react";

// CompareCard.js
function BookDisplayCard({info}) {
    const [authors, setAuthors] = useState("");

    useEffect(() => {
        const list = info.volumeInfo.authors.map((author) => {
            return author;
        }).join(", ");
        setAuthors(list);
    }, [info])

    return(
    <div className="info-card">
        <h2>Book</h2>
        <h3 className="info-card__title">{info.volumeInfo.title}</h3>
        <img src={info.volumeInfo.imageLinks.thumbnail} alt="Book Cover Thumbnail" className="info-card__image" />
        <p className="info-card__rating">{info.volumeInfo.averageRating}</p>
        <div className="info-card__overlay">
            <p>{info.volumeInfo.publishedDate}</p>
            <p>{authors}</p>
            <p>{info.volumeInfo.description}</p>
            <p>{info.volumeInfo.pageCount}</p>
        </div>
    </div>
    )
}

export default BookDisplayCard;