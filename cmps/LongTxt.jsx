export default function LongTxt(props) {
    var text = props.isLongTxtShown ? props.text : props.text.substring(0, 100)
    var btnLabel = props.isLongTxtShown ? 'Less' : 'More'
    if (props.text.length > 100 && btnLabel === 'More') text += '...'
    return (<p>
        {text} {(props.text.length > 100) && <button className="book-desc-toggle" onClick={props.onToggleDesc}>{btnLabel}</button>}
    </p>
    )
}


