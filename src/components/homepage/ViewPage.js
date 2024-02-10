import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ViewPage() {
  const params = useParams();
  const [data, setdata] = useState([])
  const [commentCount, setCommentCount] = useState(0)
  const [likeLength, setLikeLength] = useState('');
  const [commentText, setcommentText] = useState('');
  const [liked, setliked] = useState(false);
  const [userData, setuserData] = useState([])
  
  
  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-from-id/${params.id}`);
    result = await result.json()
    setdata(result);
    setLikeLength(result.likes.length);
    setCommentCount(result.comments.length);
    
    let userType = JSON.parse(localStorage.getItem("user"));
    setuserData(userType)

    const isExist = result.likes.some(user => user.userId === userData._id)
    if (isExist) {
      setliked(true);
    }
    else {
      setliked(false);
    }
  }

  useEffect(() => {
    getData();
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
      sideNav.style.display = "none";
    }
  }, [])

  const addComment = async (event) => {
    event.preventDefault();

    let id = params.id;

    if (commentText.length !== 0) {
      let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-comment/${id}`, {
        method: "POST",
        body: JSON.stringify({ userId: userData._id, comment: commentText }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      result = await result.json();

      getData();
      setcommentText('');
    }
  }

  const handleLikeClick = async () => {
    if (liked) {
      setLikeLength(likeLength - 1)
    }
    else {
      setLikeLength(likeLength + 1)
    }

    setliked(!liked);

    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/like/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({userId: userData._id}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    result = await result.json();
  }

  return (
    <div className='viewPage d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', padding: "7vw 3vw" }}>
      <h2 style={{ marginBottom: '2vw', background: "-webkit-linear-gradient(#159957, #155799)", fontWeight: '900', fontSize: '3vw', backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.title}</h2>
      {(data.file && data.file.length > 0) ? <iframe title="PDF Viewer" src={data.file} width="100%" height="600px" /> : <img src={data.image} style={{ width: "100%" }} alt="" />}
      <div className="postedOn" style={{ width: "100%" }}>
        <span style={{ color: '#FF1f04', fontWeight: "700", fontSize: "1vw" }}>{data.month} {data.date}, {data.year}</span>
      </div>
      <div className="activityIcons d-flex align-items-center" style={{ width: "100%", fontSize: '2vw', gap: "25px" }}>
        {(liked) ? <i style={{ color: "red" }} className="bi bi-suit-heart-fill icon" onClick={handleLikeClick}> {(data.likes) ? (likeLength >= 1000) ? ((likeLength / 1000).toFixed(1)) + "K" : likeLength : ""}</i>
          : <i className="bi bi-suit-heart icon" onClick={handleLikeClick}> {(data.likes) ? (likeLength >= 1000) ? ((likeLength / 1000).toFixed(1)) + "K" : likeLength : ""}</i>}
        <i style={{ color: "#FF1FFF" }} className="bi bi-chat icon"> {(data.comments) ? (data.comments.length >= 1000) ? ((data.comments.length / 1000).toFixed(1)) + "K" : data.comments.length : ""}  </i>
        <i style={{ color: "blue" }} className="bi bi-eye icon"> {(data.views) ? (data.views >= 1000) ? (((data.views) / 1000).toFixed(1)) + "K" : (data.views) : 0}</i>

      </div>
      <p style={{ marginTop: '1rem', marginBottom: '1rem', whiteSpace: 'pre-line', width: '100%', textAlign: 'justify', fontWeight: '600', fontSize: '1.2vw' }}>{data.description}</p>
      <div style={{ width: "100%" }}>
        <h4 style={{ fontWeight: '700' }}>Comments</h4>
        <hr />
      </div>
      {
        (data && data.comments && commentCount >= 1) ?
          ((commentCount > 1) ?
            (data.comments.map((item) => {
              return (
                <div className='commentCard'>
                  <div className="name d-flex align-items-center" style={{ gap: '15px' }}>
                    <FontAwesomeIcon icon={faUser} style={{ overflow: 'hidden', padding: '2px', color: 'rgba(0,0,0,0.6)', fontSize: '1.5vw', border: '1px solid rgba(0,0,0,0.5)', borderRadius: '100%' }} />
                    <h4 style={{ marginBottom: '0' }}>{(item.name) ? item.name : "Deleted User"}</h4>
                  </div>
                  <hr />
                  <h5>{item.comment}</h5>
                </div>
              )
            }))
            :
            <div className="commentCard">
              <div className="name d-flex align-items-center" style={{ gap: '15px' }}>
                <FontAwesomeIcon icon={faUser} style={{ overflow: 'hidden', padding: '2px', color: 'rgba(0,0,0,0.6)', fontSize: '1.5vw', border: '1px solid rgba(0,0,0,0.5)', borderRadius: '100%' }} />
                <h4 style={{ marginBottom: '0' }}>{data.comments[0].name}</h4>
              </div>
              <hr />
              <h5>{(data.comments) ? data.comments[0].comment : ""}</h5>
            </div>
          )
          : <h5 style={{ width: '100%', marginBottom: '2vw' }}>No Comment Exist!</h5>
      }

      <div className="addComment" style={{ width: "100%" }}>
        <Form style={{ background: "rgba(251,251,251,1)", padding: "2vw", borderRadius: "15px" }} onSubmit={addComment}>
          <h4>Add Comment Here!</h4>
          <hr style={{ marginBotton: '2vw' }} />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control value={commentText} as="textarea" rows={3} style={{ border: "1px solid rgba(0,0,0,0.5)" }} onChange={(e) => setcommentText(e.target.value)} />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default ViewPage
