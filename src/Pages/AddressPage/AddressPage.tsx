import { Button, message } from "antd";
import React, { useState } from "react";
import AddressModal from "../../components/Modal/AddressModal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "../../components/input-text/input-text";
import Select from "../../components/select/select";

import PaymentStepper from "../../components/stepper/stepper";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useGetUserCart } from "../../hooks/useGetUserCart";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../feature/Slice/userAddressSlice";
import { RootState } from "../../store/Store";
import { ComponentWrapper } from "../../components/commonStyle/componentWrapper";
import generateTransactionUUID from "../../components/e-sewaIntegration/transactionUuid";
import { generateSignature } from "../../components/e-sewaIntegration/signatureGenertaion";

import axios from "axios";
import AddressDrawer from "./Drawer";
import { useGetAddress } from "../../hooks/useGetAddress";


const AddressPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate=useNavigate()
  const {data:CartItems}=useGetUserCart()
  const {data:userAddress}=useGetAddress()

  
  const selectedAddress = useSelector(
    (state: RootState) => state.useraddress.address
  );
 
  const dispatch = useDispatch();


  const handleCheckout = async () => {
    if ((userAddress?.data?.userCurrentAddress)) {
      
     

      if (CartItems) {
        navigate(`/clothes/payment?total_amount=${CartItems?.data.totalDiscountedPrice}&product_code="EPAYTEST"`)

        // const tax_amount="0";
        // const product_delivery_charge="0"
        // const product_service_charge= "0"
        // const esewa_data: any = {
        //   failure_url: "http://localhost:5173/clothes/esewa-error",
        //   amount: `${CartItems?.data.totalDiscountedPrice}`,
        //   product_delivery_charge,
        //   product_service_charge,
        //   product_code: "EPAYTEST",
        //   signature,
        //   signed_field_names: "total_amount,transaction_uuid,product_code",
        //   success_url: "http://localhost:5173/esewa/success",
        //   tax_amount,
        //   total_amount: `${CartItems?.data.totalDiscountedPrice}`,
        //   transaction_uuid,
        // };
      

        // const form = document.createElement("form");
        // form.setAttribute(
        //   "action",
        //   "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        // ),
        //   form.setAttribute("method", "POST");
  
        // // append from fields
  
        // for (const [key, value] of Object.entries(esewa_data)) {
        //   const input = document.createElement("input");
        //   input.setAttribute("type", "hidden");
        //   input.setAttribute("name", key);
        //   input.setAttribute("value", value);
        //   form.appendChild(input);
        // }
        // append form to the body
  
        // document.body.appendChild(form);
        // form.submit();
      
       
      }


    }
    else{
      message.warning("Please select or create your address ")
    }
  
          
  };

  return (
    <div className="mt-20">
      <PaymentStepper activeStep={0}></PaymentStepper>
      <ComponentWrapper>
         <div className="flex justify-between  mt-20 gap-12 ">
           <div className="flex-1">
            <div className="shadow-lg px-6 py-3 rounded-md overflow-y-auto mb-4">
              <div className="flex justify-between cursor-pointer">
                <p>Shipping address</p>
                <p className=" text-blue-400"  onClick={() => {
                setOpen(true);
                }}>Add/Edit</p>
              </div>
              <div className="mt-2">
              {userAddress?.data?.userCurrentAddress?.map((address:any)=> 
        <div className='border px-1 py-1 mb-4'>
          <div key={address._id} className=' mb-4 pt-2 pb-6 px-2'>
          <div className='flex gap-3'>
          <p>{address.firstName} </p>
          <p>{address?.lastName}</p>
          <p>{address?.phoneNumber}</p>
          </div>
          <div className='flex gap-3 mt-1'>
          <span className=' bg-orange-400 px-2 rounded-lg '>Home</span>
          <p>{address.streetAddress},{address.city},{address?.state},{address.zipCode}</p>

          </div>
        </div>
        
        
       
</div>
)}
              </div>

            </div>
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
      <AddressDrawer open={open} setOpen={setOpen}/>
    </div>
  );
};

export default AddressPage;
