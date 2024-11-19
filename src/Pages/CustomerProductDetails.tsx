import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductById } from "../hooks/useGetProductById";
import { useAddCart } from "../hooks/useAddCart";

const CustomerProductDetails = () => {
  const [size, setSize] = useState("M");
  const { mutate, data, isLoading } = useGetProductById();
  const { id } = useParams();
  const {mutate:addToCart}=useAddCart()
  useEffect(() => {
    window.scrollTo(0, 0);
    mutate(id);
  }, [id]);

  console.log(size);

  const handleAddToCart=()=>{
    addToCart({productId:id,size})

  }

  return (
    <div className="mt-20 grid grid-cols-2 p-4 gap-28">
      {/* image */}
      <div>
        <img src={data?.data.imageUrl} className="object-cover h-full w-full" />
      </div>
      {/* content */}
      <div>
        <h1 className="font-semibold opacity-65">{data?.data.title}</h1>
        <h1 className="font-semibold opacity-65 mt-2">
          Brand:{data?.data.brand}
        </h1>

        <p className="font-light opacity-80">{data?.data.description}</p>

        <p className="mt-4 font-light opacity-80">Fabric: 100% cotton</p>
        <p className="font-light opacity-80">Fit: Body fit</p>
        <p className="font-light opacity-80">Made in Nepal</p>
        <p className="font-light opacity-80">
          Wash Care: wash with Cold water & gentle wash
        </p>
        <p className="opacity-80 mt-10 font-bold">
          Rs {data?.data.discountedPrice}
        </p>
        <p className="font-thin line-through">Rs {data?.data.price}</p>

        <button className="font-thin mt-10 border border-slate-500 py-2 px-20 hover:bg-slate-950 hover:text-white" onClick={handleAddToCart}>
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
              onChange={(e) => {
                setSize(e.target.value);
              }}
              required
            >
              <option className=" opacity-60 text-sm font-light">
                Select Size
              </option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>

            <div className="flex gap-7 mt-2">
              <p>Colors:</p>
              <span className="opacity-60 text-sm items-center">
                {data?.data.color}
              </span>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <p>Quantity:</p>
              <div className="flex gap-2 items-center">
                <span className="opacity-60 text-sm">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProductDetails;
