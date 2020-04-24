const { Link } = ReactRouterDOM

export default function Book_Preview(props) {
    const {book} = props
    const {listPrice} = book
    var currSymbol
    switch (props.book.listPrice.currencyCode) {
        case 'USD':
            currSymbol='$'
        break;
        case 'ILS':
            currSymbol='₪'
            break;
        case 'EUR':
            currSymbol='€'
            break;
    }
    return (
        <Link to={`/book/${book.id}/${book.title}` }>
         <article className="book-preview">
            <p className="book-name">{ book.title }</p>
            <img className="book-img" src={book.thumbnail}></img>
            <p className="book-price">Price: {listPrice.amount } {currSymbol}</p>
        </article>
        </Link> 
 
    )
}