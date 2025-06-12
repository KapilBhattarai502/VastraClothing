import { message } from "antd"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getProducts'


const getProducts:any=async({pageNumber,search,type,sub_type}:any)=>{
    console.log("type is",type)
    console.log("sub type is",sub_type)
    const {data}= await api.get(`/api/products?pageNumber=${pageNumber}&search=${search}&type=${type}&sub_type=${sub_type}`)
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