import { message } from "antd"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getUserAddress'


const getUserAddress=async()=>{
    const response= await api.get("/api/address/get/user")
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