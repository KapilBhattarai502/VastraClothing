import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getPaymentConfirmation'


const getPaymentConfirmation:any=async(confirmationDetails:any)=>{
    const {product_code,total_amount,transaction_uuid}=confirmationDetails

    const response= await axios.get(`https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`)
    return response
}


export const useConfirmPayment=({product_code,total_amount,transcation_uuid}:any)=>{

    return useQuery([QUERYKEY,product_code,total_amount,transcation_uuid],()=>getPaymentConfirmation({product_code,total_amount,transcation_uuid}),
        { 
            onSuccess:()=>{
                console.log('Api Hit Successfull');

            },
            onError:()=>{
                message.error("Error fetching data !!!");
            }
        }
    )

}