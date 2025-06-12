import  { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/Get/useGetProductById";
import { Button } from "antd";



const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize,setSelectedSize]=useState("")
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const navigate=useNavigate()

  const handleColorClick = (colorInfo: any) => {
    setSelectedColor(colorInfo?.color);
    console.log("color is ", colorInfo);
    setSelectedImageUrl(colorInfo?.imageUrl);
  };

  useEffect(()=>{
    if(data){
      setSelectedColor(data?.data?.availableColors[0])
      setSelectedSize(data?.data.availableSizes[0])
    }
  },[data])

  useEffect(() => {
    if(selectedColor){
      const currentSelectedUrl = data?.data?.imageUrlColors.filter(
        (colorInfo: any) => colorInfo?.color === selectedColor
      );
      currentSelectedUrl?.map((colorInfo: any) => {
        setSelectedImageUrl(colorInfo?.imageUrl);
      });
    }
   
  }, [selectedColor, data]);


 
  return (
    <div className=" grid grid-cols-2 p-4 gap-28">
      {/* image */}
      <div>
        <img
          src={data?.data?.availableColors.length < 1 ? data?.data?.imageUrl:selectedImageUrl}
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
        {data?.data.availableColors.length > 0 && (
                <div className="flex gap-7 mt-2">
                  <p className=" font-semibold   opacity-65">Available Colors:</p>
                  <div className="flex gap-2 items-center cursor-pointer ">
                    {data?.data?.availableColors &&
                      data?.data?.imageUrlColors?.map((color: any,colorIndex:any) => (
                        <div key={colorIndex} className=" flex flex-col gap-2">
                          <span className="capitalize">{color?.color}</span>
                          <div
                            className="max-w-10 border-2 "
                            style={{
                              borderColor:
                                selectedColor === color?.color ? "#1677ff" : "",
                            }}
                            onClick={() => handleColorClick(color)}
                          >
                            <img
                              src={color?.imageUrl}
                              className="object-cover max-w-full max-h-full"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
               {data?.data.availableSizes.length > 0 && (
                <div className="flex gap-7 mt-2">
                  <p className="font-semibold opacity-65">Available Sizes:</p>
                  <div className="flex gap-2 items-center cursor-pointer ">
                    {data?.data?.availableSizes &&
                      data?.data?.availableSizes?.map((size: any) => (
                        <Button
                          style={{
                            borderColor: selectedSize === size ? "#1677ff" : "",
                          }}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                  </div>
                </div>
              )}

        <p className=" mt-4 font-light opacity-80">Fabric:100% cotton</p>
        <p className=" font-light opacity-80">Fit:Body fit</p>
        <p className=" font-light opacity-80">Made in Nepal</p>
        <p className=" font-light opacity-80">
          Wash Care: wash with Cold water & gentle wash
        </p>
        <p className=" opacity-80 mt-10 font-bold">
          Rs {data?.data?.size_based_pricing
                  ? data?.data?.size_price?.reduce((sum, sizePriceInfo) => {
                      if (sizePriceInfo?.size === selectedSize) {
                        return sum + Number(sizePriceInfo?.price);
                      }
                      return sum;
                    }, 0)
                  : data?.data?.price}
        </p>
       
        

        <br />
        {/* <div className="mt-2">
          <div>
            <p>Available Sizes</p>
            <div className="flex gap-4 mt-4 items-center">
              <p>Small:</p>
              <p>{data?.data?.sizes[0]?.quantity}</p>
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
        </div> */}
        <div className="mt-4">
        <Button type="primary" onClick={()=>navigate(`/admin/edit/${id}`)}>Edit</Button>
        </div>
     
      </div>
    </div>
  );
};

export default ProductDetails;
