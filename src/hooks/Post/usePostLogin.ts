import axios from "axios"
import { LoginType, ResUser } from "../../types/types"
import { useMutation } from "react-query"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

export const usePostLogin=()=>{
    const navigate=useNavigate();

    const userLogin=async(data:LoginType)=>{
        return await axios.post("http://localhost:6464/auth/login",data)
    }

    return useMutation(userLogin,
        
    {
        onSuccess:({data}:any)=>{
            

            localStorage.setItem('token',data.token)
            localStorage.setItem('role',data.user.role)
            localStorage.setItem('currentUser',data.user.name);

            data.user.role.toLowerCase()==="admin" ?  navigate("/admin/dashboard") :navigate("/");
            
            message.success("LogIn successfull")

            
           

        },
        onError: () => {
            
            message.error("Invalid Credentials");
          },
          



    }
)
}