import React, { useEffect } from 'react'
import { useGetUserCart } from '../hooks/Get/useGetUserCart'
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCartItem } from '../hooks/Delete/useDeleteCartItem';
import { useUpdateCartItem } from '../hooks/Post/useUpdateCartItem';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Cart = () => {
  const navigate=useNavigate()

   const {data} =useGetUserCart()
   const {mutate:deleteCartItem}=useDeleteCartItem()
   const {mutate:updateCart,isLoading:updatingCartItem}=useUpdateCartItem()
  
   
   useEffect(()=>{
    window.scrollTo(0,0);
   },[])

   const updateCartItem=(cartItemId:string,currentquantity:number)=>{
    updateCart({cartItemId,quantity:currentquantity+1})
  

   }
   const decreaseCartItem=(cartItemId:string,currentquantity:number)=>{
    updateCart({cartItemId,quantity:currentquantity-1})
  

   }
   const handleCheckout=()=>{
    if(data?.data.cartItems.length > 0 ){
      {navigate("/vaidik/address")}
    
   }
   else {
    message.warning("Please select some items to checkout")
    navigate("/vaidik/store")
   }
  }
  return (
    <div className="mt-20">
      <div className="h-[400px] bg-slate-600 flex  items-center justify-center ">
        <div>
          <h1 className="text-center text-white text-xl font-bold">My Cart</h1>
          <p className=" text-white opacity-70 mt-4">
            Review your items,adjust quantities and proceed to checkout on our
            cart page
          </p>
        </div>
      </div>
      <div className="flex justify-between max-w-[1200px] mx-auto mt-20 gap-12 ">
        <div className="flex-grow">
          {data?.data.cartItems.length > 0 ? (
            data?.data.cartItems.map((item:any) => (
              <div key={item._id} className=" h-[200px] shadow-lg  px-4 mb-6">
                <div className="flex gap-4 justify-between">
                  <div className="h-[140px] w-[110px]">
                    <img
                      src={item?.product?.include_color ? item?.product?.imageUrlColors?.find((colorInfo)=>colorInfo?.color===item?.color)?.imageUrl:item?.product?.imageUrl}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex items-center gap-10">
                    <div>
                      <h1 className=" opacity-75 font-semibold">
                        {item?.product?.title}
                      </h1>
                      <h3 className="font-light">
                        Rs {item?.product?.size_based_pricing ? item?.product?.size_price.find((sizeInfo:any)=>sizeInfo?.size===item?.size)?.price:item?.product?.price}
                      </h3>
                      <p className="font-light"> {item?.color ? <p>Color:{item?.color}</p> : ""} </p>
                      {item.size ? <p>size:{item.size}</p> : ""} 
                    </div>
                    <div className="flex gap-2 border border-slate-500 px-2">
                      <button
                        onClick={() => {
                          decreaseCartItem(item._id,item.quantity)
        
                        }}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <p className="mx-4">{item.quantity}</p>

                      <button
                      
                      onClick={()=>{updateCartItem(item._id,item.quantity)}}
                      disabled={updatingCartItem}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div></div>
                  <div>
                    <DeleteIcon
                      onClick={() => {
                       deleteCartItem(item._id)
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <p className="mt-6 opacity-75 font-semibold">
                    Total Price: {item.quantity * (item?.product?.size_based_pricing ? item?.product?.size_price.find((sizeInfo:any)=>sizeInfo?.size===item?.size)?.price:item?.product?.price)}
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
        <div className="basis-96 mr-10 shadow-xl px-5 py-4 h-[340px] rounded-md mb-20">
          <h1 className="mb-3 font-bold opacity-75 text-xl">Order summary</h1>
          <hr />
          <div className="flex justify-between items-center my-4">
            <p>Subtotal</p>
            <p>Rs {data?.data.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center my-4">
            <p>Discounted Price</p>
            <p>Rs {data?.data.discounts}</p>
          </div>
         
          <hr />
          <div className="flex justify-between items-center my-4">
            <p>Total</p>
            <p>Rs {data?.data.totalPrice}</p>
          </div>
          <hr />
          <button className="w-full text-center bg-slate-900 text-white py-2 mt-8" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart