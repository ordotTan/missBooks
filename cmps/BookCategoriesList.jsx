export default function BookCategoriesList(props) {
    return (
        <div className="categories-list">
            <span>Topics:</span>
            <ul className="clean-list">
                {props.categories.map((category,idx) => <li key={idx}>{category}</li>)}
            </ul>
        </div>
    )
}

