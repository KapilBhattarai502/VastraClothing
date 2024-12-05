import { message } from "antd"

import { useQuery } from "react-query"
import api from "../Config/api"


export const useGetUserProfile=()=>{
   return  useQuery(['getUserProfile'],async()=>{

        const {data}= await api.get("/api/users/profile")
        return data
    },{

        onError:(error)=>{
            message.error('Error getting user Profile')
            console.log(error)
        }
    })





}