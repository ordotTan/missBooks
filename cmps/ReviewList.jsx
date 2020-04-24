import ReviewPreview from './ReviewPreview.jsx'

export default function ReviewList(props) {
    return (
        <div className="review-list">
            <h3>Book Reviews:</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.book.reviews.map(review =>
                        <ReviewPreview onRemoveReview={props.onRemoveReview} key={review.id} review={review} />)}
                </tbody>
            </table>
        </div>
    )
}