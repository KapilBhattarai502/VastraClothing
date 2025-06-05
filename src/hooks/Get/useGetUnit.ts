import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getUnit'


const getUnit=async()=>{
    const response= await axios.get(`http://localhost:6464/api/unit/get`)
    return response?.data
}


export const useGetUnit=()=>{

    return useQuery([QUERYKEY],getUnit,
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