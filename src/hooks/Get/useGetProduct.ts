import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getProducts'


const getProducts:any=async({pageNumber,search,type,sub_type}:any)=>{
    const {data}= await axios.get(`http://localhost:6464/api/products?pageNumber=${pageNumber}&search=${search}&type=${type}&sub_type=${sub_type}`)
    return data
}


export const useGetProduct=({pageNumber,search,type,sub_type}:any)=>{

    return useQuery([QUERYKEY,pageNumber,search,type,sub_type],()=>getProducts({pageNumber,search,type,sub_type}),
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