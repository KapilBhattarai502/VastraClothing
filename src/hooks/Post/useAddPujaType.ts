import { useMutation, useQueryClient } from "react-query";
// import { FormValues } from "../types/types"
import { message } from "antd";
import api from "../../Config/api";
import { useNavigate } from "react-router-dom";

const addPujaType = async (newPujaType: any) => {
  const response = await api.post("/api/pujatype/add", newPujaType);
  return response;
};

export const useAddPujaType = () => {

  return useMutation(addPujaType, {
    onSuccess: () => {
        message.success("Puja Type added successfully!!!")
      
    },
    onError: () => {
      message.error("Puja Type addition failed !!!");
    },
  });
};
