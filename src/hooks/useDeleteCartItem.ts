import { message } from "antd"
import { useMutation, useQueryClient } from "react-query"
import api from "../Config/api"

const deleteCartItem=async(id:string)=>{
    return await api.delete(`/api/cart_items/${id}`)

}

export const useDeleteCartItem=()=>{
     const queryClient=useQueryClient()

    return useMutation(deleteCartItem,{
        onSuccess:()=>{
            message.success("Deleted Successfully")
            queryClient.invalidateQueries('getUserCart');

        },
        onError:()=>{
            message.error("Deletion failed")
        }
    })
}