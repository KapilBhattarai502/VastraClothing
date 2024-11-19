import React from 'react'

const Cart = () => {
  return (
    <div>Cart</div>
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