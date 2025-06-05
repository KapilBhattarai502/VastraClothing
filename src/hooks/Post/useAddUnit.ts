import { useMutation, useQueryClient } from "react-query";
// import { FormValues } from "../types/types"
import { message } from "antd";
import api from "../../Config/api";
import { useNavigate } from "react-router-dom";

const addUnit = async (newUnit: any) => {
  const response = await api.post("/api/unit/add", newUnit);
  return response;
};

export const useAddUnit = () => {

  return useMutation(addUnit, {
    onSuccess: () => {
        message.success("Unit added successfully!!!")
      
    },
    onError: () => {
      message.error("Unit addition failed !!!");
    },
  });
};
