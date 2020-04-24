import bookService from '../services/bookService.js'
import GoogleBookList from '../cmps/GoogleBookList.jsx'
import eventBusService from "../services/eventBusService.js";

export default class BookAdd extends React.Component {

    constructor() {
        super();
        this.searchInput = React.createRef();
    }
    state = {
        googleBooks: null,
        search: {
            txt: ''
        }
    }

    componentDidMount() {
        this.searchInput.current.focus()
    }

    onSearchAPI = (text) => {
        bookService.getBooksData(text)
            .then(googleBooks => {
                this.setState({ googleBooks })
            })
    }

    onAddGoogleBook = (book) => {
        bookService.getById(book.id)
            .then((foundBook) => {
                if (!foundBook) {
                    bookService.addGoogleBook(book)
                        .then((book) => {
                            eventBusService.emit('user-msg', {txt: ' added to the catalog',book,action:'add'})
                        })
                }
                else  eventBusService.emit('user-msg', {txt: ' already exists in the catalog',book:foundBook,action:'add'})
            })
    }


    handleInput = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState(prevState => ({ search: { ...prevState.search, [field]: value } }), () => {
            this.onSearchAPI(this.state.search.txt)
        })
    }

    render() {
        const { txt } = this.state.search
        return (
            <section className ="google-book-searchbar">
                {/* <label htmlFor="">Search Books: </label> */}
                <input type="text" placeholder="Search for a book" name="txt" value={txt} onChange={this.handleInput} ref={this.searchInput}></input>
                {this.state.googleBooks && this.state.googleBooks.totalItems===0 && <h1>No Results</h1>}
                {/* {(!this.state.googleBooks || this.state.googleBooks.totalItems===0) && <img src="assets/img/googleBooks.png"></img>} */}
                {this.state.googleBooks && this.state.googleBooks.totalItems>0 && <GoogleBookList onAddGoogleBook={this.onAddGoogleBook} books={this.state.googleBooks} />}
                <img src="assets/img/googleBooks.png"></img>
            </section>
        )
    }
}