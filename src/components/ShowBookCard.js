import { useState, useEffect } from "react";

// CompareCard.js
function ShowBookCard({info}) {
    const [authors, setAuthors] = useState("");

    useEffect(() => {
        const list = info.volumeInfo.authors.map((author) => {
            return author;
        }).join(", ");
        setAuthors(list);
    }, [info])

    return(
    <div className="info-card__container">
        <div className="info-card__inner">
            <p className="info-card__title">{info.volumeInfo.title}</p>
            <h2 className="info-card__rating">Book Rating: {info.volumeInfo.averageRating} <span>/ 5</span></h2>
            <div className="info-card__image">
            <img src={info.volumeInfo.imageLinks.thumbnail} alt="Book Cover Thumbnail"/>
            </div>
            <div className="info-card__overlay">
                <p>{info.volumeInfo.publishedDate}</p>
                <p className="highlight">{authors}</p>
                <p>{info.volumeInfo.description}</p>
                <p>{info.volumeInfo.pageCount}</p>
            </div>
            {/* <p>Hover for details</p>     */}
        </div>
    </div>
    )
}

export default ShowBookCard;