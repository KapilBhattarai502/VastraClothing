

import {  useState } from 'react'

const AdminDashboard = () => {
    const [admin,setAdmin]=useState(()=>localStorage.getItem("currentUser"));
  

  
  return (
    <div>
        Welcome {admin} to AdminDashboard
        <br/>

       
        
        
        </div>
  )
}

export default AdminDashboard