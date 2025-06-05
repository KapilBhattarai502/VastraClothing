import { useMutation, useQueryClient } from "react-query";
// import { FormValues } from "../types/types"
import { message } from "antd";
import api from "../../Config/api";
import { useNavigate } from "react-router-dom";

const addPujaSubType = async (newPujaType: any) => {
  const response = await api.post("/api/pujasubtype/add", newPujaType);
  return response;
};

export const useAddPujaSubType = () => {

  return useMutation(addPujaSubType, {
    onSuccess: () => {
        message.success("Puja Sub Type added successfully!!!")
      
    },
    onError: () => {
      message.error("Puja Sub Type addition failed !!!");
    },
  });
};
