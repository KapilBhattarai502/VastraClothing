import { useMutation, useQueryClient } from "react-query";
// import { FormValues } from "../types/types"
import { message } from "antd";
import api from "../../Config/api";
import { useNavigate } from "react-router-dom";

const addPujaName = async (newPujaName: any) => {
  const response = await api.post("/api/pujaname/add", newPujaName);
  return response;
};

export const useAddPujaName = () => {

  return useMutation(addPujaName, {
    onSuccess: () => {
        message.success("Puja Name added successfully!!!")
      
    },
    onError: () => {
      message.error("Puja Name addition failed !!!");
    },
  });
};
