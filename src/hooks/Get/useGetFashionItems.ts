import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getFashionItems'


const getFunctionProducts=async(category:any)=>{
    const response= await axios.get(`http://localhost:6464/api/bratabandha/items?category=${category}`)
    return response?.data
}


export const useGetFashionItems=(category:any)=>{

    return useQuery([QUERYKEY,category],()=>getFunctionProducts(category),
        { 
            onSuccess:()=>{
                console.log('Successfully fetched data');

            },
            onError:()=>{
                message.error("Error fetching data !!!");
            }
        }
    )

}