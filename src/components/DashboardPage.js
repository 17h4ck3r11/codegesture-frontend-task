import React, { useEffect, useState } from 'react'
import users from '../assets/img/team.png'
import employees from '../assets/img/hired.png'
import notes from '../assets/img/note.png'
import daily from '../assets/img/summer.png'
import monthly from '../assets/img/calendar.png'

function DashboardPage() {
  const [userdata, setuserdata] = useState()
  const [notedata, setnotedata] = useState()
  const [employeedata, setemployeedata] = useState();
  const [dailyNoteCount, setdailyNoteCount] = useState(0);
  const [monthlyNoteCount, setmonthlyNoteCount] = useState(0);
  const [isAdminUser, setisAdminUser] = useState(false)

  const getLen = async ()=>{
    let result1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-count`);
    result1 = await result1.json();
    setuserdata(result1.length)

    let result2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-count`);
    result2 = await result2.json();
    setnotedata(result2.length)

    let result3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee-count`)
    result3 = await result3.json();
    setemployeedata(result3.length)

    const dateInstance = new Date();

    let date = dateInstance.getDate();
    let month = dateInstance.getMonth();
    let year = dateInstance.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let noteData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`) ;

    noteData = await noteData.json();

    let monthlyCount = 0;
    let dailyCount = 0;

    noteData.map((item)=>{
      if(item.date == date && item.month == monthNames[month] && item.year == year) {
        dailyCount = dailyCount + 1;
        setdailyNoteCount(dailyCount);
      }

      if(item.month == monthNames[month] && item.year == year) {
        monthlyCount = monthlyCount + 1;
        setmonthlyNoteCount(monthlyCount);
      }
    })
  }

  useEffect(() => {
    getLen();
    
    let userType = localStorage.getItem('admin')

    if(userType) {
      setisAdminUser(true)
    }
    else {
      setisAdminUser(false)
    }
  }, [])

  return (
    <div className='dashboardPage dashboardRender '>
      <div className="box-container d-flex flex-column">
      <div className="dashboardBox">
        <h2>{dailyNoteCount} Notes have been Published Today!</h2> 
        <img src={daily} alt="" />
      </div>

      <div className="dashboardBox">
        <h2>{monthlyNoteCount} Notes have been Published this Month!</h2> 
        <img src={monthly} alt="" />
      </div>

      {
        (isAdminUser) ?
        <>
          <div className="dashboardBox">
            <h2>{userdata} Viewers have been registered!</h2> 
            <img src={users} alt="" />
          </div>

          <div className="dashboardBox">
            <h2>{employeedata} Editors have been working!</h2> 
            <img src={employees} alt="" />
          </div>
        </> : ""
      }
      
      <div className="dashboardBox">
        <h2>{notedata} Notes have been published!</h2> 
        <img src={notes} alt="" />
      </div>
      </div>
    </div>
  )
}

export default DashboardPage
