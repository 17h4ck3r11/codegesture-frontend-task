import { Link } from "react-router-dom"

export const Card = ({ _id, title, description, date, month, year, image, comments, likes, views }) => {
  return (
    <div style={{width: '279.11px', height: '157.50px', overflow: 'hidden'}} >
      <div className="proj-imgbx" style={{borderRadius: '7px!important', height: '100%', width: '100%'}}>
        <img src={image} style={{height: '100%', width: '100%'}} alt="" />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <div className="icons d-flex justify-content-evenly align-items-center" style={{margin:'1vw 0'}}>
            <i style={{color:'red', fontWeight:'700'}} className="bi bi-heart-fill"> &nbsp; {(likes.length>=1000) ? ((likes.length/1000).toFixed(1))+"K": likes.length}</i>
            <i style={{color:'white', fontWeight:'700'}} className="bi bi-chat-fill"> &nbsp; {(comments.length>=1000) ? ((comments.length/1000).toFixed(1))+"K": comments.length}</i>
            <i style={{color:'blue', fontWeight:'700'}} className="bi bi-eye-fill"> &nbsp; {(views>=1000) ? ((views/1000).toFixed(1))+"K": views}</i>
          </div>
          <Link style={{color:"white", textDecoration:"none"}} to={`/view-note/${_id}`}><button>View!</button></Link>
        </div>
      </div>
    </div>
  )
}