import { useMutation } from "react-query"
import api from "../../Config/api"
import { message } from "antd"
import { NEWUSER } from "../../types/types"
import { useNavigate } from "react-router-dom"

const registerUser=async(newuser:NEWUSER)=>{

    await api.post("/auth/signup",newuser)
}

export const useRegisterUser=()=>{
    const navigate=useNavigate()
    return useMutation(registerUser,{
        onSuccess:()=>{
            message.success("User Registered Successfully!!!")
            navigate("/login")
        },
        onError:()=>{
            message.error("User Registration Failed!!!")
        }
    })
}