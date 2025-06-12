import { message } from "antd"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getProductsColor'


const getProductColor=async()=>{
    const { data } = await api.get("api/product/colors/get");
    return Array.isArray(data?.[0]?.colors) ? data[0].colors : [];
}


export const useGetProductColors=()=>{

    return useQuery([QUERYKEY],getProductColor,
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