import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useConfirmPayment } from '../../../hooks/Post/useConfirmPayement';
import axios from 'axios';
import { Spin } from 'antd';
import api from '../../../Config/api';
import { PAYMENTINFO } from '../../../types/types';
import { useEventCallback } from '@mui/material';
import { useCreateOrder } from '../../../hooks/Post/useCreateOrder';

const EsewaSuccesPage = () => {
    const orderCreatedRef = useRef(false);
    const [transactionData, setTransactionData] = useState(null);
    const [paymentInfo,setPaymentInfo]=useState <PAYMENTINFO|null> (null)
    const [paymentSuccess,setPaymentSuccess]=useState(false)
    const {mutate:createOrder} = useCreateOrder()
    const location =useLocation()
    useEffect(() => {
        // Get the 'data' query param from URL
        const queryParams = new URLSearchParams(location.search);
        const base64Data = queryParams.get('data');
    
        if (base64Data) {
          try {
            // Decode base64
            const decodedData = atob(base64Data);
            // Parse JSON
            const parsedData = JSON.parse(decodedData);
            setTransactionData(parsedData);
          } catch (error) {
            console.error('Failed to decode or parse data:', error);
          }
        }
      }, [location.search]);
      useEffect(()=>{
        if(transactionData){
            const {product_code,total_amount,transaction_uuid}=transactionData
            const confirmPayment=async()=>{
                const response = await api.get(`http://localhost:6464/api/payment/confirmation?product_code=${product_code}&total_amount=100&transaction_uuid=123`)
                setPaymentInfo(response?.data)
            }
            confirmPayment()
            
        }
      },[transactionData])
      useEffect(()=>{
        if(paymentInfo){
          setPaymentSuccess(paymentInfo?.status === "COMPLETE" ? true : false)
        }
      },[paymentInfo])

      useEffect(()=>{
        if (paymentSuccess && transactionData && !orderCreatedRef.current) {
          orderCreatedRef.current = true;
          const paymentDetails = {
            paymentMethod: "esewa",
            transactionId: transactionData.transaction_uuid,
            paymentId: paymentInfo?.ref_id,
            paymentStatus: "COMPLETED"
          };
          createOrder(paymentDetails);
        }

      },[paymentSuccess,transactionData,paymentInfo])

    
  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        {!paymentSuccess &&  <div className='flex gap-2 items-center'>
         <Spin size="small" />
        <p className=' text-blue-500'>Confirming Your Payment....</p>
        </div> }
        {paymentSuccess && <div className='flex gap-2 items-center'>
          <Spin size="small" />
          <p className=' text-blue-500'>Creating Your Order and Redirecting to Order Page....</p>
          </div>}
       
     
        
      </div>
      </div>
  )
}

export default EsewaSuccesPage