
import {  useMutation, useQueryClient } from "react-query"
import { message } from "antd"
import api from "../../Config/api"



const createProduct=async(obj:any)=>{

   const response = await api.post("/api/admin/products",obj)

  
   

  

   return response
    
  
}

export const useProductPost=()=>{
    const queryClient=useQueryClient()
    



    return useMutation(createProduct,{
        onSuccess:({data})=>{
            queryClient.invalidateQueries('getProducts');

            message.success("Product Created Successfully")
            

        },
        onError:()=>{
            message.error("Creation of product failed !!!")
        }
    })
}