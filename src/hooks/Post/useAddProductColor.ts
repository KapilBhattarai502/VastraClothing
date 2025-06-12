import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"
import axios from "axios"



const addProductColor=async(productColor:any)=>{
    console.log("product Size",productColor)

    return await axios.post('http://localhost:6464/api/product/colors/add',{colors:productColor})
}



export const useAddProductColor=()=>{
    const queryClient=useQueryClient()
    return useMutation(addProductColor,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getProductsSize')
            message.success("Product Color Added Successfully")
            

        },
        onError:()=>{

            message.error("addition to cart failed")
        }
    })
}