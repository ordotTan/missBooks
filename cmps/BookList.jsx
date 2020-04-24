import Book_Preview from './Book_Preview.jsx'

export default function BookList(props) {
    return (
        <div className="book-list">
            {props.books.map(book => 
            <Book_Preview onSelectBook={props.onSelectBook } key={ book.id } book={ book } />) }
        </div>
    )
}