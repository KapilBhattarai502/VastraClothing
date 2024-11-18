import { message } from 'antd'
import  {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}:any) => {
  const navigate=useNavigate()
  const role=localStorage.getItem("role")?.toLocaleLowerCase()
  const token=localStorage.getItem("token")


  console.log(role,token)

  useEffect(()=>{
    if(!(role==='admin'&&token)){
      message.warning("you are not allowed ")
      navigate("/")
    }
    
     
  },[])



  return (
    <>
    {role==='admin' && token ? children : null}
    </>
  )
}

export default ProtectedRoute