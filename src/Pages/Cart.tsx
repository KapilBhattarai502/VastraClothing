import React, { useEffect } from 'react'
import { useGetUserCart } from '../hooks/useGetUserCart'
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {

   const {isLoading,data} =useGetUserCart()
   
   useEffect(()=>{},[])
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
            data?.data.cartItems.map((item) => (
              <div key={item._id} className=" h-[200px] shadow-lg  px-4 mb-6">
                <div className="flex gap-4 justify-between">
                  <div className="h-[140px] w-[110px]">
                    <img
                      src={item.product.imageUrl}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex items-center gap-10">
                    <div>
                      <h1 className=" opacity-75 font-semibold">
                        {item.title}
                      </h1>
                      <h3 className="line-through font-thin">
                        Rs {item.price}{" "}
                      </h3>
                      <h2>Rs {item.discountedPrice}</h2>
                      <p className=" font-light">color:{item.color}</p>
                      <p>size:{item.size}</p>
                    </div>
                    <div className="flex gap-2 border border-slate-500 px-2">
                      <button
                        // onClick={() => {
                        //   CartFunction({
                        //     type: "REMOVEFROMCART",
                        //     payload: { ...item },
                        //   });
                        // }}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <p className="mx-4">{item.quantity}</p>

                      <button
                        // onClick={() => {
                        //   CartFunction({
                        //     type: "ADDTOCART",
                        //     payload: { ...item, selectedQuantity: 1 },
                        //   });
                        // }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div></div>
                  <div>
                    <DeleteIcon
                    //   onClick={() => {
                    //     CartFunction({
                    //       type: "DELETECARTITEM",
                    //       payload: { ...item },
                    //     });
                    //   }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <p className="mt-6 opacity-75 font-semibold">
                    Total Price: {item.quantity * item.discountedPrice}
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
        <div className="basis-96 mr-10 shadow-xl px-5 py-4 h-[340px] rounded-md">
          <h1 className="mb-3 font-bold opacity-75 text-xl">Order summary</h1>
          <hr />
          <div className="flex justify-between items-center my-4">
            <p>Subtotal</p>
            <p>Rs {data?.data.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center my-4">
            <p>Discounted Price</p>
            <p>Rs {data?.data.totalDiscountedPrice}</p>
          </div>
          <div className="flex justify-between items-center my-4">
            <p>Delivery Charge</p>
            <p>0.00</p>
          </div>
          <hr />
          <div className="flex justify-between items-center my-4">
            <p>Total</p>
            <p>Rs {data?.data.discounts}</p>
          </div>
          <hr />
          <button className="w-full text-center bg-slate-900 text-white py-2 mt-8">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

//   const [state, dispatch] = useReducer(handleQuantity, initialState);

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// interface QuantityState {
//   quantity: number;
// }

// interface QuantityAction {
//   type: "increasequantity" | "decreasequantity";
// }

// const initialState: QuantityState = {
//   quantity: 1,
// };

// function handleQuantity(state: QuantityState, action: QuantityAction): QuantityState {
//   switch (action.type) {
//     case "increasequantity":
//       return { ...state, quantity: state.quantity + 1 };
//     case "decreasequantity":
//       return { ...state, quantity: state.quantity - 1 };
//     default:
//       return state;
//   }
// }

{/* <button
                  disabled={state.quantity === 1}
                  onClick={() => {
                    dispatch({ type: "decreasequantity" });
                  }}
                >
                  <RemoveCircleIcon
                    sx={state.quantity === 1 ? { color: "#bbb7b6" } : null}
                  /> */}
                {/* </button> */}



                {/* <button
                  onClick={() => {
                    dispatch({ type: "increasequantity" });
                  }}
                >
                  <AddCircleIcon /> */}
                {/* </button> */}