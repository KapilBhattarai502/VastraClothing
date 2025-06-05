import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd";

const updateCart=async({cartItemId,quantity}:{cartItemId:string,quantity:number})=>{
    console.log(cartItemId,quantity)
 

    return await api.put(`/api/cart_items/${cartItemId}`,{quantity});

}
export const useUpdateCartItem=()=>{
    const queryClient= useQueryClient();


    return useMutation(updateCart,{
        onSuccess:()=>{
            message.success("Cart Item updated successfully");
            queryClient.invalidateQueries('getUserCart')

        },
        onError:()=>{
           message.error("Cart Item updation Failed")

        }

    })

}