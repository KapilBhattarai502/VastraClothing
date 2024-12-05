import React from 'react'
import PaymentStepper from '../components/stepper/stepper'

const OrderPage = () => {

  return (
    <div className='mt-20'>
        <PaymentStepper activeStep={1}/>
    </div>
  )
}

export default OrderPage