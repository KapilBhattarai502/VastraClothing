import { useMutation, useQueryClient } from "react-query"
import api from "../Config/api"
import { message } from "antd"

const addtocart=async({productId,size}:any)=>{

    return await api.put('/api/cart/add',{productId,size})
}



export const useAddCart=()=>{
    const queryClient=useQueryClient()
    return useMutation(addtocart,{
        onSuccess:()=>{
            message.success("Added to Cart")
            queryClient.invalidateQueries('getUserCart')

        },
        onError:()=>{

            message.error("addition to cart failed")
        }
    })
}