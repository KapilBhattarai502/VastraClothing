import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"




const changeOrderStatus=async({order_id,order_status}:any)=>{
    return await api.put('/api/orders/status',{order_id,order_status})
}



export const useUpdateOrderStatus=()=>{
    const queryClient=useQueryClient()
    return useMutation(changeOrderStatus,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getAllOrder')
            queryClient.invalidateQueries('getUserOrder')
            
            message.success("Order Status Changed Successfully")
            

        },
        onError:()=>{

            message.error("Order status change failed")
        }
    })
}