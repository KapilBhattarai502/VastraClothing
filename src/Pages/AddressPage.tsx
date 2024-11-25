import { Button } from 'antd'
import React, { useState } from 'react'
import AddressModal from '../components/Modal/AddressModal'
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';

const AddressPage = () => {
    const [open,setOpen]=useState<boolean>(false)
  return (
    <div className='mt-20'>

        <div className='flex flex-row-reverse px-5'>
        <Button type="primary" onClick={()=>{setOpen(true)}}>
           Add Address
          </Button>
          {open && (<>
          <AddressModal open={open} setOpen={setOpen}>
          <Formik
       initialValues={{ firstName: '', lastName: '', email: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       <Form>
         <label htmlFor="firstName">First Name</label>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
         <label htmlFor="lastName">Last Name</label>
         <Field name="lastName" type="text" />
         <ErrorMessage name="lastName" />
 
         <label htmlFor="email">Email Address</label>
         <Field name="email" type="email" />
         <ErrorMessage name="email" />
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
            

          </AddressModal>


          
          
          </>)}
        </div>
    </div>
  )
}

export default AddressPage