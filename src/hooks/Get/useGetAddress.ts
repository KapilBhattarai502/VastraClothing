import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getUserAddress'


const getUserAddress=async()=>{
    const response= await api.get("http://localhost:6464/address/get/user")
    return response
}


export const useGetAddress=()=>{

    return useQuery(QUERYKEY,getUserAddress,
        { 
            onSuccess:()=>{
                console.log('Successfully Fetched the address');

            },
            onError:()=>{
                message.error("Error fetching data !!!");
            }
        }
    )

}