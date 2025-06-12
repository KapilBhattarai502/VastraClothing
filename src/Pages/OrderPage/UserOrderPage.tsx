import React from "react";
import { useGetUserOrder } from "../../hooks/Get/useGetUserOrder";
import moment from "moment"
import {
  InnerOuletWrapper,
  OutletWrapper,
} from "../../components/commonStyle/wrapper/OutletWrapper";
import { Input } from "antd";
import type { GetProps } from "antd";
import { OrderStatusBadge } from "../../AdminPages/OrderPage/components/OrderStatusBadge";

type SearchProps = GetProps<typeof Input.Search>;
const UserOrderPage = () => {
  const { data } = useGetUserOrder();
  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <OutletWrapper>
        <div className=" text-center font-semibold ">
          <p className="">My Orders</p>
        </div>
        <InnerOuletWrapper>
          <div>
            <Search
              placeholder="Search here"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>

          {data?.length > 0 ? (
            data?.map((userOrderInfo: any) => (

              <div key={userOrderInfo?._id}>
                <div className="shadow-lg px-6 py-3 rounded-md overflow-y-auto mb-4 bg-white mt-4">
                  <div className="flex justify-between cursor-pointer items-center">
                    <p>Your Orders and Shipping Address of  {moment(userOrderInfo?.orderDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <div className="flex gap-2 text-sm items-center">
                      <p>Order Status:</p>
                     <OrderStatusBadge status={userOrderInfo?.orderStatus}/>
                    </div>
                  </div>
                </div>
                <div className="shadow-lg px-6 py-3 rounded-md overflow-y-auto mb-4 bg-white mt-4">
                  <div className="flex justify-between cursor-pointer">
                    <p>Shipping address</p>
                  </div>
                  <div className="mt-2">
                    <div className="border px-1 py-1 mb-4">
                      <div  className=" mb-4 pt-2 pb-6 px-2">
                        <div className="flex gap-3">
                          <p>{userOrderInfo?.address?.firstName} </p>
                          <p>{userOrderInfo?.address?.lastName}</p>
                          <p>{userOrderInfo?.address?.phoneNumber}</p>
                        </div>
                        <div className="flex gap-3 mt-1">
                          <span className=" bg-orange-400 px-2 rounded-lg ">
                            Home
                          </span>
                          <p>
                            {userOrderInfo?.address?.streetAddress},{userOrderInfo?.address?.city},
                            {userOrderInfo?.address?.state},{userOrderInfo?.address?.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className=" bg-green-500 p-2 rounded-md text-white">Your Order will be deliverd within {userOrderInfo?.orderDate ? `${new Date(userOrderInfo.orderDate).toLocaleString('en-US', { day: 'numeric', month: 'short' })} - ${new Date(new Date(userOrderInfo.orderDate).setDate(new Date(userOrderInfo.orderDate).getDate() + 2)).toLocaleString('en-US', { day: 'numeric', month: 'short' })}` :""} </p>
                    </div>
                  </div>
                </div>
                {userOrderInfo?.orderItems.map((userOrder: any) => (
                  <div key={userOrder?._id} className="mt-2 bg-white py-2 px-4">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">1-3 days Delivery</p>
                      <p>Ordered</p>
                    </div>
                    <hr />
                    <div className="mt-2 grid grid-cols-12 items-center">
                      <div className="flex gap-2 items-center col-span-5">
                        <div className="max-w-20">
                          <img
                            className=" object-cover"
                            src={userOrder?.product?.include_color ? userOrder?.product?.imageUrlColors?.find((colorInfo)=>colorInfo?.color===userOrder?.color)?.imageUrl:userOrder?.product?.imageUrl}
                            alt="your order"
                          />
                        </div>

                        <p>{userOrder?.product?.title}</p>
                      </div>

                      <p>Rs.{userOrder?.product?.size_based_pricing ? userOrder?.product?.size_price.find((sizeInfo:any)=>sizeInfo?.size===userOrder?.size)?.price:userOrder?.product?.price}</p>
                      <p>Qty:{userOrder?.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="h-screen flex justify-center items-center">
              <span className=" text-red-500">You dont have any order!!!!</span>
            </div>
          )}
        </InnerOuletWrapper>
      </OutletWrapper>
    </div>
  );
};

export default UserOrderPage;
