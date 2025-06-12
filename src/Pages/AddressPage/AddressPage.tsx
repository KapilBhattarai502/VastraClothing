import { message } from "antd";
import  { useState } from "react";
import { useGetUserCart } from "../../hooks/Get/useGetUserCart";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import AddressDrawer from "./Drawer";
import { useGetAddress } from "../../hooks/Get/useGetAddress";
import { OutletWrapper } from "../../components/commonStyle/wrapper/OutletWrapper";

const AddressPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: CartItems } = useGetUserCart();
  const { data: userAddress } = useGetAddress();

  const selectedAddress = useSelector(
    (state: RootState) => state.useraddress.address
  );

  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (userAddress?.data?.userCurrentAddress) {
      if (CartItems) {
        navigate(
          `/vaidik/payment?total_amount=${CartItems?.data?.totalPrice}&product_code="EPAYTEST"`
        );

      }
    } else {
      message.warning("Please select or create your address ");
    }
  };

  return (
    <div>
      <OutletWrapper>
        <div className="flex justify-between gap-12 mt-4 mx-4 ">
          <div className="flex-1">
            <div className="shadow-lg px-6 py-3 rounded-md overflow-y-auto mb-4 bg-white">
              <div className="flex justify-between cursor-pointer">
                <p>Shipping address</p>
                <p
                  className=" text-blue-400"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add/Edit
                </p>
              </div>
              <div className="mt-2">
                {userAddress?.data?.userCurrentAddress?.map((address: any) => (
                  <div className="border px-1 py-1 mb-4">
                    <div key={address._id} className=" mb-4 pt-2 pb-6 px-2">
                      <div className="flex gap-3">
                        <p>{address.firstName} </p>
                        <p>{address?.lastName}</p>
                        <p>{address?.phoneNumber}</p>
                      </div>
                      <div className="flex gap-3 mt-1">
                        <span className=" bg-orange-400 px-2 rounded-lg ">
                          Home
                        </span>
                        <p>
                          {address.streetAddress},{address.city},
                          {address?.state},{address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow bg-white">
              {CartItems?.data.cartItems.length > 0 ? (
                CartItems?.data.cartItems.map((item: any) => (
                  <div
                    key={item._id}
                    className=" h-[200px] shadow-lg  px-4 mb-6"
                  >
                    <div className="flex gap-4 ">
                      <div className="h-[140px] w-[110px]">
                        <img
                          src={
                            item?.product?.include_color
                              ? item?.product?.imageUrlColors?.find(
                                  (colorInfo) =>
                                    colorInfo?.color === item?.color
                                )?.imageUrl
                              : item?.product?.imageUrl
                          }
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex items-center gap-10">
                        <div>
                          <h3 className="font-light">
                            Rs{" "}
                            {item?.product?.size_based_pricing
                              ? item?.product?.size_price.find(
                                  (sizeInfo: any) =>
                                    sizeInfo?.size === item?.size
                                )?.price
                              : item?.product?.price}
                          </h3>
                          <p className=" font-light">color:{item.color}</p>
                          <p>size:{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse">
                      <p className="mt-6 opacity-75 font-semibold">
                        Total Price:{" "}
                        {item.quantity *
                          (item?.product?.size_based_pricing
                            ? item?.product?.size_price.find(
                                (sizeInfo: any) => sizeInfo?.size === item?.size
                              )?.price
                            : item?.product?.price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-10 text-red-500">
                  Your Cart Is Empty!!!
                </p>
              )}
            </div>
          </div>
          <div className="basis-96 mr-10 shadow-xl px-5 py-4 h-[340px] rounded-md bg-white">
            <h1 className="mb-3 font-bold opacity-75 text-xl">Order summary</h1>
            <hr />
            <div className="flex justify-between items-center my-4">
              <p>Subtotal</p>
              <p>Rs {CartItems?.data.totalPrice}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p>Discounted Price</p>
              <p>Rs {CartItems?.data.discounts}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p>Delivery Charge</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4">
              <p>Total</p>
              <p>Rs {CartItems?.data.totalPrice}</p>
            </div>
            <hr />
            <button
              className="w-full text-center bg-slate-900 text-white py-2 mt-8"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </OutletWrapper>
      <AddressDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddressPage;
