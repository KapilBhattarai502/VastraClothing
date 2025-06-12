import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"
import { useNavigate } from "react-router-dom"


const addtocart=async({productId,size,quantity,color}:any)=>{

    return await api.post('/api/cart/add',{productId,size,quantity,color})
}



export const useAddCart=()=>{
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    return useMutation(addtocart,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getUserCart')
            navigate("/vaidik/cart")
            

        },
        onError:()=>{

            message.error("addition to cart failed")
        }
    })
}