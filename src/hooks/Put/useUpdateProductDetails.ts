import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"




const updateProductDetails=async({obj,productId}:any)=>{
    return await api.put(`/api/admin/products/${productId}`,obj)
}



export const useUpdateProductDetails:any=()=>{
    const queryClient=useQueryClient()
    return useMutation(updateProductDetails,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getProductById')
            
            
            message.success("Product Details Updated Successfully")
            

        },
        onError:()=>{

            message.error("Order status change failed")
        }
    })
}