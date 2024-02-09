import React, { useEffect, useState } from 'react'
import { faGear, faList, faPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function HorizontalNav() {
  const navigate = useNavigate();
  const [id, setid] = useState('')

  const logout = () => {
    localStorage.clear();
    navigate('/')
    window.location.reload();
  }

  const editProfile = () => {
    navigate(`/edit-profile/${id}`);
  }

  useEffect(() => {
    let result = JSON.parse(localStorage.getItem('user'));

    if (result) {
      if(result._id) {
        setid(result._id);
      }
      else {
        navigate('/');
      }
    }
    else {
      result = JSON.parse(localStorage.getItem('employee'));
      if(result) {
        if(result._id) {
          setid(result._id);
        }
        else {
          navigate('/')
        }
      }
      else {
        result = JSON.parse(localStorage.getItem('admin'));

        if(result._id) {
          setid(result._id);
        }
        else {
          navigate('/');
        }
      }
    }
  }, [])

  return (
    <>
    <Navbar expand="md" className="horizontalNav d-flex" style={{ width: '100%', position: 'fixed', top:'0', left: '0', zIndex: '100', background: "transparent!important" }}>
      <Container fluid>
        <Navbar.Brand style={{ width: '18vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to='/'><img style={{width: "100%"}} src={logo} alt="logo" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='navbarOptions' style={{ width: '100%' }}>
              <ul className='navbarIcons'>
                  <li className="hiddenItems" onClick={()=>{navigate('/')}}><i class="bi bi-speedometer2"></i></li>
                  <li className="hiddenItems" onClick={()=>{navigate('/new-note')}} ><FontAwesomeIcon icon={faPlus} /></li>
                  <li className="hiddenItems" onClick={()=>{navigate('/list-notes')}}><FontAwesomeIcon icon={faList} /></li>
                  <li onClick={editProfile} className='profile'><FontAwesomeIcon icon={faGear} /></li>
                  <li className='logout'><FontAwesomeIcon icon={faPowerOff} onClick={logout}/></li>
              </ul>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default HorizontalNav