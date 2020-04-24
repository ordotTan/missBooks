
import bookService from '../services/bookService.js'

export default class BookReviewAdd extends React.Component {

    constructor() {
        super();
        this.formNameInput = React.createRef();
    }

    state = {
        review: {
            name: '',
            rate: '',
            readAt: '',
            comment:''
        }
    }

    componentDidMount() {
        this.formNameInput.current.focus()
        this.setState({ review: {  //Default values to the form
            name: 'Books Reader', 
            comment:'',
            readAt:new Date().toISOString().slice(0,10)} }) 
    }

    handleInput = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                review: {
                    ...prevState.review,
                    [field]: value
                }
            }
        })
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        bookService.addReview(this.state.review, this.props.bookId)
            .then(book => {
                this.setState({ review: {  //clearing the form back to default
                    name: 'Books Reader', 
                    comment:'',
                    rate:'',
                    readAt:new Date().toISOString().slice(0,10)} }) 
                this.props.onSaveReview(book)
            })
            .catch(err => {
                console.log('OOPs', err);
            })
    }

    render() {
        const { review } = this.state
        return (<div>
            <h2>Submit your review</h2>
            <form className="form" onSubmit={this.onAddReview}>
                <label htmlFor="">Full Name: </label>
                <input type="text" name="name" value={review.name} onChange={this.handleInput} ref={this.formNameInput}></input>
                <label htmlFor="">Rating: </label>
                <select name="rate" value={review.rate} onChange={this.handleInput}>
                    <option value="">Book Rate</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="">Read at: </label>
                <input type="date" name="readAt" value={review.readAt} onChange={this.handleInput}></input>
                <label htmlFor="">Comments: </label>
                <textarea name="comment" placeholder="What did you like or not about it?" rows="4" cols="50" value={review.comment} onChange={this.handleInput}></textarea>
                <button>Submit</button>
            </form>
        </div>
        )
    }
}