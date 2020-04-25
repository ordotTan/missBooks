const { Link } = ReactRouterDOM

import bookService from "../services/bookService.js"
import LongTxt from '../cmps/LongTxt.jsx'
import BookCategoriesList from '../cmps/BookCategoriesList.jsx'
import BookReviewAdd from './BookReviewAdd.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import eventBusService from '../services/eventBusService.js'


export default class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTxtShown: false
    }

    componentDidMount() {
        this.loadBook();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.theBookId !== this.props.match.params.theBookId) {
            this.loadBook();
        }
    }

    loadBook() {
        const id = this.props.match.params.theBookId
        bookService.getById(id)
            .then(book => {
                bookService.getNextPrevBooks(book.id)
                    .then(prevNext => {
                        this.prevNext = prevNext
                        this.setState({ book })
                    })
            })
    }

    onToggleDesc = () => {
        // this.setState({ isLongTxtShown: !isLongTxtShown })
        this.setState(prevState => ({ isLongTxtShown: !prevState.isLongTxtShown }))

    }

    //this.setState(prevState=>({isLongTxtShown:!prevState.isLongTxtShown}))

    getCurrencySign = (currencyCode) => {
        let currSymbol
        switch (currencyCode) {
            case 'USD':
                currSymbol = '$'
                break;
            case 'ILS':
                currSymbol = '₪'
                break;
            case 'EUR':
                currSymbol = '€'
                break;
        }
        return currSymbol
    }

    getReadingType = (pageCount) => {
        var readingType
        if (pageCount > 500) readingType = '(Long reading)'
        else if (pageCount > 200) readingType = '(Decent reading)'
        else if (pageCount < 100) readingType = '(Light reading)'
        return readingType
    }


    getBookAge = (publishedDate) => {
        const year = new Date().getFullYear()
        var bookAgeType = (year - publishedDate) <= 1 ? 'New' : 'Veteran'
        return bookAgeType
    }

    onSaveReview = (book) => {
        this.setState({ book })
    }

    onRemoveReview = (id) => {
        bookService.removeReview(this.state.book, id)
            .then(book => {
                this.setState({ book })
            })
    }

    removeBook = () => {

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete book'
        }).then((result) => {
            if (result.value) {
                bookService.remove(this.state.book.id)
                    .then(() => {
                        this.props.history.push('/book')
                        eventBusService.emit('user-msg', { txt: ' was removed', book: this.state.book, action: 'remove' })
                    })
                    .catch((err) => {
                        console.log('Error removing book:', err);
                    })
                // Swal.fire(
                //     'Cleared!',
                //     'Book removed',
                //     'success'
                // )
            }
        })
    }

    render() {
        const { book } = this.state
        const Loading = <p>Book not found, go back...</p>
        if (book) {
            var {
                id,
                title,
                subtitle,
                author,
                publishedDate,
                description,
                pageCount,
                categories,
                thumbnail,
                listPrice } = this.state.book
            var bookPriceClass
            if (listPrice.amount > 150) bookPriceClass = 'expensive-book'
            else if (listPrice.amount < 20) bookPriceClass = 'cheap-book'
        }

        return ((!book) ? Loading :
            <section className="book-details">
                <div className="book-info">
                    <p className="book-name"><span>{title}</span> by {author}</p>
                    <p>{subtitle}</p>
                    <img src={thumbnail}></img>
                    <LongTxt text={description} isLongTxtShown={this.state.isLongTxtShown} onToggleDesc={this.onToggleDesc} />
                    <p>Published at: {publishedDate} ({this.getBookAge(publishedDate)} book)</p>
                    <p>Page count: {pageCount} {this.getReadingType(pageCount)}</p>
                    <p>Price:<span className={`${bookPriceClass}`}>{listPrice.amount}{this.getCurrencySign(listPrice.currencyCode)}</span>
                        {listPrice.isOnSale && <img className="sale-img" src="assets/img/onSale.png"></img>}
                    </p>
                    {book.categories && <BookCategoriesList categories={categories} />}
                    {<div>
                        <Link to={`/book/${this.prevNext.prevId}/${book.title}`}>Previous Book</Link> |
                        <Link to={`/book/${this.prevNext.nextId}/${book.title}`}> Next Book</Link>
                    </div>}
                </div>
                <div className="review-section">
                    <div className="review-form-container">
                        <BookReviewAdd bookId={id} onSaveReview={this.onSaveReview} />
                    </div>
                    <div className="reviews-container">
                        {book.reviews && book.reviews.length > 0 && <ReviewList book={book} onRemoveReview={this.onRemoveReview} />}
                    </div>
                </div>
                <div>
                    <button className="delete-btn" onClick={this.removeBook}>Delete Book</button>
                </div>

            </section>
        )
    }
}