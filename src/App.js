import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginandRegister from './pages/LoginandRegister'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './components/DashboardPage';
import SideNav from './components/SideNav'
import HorizontalNav from './components/HorizontalNav';
import EditProfile from './components/EditProfile';
import UpdateNotes from './components/UpdateNotes';
import NewNotes from './components/NewNotes';
import ListNotes from './components/ListNotes';
import Homepage from './pages/Homepage';
import AppFooter from './components/homepage/AppFooter';
import AppNavbar from './components/homepage/AppNavbar';
import UpdateProfile from './components/homepage/UpdateProfile';
import ViewPage from './components/homepage/ViewPage';
import FullView from './components/homepage/FullView';
import ListUsers from './components/ListUsers';
import EditUser from './components/EditUser';
import AddEditor from './components/AddEditor';
import ScrollToTop from './components/ScrollToTop';
import ViewNotes from './components/ViewNotes';

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isEmployee, setisEmployee] = useState(false)
  const [isUser, setisUser] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)

  useEffect(() => {
    let user = localStorage.getItem('user');
    let employee = localStorage.getItem('employee');
    let admin = localStorage.getItem('admin');

    if (user) {
      setisAuthenticated(true);
      setisUser(true);
    }
    else if (employee) {
      setisAuthenticated(true);
      setisEmployee(true);
    }
    else if (admin) {
      setisAuthenticated(true);
      setisAdmin(true)
    }
    else {
      setisAuthenticated(false);
      setisEmployee(false);
      setisUser(false);
      setisAdmin(false);
    }

  }, [])

  return (
    <>
      <ScrollToTop />
      {
      (isAuthenticated) ? 
          
            <div className='dashboard d-flex flex-column'>
              {
                (isUser) ? 
                  <div>
                    <AppNavbar />
                    <Routes>
                      <Route exact path='/' element={<Homepage />} />
                      <Route exact path='/:id' element={<FullView />} />
                      <Route exact path='/view-note/:id' element={<ViewPage />} />
                      <Route exact path='/edit-profile/:id' element={<UpdateProfile />} />
                    </Routes>
                    <AppFooter />
                  </div>
                : (isAdmin) ? 
                    <>
                      <HorizontalNav />
                      <div className="dashboardSection d-flex">
                        <SideNav />
                        <Routes>
                          <Route exact path='/' element={<DashboardPage />} />
                          <Route exact path='/new-note' element={<NewNotes />} />
                          <Route exact path='/list-notes' element={<ListNotes />} />
                          <Route exact path='/update-note/:id' element={<UpdateNotes />} />
                          <Route exact path='/view-note/:id' element={<ViewNotes />} />
                          <Route exact path='/edit-profile/:id' element={<EditProfile />} />
                          <Route exact path='/list-users' element={<ListUsers />} />
                          <Route exact path='/edit-user/:id' element={<EditUser />} />
                          <Route exact path='/add-user' element={<AddEditor />} />
                        </Routes>
                      </div> 
                    </>
                  :
                    <>
                      <HorizontalNav />
                      <div className="dashboardSection d-flex">
                        <SideNav />
                        <Routes>
                          <Route exact path='/' element={<DashboardPage />} />
                          <Route exact path='/new-note' element={<NewNotes />} />
                          <Route exact path='/list-notes' element={<ListNotes />} />
                          <Route exact path='/update-note/:id' element={<UpdateNotes />} />
                          <Route exact path='/view-note/:id' element={<ViewNotes />} />
                          <Route exact path='/edit-profile/:id' element={<EditProfile />} />
                        </Routes>
                      </div> 
                    </>
              }
            </div>
        :
        <div>
          <Routes>
            <Route exact path='*' element={<LoginandRegister />} />
          </Routes>
        </div>
      }
    </>
  )
}

export default App;