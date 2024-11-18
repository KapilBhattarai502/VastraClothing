
import {  useMutation, useQueryClient } from "react-query"
import { FormValues } from "../types/types"
import { message } from "antd"
import api from "../Config/api"



const createProduct=async(product:FormValues)=>{

    return await api.post("/api/admin/products",product)
    
  
}

export const useProductPost=()=>{
    const queryClient=useQueryClient()



    return useMutation(createProduct,{
        onSuccess:({data})=>{
            queryClient.invalidateQueries('getProducts');
            console.log(data);
            message.success("Product Created Successfully")
            

        },
        onError:()=>{
            message.error("Creation of product failed !!!")
        }
    })
}