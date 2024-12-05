import { Button, message } from "antd";
import React, { useState } from "react";
import AddressModal from "../components/Modal/AddressModal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "../components/input-text/input-text";
import Select from "../components/select/select";

import PaymentStepper from "../components/stepper/stepper";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { useGetUserCart } from "../hooks/useGetUserCart";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../feature/Slice/userAddressSlice";
import { RootState } from "../store/Store";
import { ComponentWrapper } from "../components/commonStyle/componentWrapper";
import generateTransactionUUID from "../components/e-sewaIntegration/transactionUuid";
import { generateSignature } from "../components/e-sewaIntegration/signatureGenertaion";

import axios from "axios";


const AddressPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const selectedAddress = useSelector(
    (state: RootState) => state.useraddress.address
  );
  console.log("selected address is ", selectedAddress);
  const { data: currentUser } = useGetUserProfile();
  const { data: CartItems } = useGetUserCart();
  const dispatch = useDispatch();

  // const { mutate: createOrder } = useCreateOrder();

  // const handleClick=()=>{
  //   if(address){
  //     createOrder(address);

  //   }
  //   else{
  //     message.warning("Please select an address or create a  new address")
  //   }

  // }

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

  const handleCheckout = async () => {
    if (selectedAddress) {
      const transaction_uuid = generateTransactionUUID();
      const signature = await generateSignature(
        "8gBm/:&EnhH.1/q",
        `total_amount=${CartItems?.data.totalDiscountedPrice},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`
      );

      console.log("signature is", signature); 
      if (CartItems) {
        const tax_amount="0";
        const product_delivery_charge="0"
        const product_service_charge= "0"
        const esewa_data: any = {
          failure_url: "http://localhost:5173/clothes/esewa-error",
          amount: `${CartItems?.data.totalDiscountedPrice}`,
          product_delivery_charge,
          product_service_charge,
          product_code: "EPAYTEST",
          signature,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          success_url: "http://localhost:5173/clothes/order",
          tax_amount,
          total_amount: `${CartItems?.data.totalDiscountedPrice}`,
          transaction_uuid,
        };
      

        const form = document.createElement("form");
        form.setAttribute(
          "action",
          "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        ),
          form.setAttribute("method", "POST");
  
        // append from fields
  
        for (const [key, value] of Object.entries(esewa_data)) {
          const input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("name", key);
          input.setAttribute("value", value);
          form.appendChild(input);
        }
        // append form to the body
  
        document.body.appendChild(form);
        form.submit();
      
       
      }


    }
    else{
      message.warning("Please Select your address ")
    }
  
          
  };

  return (
    <div className="mt-20">
      <PaymentStepper activeStep={0}></PaymentStepper>
      <ComponentWrapper>
        {open && (
          <>
            <AddressModal open={open} setOpen={setOpen}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  city: "",
                  country: "",
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
                  country: Yup.string().required("Require Field"),
                  streetAddress: Yup.string().required("Require Field"),
                  phoneNumber: Yup.string().required("Require Field"),
                  zipCode: Yup.string().required("Require Field"),
                  state: Yup.string().required("Require Field"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(addAddress(values));
                  setOpen(false);

                  setSubmitting(false);
                }}
              >
                {({ setFieldValue, errors }) => (
                  <Form className=" flex flex-col  bg-white px-4 py-2 ">
                    <div className=" grid grid-cols-2 gap-2">
                      <div className=" col-span-1">
                        <InputText name="firstName" label="FirstName*" />
                      </div>
                      <div>
                        <InputText name="lastName" label="LastName*" />
                      </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-2 ">
                      <div className=" col-span-1">
                        <Select
                          name="country"
                          options={countryOptions}
                          label="Country*"
                          setFieldValue={setFieldValue}
                          errorValue={errors?.country}
                          className=""
                        />
                      </div>
                      <div className=" col-span-1">
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
                )}
              </Formik>
            </AddressModal>
          </>
        )}

        <div className="grid grid-cols-2">
          <div className=" shadow-lg max-w-[500px] px-6 py-3 rounded-md overflow-y-auto">
            {currentUser?.address?.length > 0 &&
              currentUser.address.map((useraddress: any, i: any) => (
                <div key={i} className="mb-4 ">
                  <h5>
                    FullName:{useraddress.firstName + useraddress.lastName}
                  </h5>
                  <h5>City:{useraddress.city}</h5>
                  <h5>StreetAddress:{useraddress.streetAddress}</h5>
                  <h5>PhoneNumber:{useraddress.phoneNumber}</h5>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md mt-2"
                    onClick={() => {
                      dispatch(addAddress(useraddress));
                    }}
                  >
                    Select this address{" "}
                  </button>
                </div>
              ))}
          </div>
          <div>
            {selectedAddress && (
              <div className=" shadow-md max-w-[400px] p-4 rounded-md">
                <h1 className="text-lg font-semibold opacity-65">
                  Current Address:
                </h1>
                <h5>
                  FullName:
                  {selectedAddress?.firstName + selectedAddress?.lastName}
                </h5>
                <h5>City:{selectedAddress?.city}</h5>
                <h5>StreetAddress:{selectedAddress?.streetAddress}</h5>
                <h5>PhoneNumber:{selectedAddress?.phoneNumber}</h5>
              </div>
            )}
          </div>
        </div>
        <Button
          type="primary"
          className="mt-6 py-4"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Address
        </Button>
        <div className="flex justify-between  mt-20 gap-12 ">
          <div className="flex-grow">
            {CartItems?.data.cartItems.length > 0 ? (
              CartItems?.data.cartItems.map((item: any) => (
                <div key={item._id} className=" h-[200px] shadow-lg  px-4 mb-6">
                  <div className="flex gap-4 ">
                    <div className="h-[140px] w-[110px]">
                      <img
                        src={item.product.imageUrl}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-10">
                      <div>
                        <h1 className=" opacity-75 font-semibold">
                          {item.title}
                        </h1>
                        <h3 className="line-through font-thin">
                          Rs {item.price}
                        </h3>
                        <h2>Rs {item.discountedPrice}</h2>
                        <p className=" font-light">color:{item.color}</p>
                        <p>size:{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse">
                    <p className="mt-6 opacity-75 font-semibold">
                      Total Price: {item.quantity * item.discountedPrice}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-10 text-red-500">
                Your Cart Is Empty!!!
              </p>
            )}
          </div>
          <div className="basis-96 mr-10 shadow-xl px-5 py-4 h-[340px] rounded-md">
            <h1 className="mb-3 font-bold opacity-75 text-xl">Order summary</h1>
            <hr />
            <div className="flex justify-between items-center my-4">
              <p>Subtotal</p>
              <p>Rs {CartItems?.data.totalPrice}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p>Discounted Price</p>
              <p>Rs {CartItems?.data.discounts}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p>Delivery Charge</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4">
              <p>Total</p>
              <p>Rs {CartItems?.data.totalDiscountedPrice}</p>
            </div>
            <hr />
            <button
              className="w-full text-center bg-slate-900 text-white py-2 mt-8"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default AddressPage;
