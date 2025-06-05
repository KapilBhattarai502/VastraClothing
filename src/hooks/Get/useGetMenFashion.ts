import { useQuery } from "react-query"
import api from "../../Config/api"
import { message } from "antd"






export const useGetMenFashion=(params:any)=>{
    const {pageNumber}=params
    const getMenClothes=async()=>{
        const {data}= await api.get(`/api/products?pageNumber=${pageNumber}`)
        return data
     }

    const QUERY_KEY:string="getMenFashion"
  

    return useQuery([QUERY_KEY,pageNumber],getMenClothes,
        
        {
            onSuccess:(data)=>{
                console.log(data);

            },
            onError:()=>{
                message.error("Error getting data...")

            }
    
    
    }
    
    
    )

    


}