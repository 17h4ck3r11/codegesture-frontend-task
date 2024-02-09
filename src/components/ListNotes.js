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

function ListNotes() {
  const [data, setdata] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event)=>{
    let key = event.target.value;
    if(key){
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/${key}`);
        result = await result.json()
        if(result) {
            setdata(result)
        }
    } else{
        getData();
    }
  }

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`,{
        headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
        }
    });
    result = await result.json();
    setdata(result);
  }

  const deleteNote = async (id) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note/${id}`, {
      method: 'delete'
    })

    result = await result.json();
    if(result.deletedCount) {
      setModalShow(true)
      getData();
      setTimeout(()=>{
        navigate('/list-notes')
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
            <th>Title</th>
            <th>Date</th>
            <th>View</th>
            <th>Edit</th>
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
                      <td>{item.title}</td>
                      <td>{item.month} {item.date}, {item.year}</td>
                      <td><Button variant="success" onClick={() => navigate(`/view-note/${item._id}`)}>View</Button></td>
                      <td><Button variant="warning" onClick={() => navigate(`/update-note/${item._id}`)}>Edit</Button></td>
                      <td><Button variant="danger" onClick={() => deleteNote(item._id)}>Delete</Button></td>
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

export default ListNotes