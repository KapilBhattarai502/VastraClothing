import { message } from "antd"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getAllOrder'


const getAllOrder=async()=>{
    const {data}= await api.get("http://localhost:6464/api/admin/orders")
    return data
}


export const useGetAllOrder=()=>{

    return useQuery(QUERYKEY,getAllOrder,
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