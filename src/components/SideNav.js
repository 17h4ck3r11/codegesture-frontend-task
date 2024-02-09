import { faList, faPlus, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SideNav() {
  const navigate = useNavigate();
  const [isAdminUser, setisAdminUser] = useState(false)

  useEffect(() => {
    let admin = localStorage.getItem("admin")

    if (admin != undefined) {
      setisAdminUser(true);
    }
    else {
      setisAdminUser(false)
    }
  }, [])

  return (
    <div id="sideNav" className='sideNav' style={{ minHeight: '100vh' }}>
      <div className="darken" style={{ paddingTop: '7vw', height: '100%' }}>
        <ul style={{ width: '100%' }}>
          <li id="dashboard" className='active' onClick={(e) => {
            e.preventDefault();
            navigate('/');
            const dashboard = document.getElementById('dashboard');
            const newNote = document.getElementById('newNote');
            const listNote = document.getElementById('listNote');
            
            dashboard.classList.add('active')
            newNote.classList.remove('active')
            listNote.classList.remove('active')

            if(isAdminUser) {
            const addUser = document.getElementById('listUser');
            const listUser = document.getElementById('listUser');

            addUser.classList.remove('active')
            listUser.classList.remove('active')
            }

          }}><i class="bi bi-speedometer2"></i>Dashboard <i className="bi bi-arrow-up-right arrow"></i></li>

          <li id='newNote' onClick={(e) => {
            e.preventDefault();
            navigate('/new-note');

            const dashboard = document.getElementById('dashboard');
            const newNote = document.getElementById('newNote');
            const listNote = document.getElementById('listNote');
            
            dashboard.classList.remove('active')
            newNote.classList.add('active')
            listNote.classList.remove('active')

            if(isAdminUser) {
              const addUser = document.getElementById('addUser');
              const listUser = document.getElementById('listUser');
              addUser.classList.remove('active')
              listUser.classList.remove('active')
            }
          }}><FontAwesomeIcon icon={faPlus} style={{ marginRight: "0.2vw" }} />New Note <i className="bi bi-arrow-up-right arrow"></i></li>

          <li id='listNote' onClick={(e) => {
            e.preventDefault();
            navigate('/list-notes');

            const dashboard = document.getElementById('dashboard');
            const newNote = document.getElementById('newNote');
            const listNote = document.getElementById('listNote');
            
            dashboard.classList.remove('active')
            newNote.classList.remove('active')
            listNote.classList.add('active')

            if(isAdminUser) {
              const addUser = document.getElementById('addUser');
              const listUser = document.getElementById('listUser');
              addUser.classList.remove('active')
              listUser.classList.remove('active')
            }

          }}><FontAwesomeIcon icon={faList} />List Notes <i className="bi bi-arrow-up-right arrow"></i></li>

          {
            (isAdminUser) ?
              <>
                <li id='addUser' onClick={(e) => {
                  e.preventDefault();
                  navigate('/add-user');

                  const dashboard = document.getElementById('dashboard');
                  const newNote = document.getElementById('newNote');
                  const listNote = document.getElementById('listNote');
                  const listUser = document.getElementById('listUser');
                  const addUser = document.getElementById('addUser');


                  dashboard.classList.remove('active')
                  newNote.classList.remove('active')
                  listNote.classList.remove('active')
                  listUser.classList.remove('active')
                  addUser.classList.add('active')

                }}><FontAwesomeIcon icon={faUser} style={{ marginRight: '0' }} />Add User <i className="bi bi-arrow-up-right arrow"></i></li>

                <li id='listUser' onClick={(e) => {
                  e.preventDefault();
                  navigate('/list-users');

                  const dashboard = document.getElementById('dashboard');
                  const addUser = document.getElementById('addUser');
                  const newNote = document.getElementById('newNote');
                  const listNote = document.getElementById('listNote');
                  const listUser = document.getElementById('listUser');


                  dashboard.classList.remove('active')
                  newNote.classList.remove('active')
                  addUser.classList.remove('active')
                  listNote.classList.remove('active')
                  listUser.classList.add('active')

                }}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '0' }} />List Users <i className="bi bi-arrow-up-right arrow"></i></li>


              </>
              : null
          }
        </ul>
      </div>
    </div>
  )
}

export default SideNav