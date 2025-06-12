import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"




const changeCurrentAddress=async(address:any)=>{
    return await api.put('/api/address/current',{address})
}



export const useUpdateCurrentAddress=()=>{
    const queryClient=useQueryClient()
    return useMutation(changeCurrentAddress,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getUserAddress')
            message.success("Order Status Changed Successfully")
            

        },
        onError:()=>{

            message.error("Order status change failed")
        }
    })
}