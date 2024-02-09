import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ViewedNotes = () => {
  const [data, setdata] = useState([])
  const [noteCount, setNoteCount] = useState(0)

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/views-sorted-note`,{
        headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
        }
    });

    result = await result.json();
    setdata(result);
  }

  const getLen = async ()=>{
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-count`);
    result = await result.json();
    setNoteCount(result.length)
  }

useEffect(() => {
    getData();
    getLen();
}, [])

  return (
    <section className="project" id="projects">
      <Container fluid>
        <Row>
          <Col size={12}>
              <Row className="d-flex flex-wrap align-items-center justify-content-center" style={{gap: '2.5vw'}} >
                {
                  (noteCount<=12) ?
                  data.map((item, index) => {
                    return (
                      <Card
                        {...item}
                      />
                    )
                  }) : 
                  data.slice(0, 11).map((item, index) => {
                    return (
                      <>
                        <Card
                          {...item}
                        />
                        {(index === 10) ?
                          <div style={{width: '279.11px', height: '157.50px', overflow: 'hidden'}} >
                            <div className="d-flex align-items-center justify-content-center flex-column" style={{borderRadius: '7px!important', height: '100%', width: '100%', border: '1px solid black'}}>
                              <h4>+{(noteCount - 11)} More!</h4>
                              <br />
                              <Link style={{color:"white", textDecoration:"none"}} to='/4'><button style={{ padding: '5% 10%', fontSize: '1.2em', border: 'none', background: '#aa367c', color: 'white', borderRadius: '3px'}}>View!</button></Link>
                            </div>
                          </div>: ""}
                      </>
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