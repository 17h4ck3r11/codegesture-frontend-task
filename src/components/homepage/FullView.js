import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from './Card';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function FullView() {
  const params = useParams();
  const [data, setdata] = useState([]);

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-sorted-note/${params.id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('token'))
      }
    })

    result = await result.json();

    setdata(result);
  }

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

  useEffect(() => {
    getData();
  }, [])

  return (
    <section className="project" id="projects" style={{marginTop: "7vw"}}>
      <Container fluid>
        <Row>
          <Col size={12}>
            <h2 className='fullViewTitle'>{(params.id == 1) ? "Most Recent Note": (params.id == 2) ? "Most Liked Note": (params.id == 3) ? "Most Commented Note": (params.id == 4) ? "Most Viewed Note": "Sorry, you have Reached to a wrong Page!"}</h2>
            <div className="d-flex align-items-center justify-content-end">
              <Form.Control 
                type="text" 
                placeholder="Search" 
                style={{width: '20%', marginRight: '10px', marginBottom: '20px'}}
                onChange={handleSearch}
              />
              <Button style={{marginBottom: '20px'}}>Search</Button>
            </div>
            <Row className="d-flex flex-wrap align-items-center justify-content-center" style={{gap: '2.5vw'}} >
              {
                data.map((item) => {
                  return (
                    <Card
                      {...item}
                    />
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default FullView
