export default function GoogleBookPreview(props) {
    return (

        <article className="google-book-preview">
            <p className="book-name">{ props.book.volumeInfo.title.substring(0,50) }</p>
            {props.book.volumeInfo.authors && <p className="author-name">{props.book.volumeInfo.authors[0]}</p>}
            {!props.book.volumeInfo.authors && <p className="author-name">John Doe</p>}
            {props.book.volumeInfo.imageLinks && <img className="book-img" src={props.book.volumeInfo.imageLinks.thumbnail}></img>}
            {!props.book.volumeInfo.imageLinks && <img className="book-img" src="assets/img/noCover.gif"></img>}
            <button onClick={()=>props.onAddGoogleBook(props.book)}>Add to collection</button>
        </article>
    )
}