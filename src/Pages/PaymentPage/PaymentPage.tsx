import { CreditCardOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'antd';
import { generateSignature } from '../../components/e-sewaIntegration/signatureGenertaion';
import generateTransactionUUID from '../../components/e-sewaIntegration/transactionUuid';
import { InnerOuletWrapper, OutletWrapper } from '../../components/commonStyle/wrapper/OutletWrapper';


const PaymentPage = () => {
    const [paymentMethod,setPaymentMethod]=useState<String|null>(null)
    const [searchParams] = useSearchParams();

  const totalAmount = searchParams.get('total_amount');
  const productCode = searchParams.get('product_code');
  

  const handleEsewaPayment=async()=>{
    const transaction_uuid = generateTransactionUUID();
    const signature = await generateSignature(
      "8gBm/:&EnhH.1/q",
      `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`
    );

     const tax_amount="0";
        const product_delivery_charge="0"
        const product_service_charge= "0"
        const esewa_data: any = {
          failure_url: "http://localhost:5173/vaidik/esewa/error",
          amount: totalAmount,
          product_delivery_charge,
          product_service_charge,
          product_code: "EPAYTEST",
          signature,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          success_url: "http://localhost:5173/vaidik/esewa/success",
          tax_amount,
          total_amount: totalAmount,
          transaction_uuid:transaction_uuid,
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
  
  return (
    <OutletWrapper>
      <InnerOuletWrapper>
  
   
     <p className=' font-semibold'>Select Payment Method</p>
    <div className='grid grid-cols-12 gap-3.5'>
        <div className='col-span-8'>
         
          <div className=' grid grid-cols-12 gap-1 mt-2 cursor-pointer'>
            <div className='col-span-2 border text-center py-4' onClick={()=>setPaymentMethod("credit/debit")}>
            <CreditCardOutlined style={{fontSize:"1.5rem"}} />
            <p className='text-sm'>Credit/Debit Card</p>
            </div>
            <div className='col-span-2 border text-center py-4  cursor-pointer' onClick={()=>setPaymentMethod("esewa")} style={{backgroundColor:paymentMethod==="esewa" ? "#5CB544":"",color:paymentMethod === "esewa"? "#fff":""}}>
            <PaymentsIcon style={{fontSize:"1.5rem"}} />
            <p className='text-sm'>Esewa</p>
          

            </div>
            
            <div className='col-span-2 border text-center py-4  cursor-pointer' style={{backgroundColor:paymentMethod === "cashOnDelivery" ? "#FD5D26" : "",color:paymentMethod === "cashOnDelivery"? "#fff":""}} onClick={()=>setPaymentMethod("cashOnDelivery")}>
            <PaymentsIcon style={{fontSize:"1.5rem"}} />
            <p className='text-sm'>Cash On Delivery</p>

            </div>
          
          </div>
          {
            paymentMethod ==="cashOnDelivery" && <div className='border-2 mt-4 py-2 px-4 bg-white'>
              <p className='mb-2'>
              You may pay in cash to our courier upon receiving your parcel at the doorstep<br/>
             - Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'<br/>
             - Before receiving, confirm that the airway bill shows that the parcel is from Vaidik<br/>
             - Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel
              </p>
              <Button className="mt-2 text-white" style={{backgroundColor:"#FD5D26"}}>Confirm Order</Button>
              
            </div>
          }
          {
            paymentMethod ==="esewa" && <div className='border-2 mt-4 py-2 px-4 bg-white'>
              <p className='mb-2'>
              You have chosen eSewa as your payment method.<br/>
              -After confirming your order, you will be redirected to the eSewa payment page where you can complete the transaction securely using your eSewa ID or mobile number.              </p>
              <Button style={{color:"#fff",backgroundColor:"#5CB544"}} onClick={handleEsewaPayment}>Pay Now</Button>
              
            </div>
          }

        </div>
       
        <div className="shadow-xl px-5 py-1 max-h-32 rounded-md col-span-3 bg-white">
            <h1 className="mb-3 font-bold opacity-75 text-xl">Order summary</h1>
            <hr />
            <div className="flex justify-between items-center my-4">
              <p>Total</p>
              <p>Rs {totalAmount}</p>
            </div>
          </div>
         

        </div>
        </InnerOuletWrapper>
  
    </OutletWrapper>

  )
}

export default PaymentPage