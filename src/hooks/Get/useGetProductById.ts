import {useQuery } from "react-query"
import api from "../../Config/api"
import { message } from "antd"


const QUERYKEY = 'getProductById'

const getProductById=async(id:any)=>{
    return await api.get(`/api/products/id/${id}`)
}

export const useGetProductById:any=(productId:any)=>{
 return useQuery([QUERYKEY],()=>getProductById(productId),{
    onSuccess:()=>{
    

    },
    onError:()=>{
        message.error("Error getting the product")
    }
})
}