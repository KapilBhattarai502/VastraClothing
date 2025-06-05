import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getPujaSubType'


const getPujaSubType=async()=>{
    const response= await axios.get(`http://localhost:6464/api/pujasubtype/get`)
    return response?.data
}


export const useGetPujaSubType=()=>{

    return useQuery([QUERYKEY],getPujaSubType,
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