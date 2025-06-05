import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Formik,Form } from 'formik';
import { useDispatch, useSelector } from "react-redux";


import AddressModal from "../../components/Modal/AddressModal";

import * as Yup from "yup";
import InputText from "../../components/input-text/input-text";
import Select from "../../components/select/select";
import { addAddress } from '../../feature/Slice/userAddressSlice';
import { usePostAddress } from '../../hooks/Post/usePostAddress';
const countryOptions = [
    { label: "USA", value: "USA" },
    {
      label: "CHINA",
      value: "CHINA",
    },
    {
      label: "RUSSIA",
      value: "RUSSIA",
    },
    { label: "NEPAL", value: "NEPAL" },
  ];

const AddModal: React.FC = ({isModalOpen,setIsModalOpen}:any) => {
    const [addressValues,setAddressValues]=useState(null)
    const { mutate, isLoading } = usePostAddress();
  

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New Address"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  city: "",
                  streetAddress: "",
                  phoneNumber: "",
                  zipCode: "",
                  state: "",
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Require Feild"),
                  lastName: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Require Field"),
                  city: Yup.string().required("Require Field"),
                  streetAddress: Yup.string().required("Require Field"),
                  phoneNumber: Yup.string().required("Require Field"),
                  zipCode: Yup.string().required("Require Field"),
                  state: Yup.string().required("Require Field"),
                })}
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    mutate(values, {
                        onSuccess: (data) => {
                          setIsModalOpen(false);
                          resetForm();
                        },
                        onError: (error) => {
                          console.error('Error posting address:', error);
                        },
                        onSettled: () => {
                          setSubmitting(false);
                        },
                      });
                   
              


                  setSubmitting(false);
                }}
              >
                {() =>{

                  return <Form className=" flex flex-col  bg-white px-4 py-2 ">
                    <div className=" grid grid-cols-2 gap-2">
                      <div className=" col-span-1">
                        <InputText name="firstName" label="FirstName*" />
                      </div>
                      <div>
                        <InputText name="lastName" label="LastName*" />
                      </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-2 ">
                      
                      <div className=" col-span-2">
                        <InputText name="city" label="City*" />
                      </div>
                    </div>
                    <InputText
                      name="phoneNumber"
                      label="Phone Number*"
                      type="text"
                    />
                    <InputText name="zipCode" label="ZipCode*" />
                    <InputText name="streetAddress" label="Street Address" />
                    <InputText name="state" label="state*" />

                    <button
                      type="submit"
                      className="w-full bg-blue-400 mt-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </Form>
}}
              </Formik>

  
      </Modal>
    </>
  );
};

export default AddModal;