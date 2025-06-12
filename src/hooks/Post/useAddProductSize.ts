import { useMutation, useQueryClient } from "react-query"
import api from "../../Config/api"
import { message } from "antd"
import axios from "axios"



const addProductSize=async(productSize:any)=>{
    console.log("product Size",productSize)

    return await axios.post('http://localhost:6464/api/product/sizes/add',{sizes:productSize})
}



export const useAddProductsSize=()=>{
    const queryClient=useQueryClient()
    return useMutation(addProductSize,{
        onSuccess:()=>{
           
            queryClient.invalidateQueries('getProductsSize')
            message.success("Product Size Added Successfully")
            

        },
        onError:()=>{

            message.error("addition to cart failed")
        }
    })
}