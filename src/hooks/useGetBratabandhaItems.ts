import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getBrantabandhaItems'


const getBratabandhaProducts=async()=>{
    const response= await axios.get("http://localhost:6464/api/bratabandha/items")
    return response?.data
}


export const useGetBratabandhaItems=()=>{

    return useQuery(QUERYKEY,getBratabandhaProducts,
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