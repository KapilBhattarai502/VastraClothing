import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getUserOrder'


const getOrder=async()=>{
    const {data}= await api.get("http://localhost:6464/api/orders/user")
    return data
}


export const useGetUserOrder=()=>{

    return useQuery(QUERYKEY,getOrder,
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