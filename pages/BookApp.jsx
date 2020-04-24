import bookService from '../services/bookService.js'
import BookList from '../cmps/BookList.jsx'
import BookFilter from '../cmps/BookFilter.jsx'

export default class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadBooks())
    }

    render() {
        const { books } = this.state

        return (
            <section>
                <div className="catalog-header">
                    <h2>Books Catalog</h2>
                    <BookFilter onSetFilter={this.onSetFilter} />
                </div>

                {books && <BookList onSelectBook={this.onSelectBook} books={books} />}
            </section>
        )
    }
}