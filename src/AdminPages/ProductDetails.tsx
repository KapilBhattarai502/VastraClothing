import  { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/Get/useGetProductById";



const ProductDetails = () => {
  const { mutate, data, isLoading } = useGetProductById();
  const { id } = useParams();
  useEffect(() => {
    mutate(id);
  }, [id]);
  console.log(data);

 
  return (
    <div className=" grid grid-cols-2 p-4 gap-28">
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

        <br />
        <div className="mt-2">
          <div>
            <p>Available Sizes</p>
            <div className="flex gap-4 mt-4 items-center">
              <p>Small:</p>
              <p>{data?.data.sizes[0].quantity}</p>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <p>Medium:</p>
              <p>{data?.data.sizes[1].quantity}</p>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <p>Large:</p>
              <p>{data?.data.sizes[2].quantity}</p>
            </div>

            <div className="flex gap-4 mt-4 items-center">
              <p>Quantity:</p>
              <p>{data?.data.quantity}</p>
            </div>

            <div className="flex gap-7 mt-4">
              <p>Colors:</p>
              <span className="opacity-60 text-sm items-center">
                {data?.data.color}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
