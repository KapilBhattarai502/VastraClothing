import { useQuery } from "react-query";
import api from "../Config/api";
import { message } from "antd";

const getusercart=async()=>{

    return await api.get('/api/cart')

}

export const useGetUserCart=()=>{

    const QUERYKEY='getUserCart';



    return useQuery([QUERYKEY],getusercart,{
        onSuccess:()=>{},
        onError:()=>{
            message.error("Error getting your cart")
        }
    })



}