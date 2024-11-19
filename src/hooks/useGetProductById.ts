import { useMutation } from "react-query"
import api from "../Config/api"
import { message } from "antd"

const getProductById=async(id:any)=>{
    return await api.get(`/api/products/id/${id}`)
}

export const useGetProductById=()=>{
 return useMutation(getProductById,{
    onSuccess:()=>{


    },
    onError:()=>{
        message.error("Error getting the product")
    }
})
}