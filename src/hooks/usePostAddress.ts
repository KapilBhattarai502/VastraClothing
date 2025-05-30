
import {  useMutation, useQueryClient } from "react-query"
import { message } from "antd"
import api from "../Config/api"



const addAddress=async(address:any)=>{

    return await api.post("/address/add",address)
    
  
}

export const usePostAddress=()=>{
    const queryClient=useQueryClient()



    return useMutation(addAddress,{
        onSuccess:({data})=>{
            queryClient.invalidateQueries('getUserAddress');
            message.success("Product Created Successfully")
            

        },
        onError:()=>{
            message.error("Creation of product failed !!!")
        }
    })
}