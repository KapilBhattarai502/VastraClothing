import { useMutation, useQueryClient } from "react-query";
// import { FormValues } from "../types/types"
import { message } from "antd";
import api from "../../Config/api";
import { useNavigate } from "react-router-dom";

const editProduct = async (paymentDetails: any) => {
  const response = await api.post("/api/orders", paymentDetails);
  return response;
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(editProduct, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("getUserOrder");
      navigate("/vaidik/user/orders");
    },
    onError: () => {
      message.error("Order failed !!!");
    },
  });
};
