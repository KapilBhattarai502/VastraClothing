import { message } from "antd"
import { useQuery } from "react-query"
import api from "../../Config/api"

const QUERYKEY = 'getProductsSize'


const getProductSize=async()=>{
    const { data } = await api.get("api/product/sizes/get");
    return Array.isArray(data?.[0]?.sizes) ? data[0].sizes : [];
}


export const useGetProductSizes=()=>{

    return useQuery([QUERYKEY],getProductSize,
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