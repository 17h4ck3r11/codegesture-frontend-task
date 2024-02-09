import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import './LoginandRegister.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

function MydModalWithGrid(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={12} className='d-flex justify-content-center'>
                <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704012173/authenticated_vm9ota.gif" alt="" style={{width: '50%'}} />
              </Col>
              <Col xs={12} md={12}>
                <h2 style={{textAlign:"center"}}>AUTHENTICATED!</h2>
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

function MydModalWithPasswordValidation(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="grid-example">
            <Container>
            <Row>
                <Col xs={12} md={12} className='d-flex justify-content-center'>
                    <h4>Password must follow listed rules:</h4>
                </Col>
                <Col xs={12} md={12}>
                    <ul>
                        <li>It must contain 8 or more characters.</li>
                        <li>It must be alphanumeric.</li>
                        <li>It must contain an special symbol.</li>
                        <li>It must contain a UPPERCASE.</li>
                        <li>It must contain a lowercase.</li>
                    </ul>
                </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='warning' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}

function BlockedModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={12} className='d-flex justify-content-center'>
                <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1706957426/Animation_-_1706957288235_ftf8sx.gif" alt="" style={{width: '50%'}} />
              </Col>
              <Col xs={12} md={12}>
                <h2 style={{textAlign:"center"}}>You have been BLOCKED by Admin!</h2>
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

function LoginVerification(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={12} className='d-flex justify-content-center'>
                <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704492294/ezgif.com-optimize_vgcryk.gif" alt="" style={{width: '50%'}} />
              </Col>
              <Col xs={12} md={12} style={{marginTop: '2vw'}}>
                <h2 style={{textAlign:"center", fontWeight: '600'}}>Verifying Login Details...</h2>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
}

function AccountCreationModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={12} className='d-flex justify-content-center'>
                <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704491143/Animation_-_1704490603103_cyi7mr.gif" alt="" style={{width: '50%'}} />
              </Col>
              <Col xs={12} md={12} style={{marginTop: '2vw'}}>
                <h2 style={{textAlign:"center", fontWeight: '600'}}>Creating Account...</h2>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
}



function LoginandRegister() {
    const [validation, setvalidation] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [accountCreation, setaccountCreation] = useState(false);
    const [loginVerification, setloginVerification] = useState(false);
    const [name, setname] = useState()
    const [mobile, setmobile] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [isEmailExist, setisEmailExist] = useState(false)
    const [isMobileExist, setisMobileExist] = useState(false)
    const [passwordType, setpasswordType] = useState(true)
    const [isUpper, setisUpper] = useState(false);
    const [isLower, setisLower] = useState(false);
    const [isSpecial, setisSpecial] = useState(false);
    const [isNumeric, setisNumeric] = useState(false);
    const [isGreater, setisGreater] = useState(false);
    const [blocked, setBlocked] = useState(false)

    const handleValidation = (value) => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#%&])');
        const length = new RegExp('(?=.{8,})')

        if(lower.test(value)) {
            setisLower(true);
        }
        else {
            setisLower(false);
        }
        if(upper.test(value)) {
            setisUpper(true)
        }
        else {
            setisUpper(false);
        }
        if(number.test(value)) {
            setisNumeric(true)
        }
        else {
            setisNumeric(false);
        }
        if(special.test(value)) {
            setisSpecial(true)
        }
        else {
            setisSpecial(false);
        }
        if(length.test(value)) {
            setisGreater(true)
        }
        else {
            setisGreater(false);
        }
    }


    const handleSignIn = async (e) => {
        e.preventDefault();
        setloginVerification(true)

        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'post',
            body: JSON.stringify({ mobile, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        result = await result.json();

        if (result.user.blocked) {
            setBlocked(true)
        }

        else if (result.auth && !result.user.employee && !result.user.admin && !result.user.blocked) {
            setloginVerification(false)
            setModalShow(true)
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
        } 

        else if(result.auth && result.user.employee && !result.user.admin && !result.user.blocked) {
            setloginVerification(false)
            setModalShow(true)
            localStorage.setItem('employee', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
        }
        
        else if (result.auth && !result.user.employee && result.user.admin && !result.user.blocked) {
            setloginVerification(false)
            setModalShow(true)
            localStorage.setItem('admin', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
        }

        else {
            setloginVerification(false)
            let loginerr = document.getElementById('loginerror');
            loginerr.classList.add('active')
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(mobile.length === 10){
            setaccountCreation(true)
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`,{
                method: 'post',
                body: JSON.stringify({ name, mobile, email, password, employee:false, admin:false }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            console.warn(result);
            console.log(result.errorAt)
            if(result.errorAt) {
                setaccountCreation(false);
                if(result.errorAt.email) {
                    setisEmailExist(true)
                }
                else if(result.errorAt.mobile) {
                    setisMobileExist(true)
                }
            }
            else if(result.error) {
                setaccountCreation(false)
                setvalidation(true)
            }
            else {
                localStorage.setItem("user", JSON.stringify(result.result))
                localStorage.setItem("token", JSON.stringify(result.auth))
                setaccountCreation(false)
                window.location.reload();
            }
        }
        else {
            let errormsg = document.getElementById('errormsg');
            errormsg.classList.add('active');
        }
    }

    const handlePasswordType = () => {
        setpasswordType(!passwordType);
    }

    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });   
    })

    return (
        <div className='d-flex justify-content-center align-items-center' style={{width: '100vw', height: '100vh'}}>
            <div className="Container" id="container">
                <div className="Form-container-main Sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" required value={name} onChange={(e)=>setname(e.target.value)} />
                        <input type="text" placeholder="Mobile" required value={mobile} onChange={(e)=>{
                            setmobile(e.target.value);
                            const errormsg = document.getElementById('errormsg');
                            errormsg.classList.remove('active');
                            setisMobileExist(false)
                        }} />
                        <span id='existingError' style={{textAlign:"left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700", display: (isMobileExist) ? "block" : "none"}}> Contact number already registered! </span>
                        <span id='errormsg' style={{textAlign:"left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700"}}>Please enter valid Contact number!</span>
                        <input type="email" placeholder="Email" required value={email} onChange={(e)=>{
                            setemail(e.target.value);
                            setisEmailExist(false)
                        }} />
                        <span id='existingError' style={{textAlign:"left", width: "100%", marginLeft: '0.25vw', marginBottom: "0.5vw", color: "red", fontWeight: "700", display: (isEmailExist) ? "block" : "none"}}> Email Address already registered! </span>
                        <input type={(passwordType) ? "password" : "text"} placeholder="Password" value={password} onChange={(e)=>{
                            setpassword(e.target.value);
                            handleValidation(e.target.value);
                        }} />

                        <div className='passwordValidation' style={{width:'100%'}}>
                            <ul>
                                <li style={{color: (isGreater) ? '#4bb543' : 'red'}}><FontAwesomeIcon icon={(isGreater) ? faCheck: faXmark} style={{marginRight: '0.5vw'}}/> 8 or more characters!</li>
                                <li style={{color: (isUpper) ? '#4bb543' : 'red'}}><FontAwesomeIcon icon={(isUpper) ? faCheck: faXmark} style={{marginRight: '0.5vw'}}/> At least 1 Uppercase!</li>
                                <li style={{color: (isLower) ? '#4bb543' : 'red'}}><FontAwesomeIcon icon={(isLower) ? faCheck: faXmark} style={{marginRight: '0.5vw'}}/> At least 1 Lowercase!</li>
                                <li style={{color: (isSpecial) ? '#4bb543' : 'red'}}><FontAwesomeIcon icon={(isSpecial) ? faCheck: faXmark} style={{marginRight: '0.5vw'}}/> At least 1 Special character!</li>
                                <li style={{color: (isNumeric) ? '#4bb543' : 'red'}}><FontAwesomeIcon icon={(isNumeric) ? faCheck: faXmark} style={{marginRight: '0.5vw'}}/> At least 1 Numeric value!</li>
                            </ul>
                        </div>

                        <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={handlePasswordType} />
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>

                <div className="Form-container-main Sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <span id='loginerror' style={{textAlign:"center", width: "100%", marginLeft: '0.25vw', marginTop: "0.5vw", color: "red", fontWeight: "700"}}>Please enter correct login details!</span>
                        <input type="text" placeholder="Mobile" value={mobile} onChange={(e)=>{
                            setmobile(e.target.value);
                            const loginerr = document.getElementById('loginerror');
                            loginerr.classList.remove('active');
                        }} />
                        <input type={(passwordType) ? "password" : "text"} placeholder="Password" value={password} onChange={(e)=>{
                            setpassword(e.target.value);
                            const loginerr = document.getElementById('loginerror');
                            loginerr.classList.remove('active');
                        }} />

                        <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={handlePasswordType} />
                        <button type='submit'> Sign In </button>
                    </form>
                </div>

                <div className="Toggle-container">
                    <div className="Toggle">
                        <div className="Toggle-panel Toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login"> Sign In </button>
                        </div>

                        <div className="Toggle-panel Toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register"> Sign Up </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <MydModalWithGrid show={modalShow} onHide={() => {
                setModalShow(false);
                window.location.reload();
            }} />

            <MydModalWithPasswordValidation show={validation} onHide={() => {
                setvalidation(false);
            }} />

            <BlockedModal show={blocked} onHide={()=>{
                setloginVerification(false)
                setBlocked(false);
            }} />

            <AccountCreationModal show={accountCreation} />

            <LoginVerification show={loginVerification} />
        </div>
    )
}

export default LoginandRegister