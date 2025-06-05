import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getPujaType'


const getPujaType=async()=>{
    const response= await axios.get(`http://localhost:6464/api/pujatype/get`)
    return response?.data
}


export const useGetPujaType=()=>{

    return useQuery([QUERYKEY],getPujaType,
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