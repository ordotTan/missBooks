export default function ReviewPreview(props) {
    const {id,name,rate,readAt,comment} = props.review
    return (
        <tr>
           <td>    
            {name} 
           </td>
           <td>    
            {readAt}
           </td>
           <td>
           {rate}
           </td>
           <td>
            {comment}
           </td>
           <td>
           <button onClick={()=>props.onRemoveReview(id)}>X</button>
           </td>
        </tr>
    )
}
