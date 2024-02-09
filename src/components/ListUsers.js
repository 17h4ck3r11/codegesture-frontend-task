import React, { useEffect, useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704015604/Deleted_sg8kea.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>Notes has been Deleted!</h2>
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

function ListUsers() {
  const [data, setdata] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event)=>{
    let key = event.target.value;
    if(key){
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchUser/${key}`);
        result = await result.json()
        if(result) {
            setdata(result)
        }
    } else{
        getData();
    }
  }

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`,{
        headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
        }
    });
    result = await result.json();
    setdata(result);
  }

  const changeStatus = async (id, name, position, mobile, email, password, employee, admin, status) => {
    let result = await fetch (`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({name, position, mobile, email, password, employee, admin, blocked:(status)?false:true}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    result = await result.json();
  }

  const deleteUser = async (id) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, {
      method: 'delete'
    })

    result = await result.json();
    if(result.deletedCount) {
      setModalShow(true)
      getData();
      setTimeout(()=>{
        navigate('/list-users')
      }, 2500)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='listNotes d-flex flex-column' style={{position: 'absolute', top: '0', right: '0', padding: '5vw', width: "84%", overflow: 'auto'}}>
      <div className="search" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1vw', width: '100%', marginTop: '2vw'}}>
        <Form.Control 
          type="email" 
          placeholder="Search" 
          style={{width: '25%'}}
          onChange={handleSearch}
        />
        <Button>Search</Button>
      </div>
      <Table striped bordered hover responsive="sm" style={{marginTop: '4vw', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)', marginLeft: '1.5vw'}}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Position</th>
            <th>Edit</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {
              (data.length) ? 
                data.slice(0).reverse().map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td><Button variant="success" onClick={() => navigate(`/edit-user/${item._id}`)}>Edit</Button></td>
                      <td><Button variant="warning" onClick={() => {changeStatus(item._id, item.name, item.position, item.mobile, item.email, item.password, item.employee, item.admin, item.blocked); getData()}}>{(item.blocked)?"Blocked":"UnBlocked"}</Button></td>
                      <td><Button variant="danger" onClick={() => deleteUser(item._id)}>Delete</Button></td>
                    </tr>
                  )
                }
              ): null
            }         
        </tbody>
      </Table>
      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}

export default ListUsers