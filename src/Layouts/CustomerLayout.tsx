import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'

const CustomerLayout = () => {
  return (
   <>
    <Header/>
    <Outlet/>
    <Footer/>
   </>
  )
}

export default CustomerLayout