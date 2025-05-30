import { message } from 'antd'
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerProtectedRoute = ({children}:any) => {
    const navigate=useNavigate()
    const validUser=localStorage.getItem('token');

    useEffect(()=>{
        if(!validUser){
            message.warning("Please login first");
            navigate("/login")

        }
    },[])
  return (
    <>
    {validUser ? children :null }
    </>
  )
}

export default CustomerProtectedRoute