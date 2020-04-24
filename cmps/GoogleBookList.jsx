import GoogleBookPreview from './GoogleBookPreview.jsx'

export default function GoogleBookList(props) {
    return (
        <div className="book-list">
            {props.books.items.map(book => 
            <GoogleBookPreview onAddGoogleBook ={props.onAddGoogleBook} key={ book.id } book={ book } />) }
        </div>
    )
}