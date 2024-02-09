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

function EditUser() {
  const [modalShow, setModalShow] = useState(false);
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [position, setpostion] = useState('')
  const [employee, setEmployee] = useState(false);
  const [admin, setAdmin] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getData = async ()=>{
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile-from-id/${params.id}`);
    result = await result.json();
    setname(result.name);
    setpostion(result.position);
    setmobile(result.mobile);
    setemail(result.email);
    setpassword(result.password);
    setEmployee(result.employee);
    setAdmin(result.admin);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${params.id}`, {
      method: 'put',
      body: JSON.stringify({name, position, mobile, email, password, employee: (position === "Editor"), admin: (position === "Administrator"), blocked:false}),
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

        <Form.Group className='mb-3'>
            <Form.Label>Position</Form.Label>
            <Form.Select onChange={(e)=>{
              setpostion(e.target.value);
              console.log(position)
            }}>
                <option value={position}>{position}</option>
                <option value="Administrator">Administrator</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
            </Form.Select>
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
        navigate('/list-users');
      }} />
    </div>
  )
}

export default EditUser