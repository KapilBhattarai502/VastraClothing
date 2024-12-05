
import {  useMutation, useQueryClient } from "react-query"
// import { FormValues } from "../types/types"
import { message } from "antd"
import api from "../Config/api"
import { useNavigate } from "react-router-dom"






const createOrder=async(order:any)=>{

    

    return await api.post("/api/orders",order)
    
  
}

export const useCreateOrder=()=>{
    const queryClient=useQueryClient()
    const navigate=useNavigate()



    return useMutation(createOrder,{
        onSuccess:({data})=>{
            queryClient.invalidateQueries('getUserOrder');
            console.log(data);
            navigate(`/clothes/order/?orderId=${data._id}`,{replace:true})
            // message.success("Product Created Successfully")
            

        },
        onError:()=>{
            message.error("Order failed !!!")
        }
    })
}