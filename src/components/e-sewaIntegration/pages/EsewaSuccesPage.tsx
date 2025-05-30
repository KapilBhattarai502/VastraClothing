import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useConfirmPayment } from '../../../hooks/useConfirmPayement';
import axios from 'axios';

const EsewaSuccesPage = () => {
    const [transactionData, setTransactionData] = useState(null);
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
                const response=await axios.get(`http://localhost:6464/api/payment/confirmation?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`)
  
            }
            confirmPayment()
        }
      },[transactionData])

    
  return (
    <div>EsewaSuccesPage</div>
  )
}

export default EsewaSuccesPage