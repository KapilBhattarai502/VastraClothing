import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getProducts'


const getProducts:any=async(pageNumber:any)=>{
    const {data}= await axios.get(`http://localhost:6464/api/products?pageNumber=${pageNumber}`)
    return data
}


export const useGetProduct=(pageNumber:any)=>{

    return useQuery([QUERYKEY,pageNumber],()=>getProducts(pageNumber),
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