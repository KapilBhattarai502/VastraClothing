import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/useGetProductById";

const CustomerProductDetails = () => {
  const { mutate, data, isLoading } = useGetProductById();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    mutate(id);
  }, [id]);
  console.log(data);

  return (
    <div className="mt-20 grid grid-cols-2 p-4 gap-28">
      {/* image */}
      <div>
        <img
          src={data?.data.imageUrl}
          // src="https://static.wixstatic.com/media/563de8_0f97ae028ecc464fb140f79418afedab~mv2.jpg/v1/fill/w_940,h_1201,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg"
          className="object-cover h-full w-full"
        />
      </div>
      {/* content */}
      <div>
        <h1 className="font-semibold opacity-65">{data?.data.title}</h1>
        <h1 className="font-semibold opacity-65 mt-2">
          Brand:{data?.data.brand}
        </h1>

        <p className=" font-light opacity-80">{data?.data.description}</p>

        <p className=" mt-4 font-light opacity-80">Fabric:100% cotton</p>
        <p className=" font-light opacity-80">Fit:Body fit</p>
        <p className=" font-light opacity-80">Made in Nepal</p>
        <p className=" font-light opacity-80">
          Wash Care: wash with Cold water & gentle wash
        </p>
        <p className=" opacity-80 mt-10 font-bold">
          Rs {data?.data.discountedPrice}
        </p>
        <p className="font-thin line-through">Rs {data?.data.price}</p>

        <button
          className="font-thin  mt-10 border border-slate-500 py-2 px-20 hover:bg-slate-950 hover:text-white"
          //    onClick={addToCart}
        >
          ADD TO CART
        </button>

        <br />
        <div className="mt-2">
          <div>
            <label htmlFor="cars">Size:</label>
            <select
              name="cars"
              id="cars"
              className="px-10 py-2 opacity-60 text-sm font-light"
              // onChange={(e)=>{dispatch({type:'selectsize',payload:e.target.value})}}
              required
            >
              <option className=" opacity-60 text-sm font-light">
                Select Size
              </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            <div className="flex gap-7 mt-2">
              <p>Colors:</p>
              <span className="opacity-60 text-sm items-center">
                {data?.data.color}
              </span>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <p>Quantity:</p>
              {/* <div className="flex gap-2 items-center">

              <button disabled={state.quantity===1}  onClick={()=>{dispatch({type:'decreaseQuantity'})}}><RemoveCircleIcon sx={state.quantity===1?{color:"#bbb7b6"}:null}/></button>
              <span className="opacity-60 text-sm">{state.quantity}</span>
              <button  onClick={()=>{dispatch({type:'increaseQuantity'})}}><AddCircleIcon /></button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProductDetails;
