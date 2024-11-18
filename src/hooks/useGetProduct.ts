import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getProducts'


const getProducts=async()=>{
    const {data}= await axios.get("http://localhost:6464/api/products")
    return data
}


export const useGetProduct=()=>{

    return useQuery(QUERYKEY,getProducts,
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