export default function GoogleBookPreview(props) {
    const { title, authors, imageLinks } = props.book.volumeInfo
    return (

        <article className="google-book-preview">
            <p className="book-name">{title.substring(0, 50)}</p>
            {authors ? <p className="author-name">{authors[0]}</p> : <p className="author-name">John Doe</p>}
            {imageLinks ? <img className="book-img" src={imageLinks.thumbnail}></img> : <img className="book-img" src="assets/img/noCover.gif"></img>}
            <button onClick={() => props.onAddGoogleBook(props.book)}>Add to collection</button>
        </article>
    )
}