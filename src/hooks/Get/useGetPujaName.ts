import { message } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const QUERYKEY = 'getPujaName'


const getPujaName=async()=>{
    const response= await axios.get(`http://localhost:6464/api/pujaname/get`)
    return response?.data
}


export const useGetPujaName=()=>{

    return useQuery([QUERYKEY],getPujaName,
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