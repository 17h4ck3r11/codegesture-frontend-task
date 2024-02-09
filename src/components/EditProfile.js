import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704188515/Animation_-_1704188345150_firzfq.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>Profile has been updated!</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditProfile() {
  const [modalShow, setModalShow] = useState(false);
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const getData = async ()=>{
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile-from-id/${params.id}`);
    result = await result.json();
    setname(result.name);
    setmobile(result.mobile);
    setemail(result.email);
    setpassword(result.password);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${params.id}`, {
      method: 'put',
      body: JSON.stringify({name, mobile, email, password}),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if(result) {
      setModalShow(true);
    }
  }

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <div className='editProfile dashboardRender'>
      <div className="Form-container">
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>Update Profile</h2>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control name='mobile' type="text" placeholder="Enter Contact Number" value={mobile} onChange={(e)=>{setmobile(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter Email Address" value={email} onChange={(e)=>{setemail(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
        </Form.Group>        
      
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
      </div>
      <MydModalWithGrid show={modalShow} onHide={() => {
        setModalShow(false);
        navigate('/');
      }} />
    </div>
  )
}

export default EditProfile