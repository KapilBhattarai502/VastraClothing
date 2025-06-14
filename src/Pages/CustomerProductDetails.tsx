import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/Get/useGetProductById";
import { useAddCart } from "../hooks/Post/useAddCart";
import { Formik } from "formik";
import { InitialproductDetailsSize } from "../components/constants/initialValues";
import { Button, message } from "antd";

const CustomerProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const { data } = useGetProductById(id);
 
  const { mutate: addToCart } = useAddCart();
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [id]);

  const handleColorClick = (colorInfo: any) => {
    setSelectedColor(colorInfo?.color);
    console.log("color is ", colorInfo);
    setSelectedImageUrl(colorInfo?.imageUrl);
  };

  useEffect(() => {
    if (data?.data && !selectedColor && !selectedSize) {
      setSelectedColor(data?.data?.availableColors[0]);
      setSelectedSize(data?.data?.availableSizes[0]);

    }
    if (selectedColor) {
      const currentSelectedUrl = data?.data?.imageUrlColors.filter(
        (colorInfo: any) => colorInfo?.color === selectedColor
      );
      currentSelectedUrl?.map((colorInfo: any) => {
        setSelectedImageUrl(colorInfo?.imageUrl);
      });
    } else {
      setSelectedImageUrl(data?.data?.imageUrl);
    }

  }, [selectedColor, data?.data]);

  return (
    <Formik
      initialValues={InitialproductDetailsSize}
      onSubmit={(values, { setSubmitting }) => {
        try {
          addToCart({
            productId: id,
            size: selectedSize,
            quantity: 1,
            color: selectedColor,
          });
        } catch (error) {
          console.log("error", error);
        }

        setSubmitting(false);
      }}
    >
      {({ handleSubmit, validateForm, errors }) => {
        useEffect(() => {
          validateForm();
        }, [data, validateForm]);
        return (
          <div className="mt-20 grid grid-cols-2 p-4 gap-28">
            {/* image */}
            <div className=" max-w-[35rem]">
              <img
                src={
                  data?.data?.availableColors.length < 1
                    ? data?.data?.imageUrl
                    : selectedImageUrl
                }
                className="object-contain h-full w-full"
              />
            </div>
            {/* content */}
            <div>
              <h1 className="font-semibold opacity-65">{data?.data.title}</h1>
              <h1 className="font-semibold opacity-65 mt-2">
                Brand:{data?.data.brand}
              </h1>

              <p className="font-light opacity-80">{data?.data.description}</p>
              {data?.data.availableColors.length > 0 && (
                <div className="flex gap-7 mt-2">
                  <p>Available Colors:</p>
                  <div className="flex gap-2 items-center cursor-pointer ">
                    {data?.data?.availableColors &&
                      data?.data?.imageUrlColors?.map((color: any) => (
                        <div className=" flex flex-col gap-2">
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
                  <p>Available Sizes:</p>
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

              <p className="mt-4 font-light opacity-80">Fabric: 100% cotton</p>
              <p className="font-light opacity-80">Fit: Body fit</p>
              <p className="font-light opacity-80">Made in Nepal</p>
              <p className="font-light opacity-80">
                Wash Care: wash with Cold water & gentle wash
              </p>
              <p className="opacity-80 mt-10 font-bold">
                Rs{" "}
                {data?.data?.size_based_pricing
                  ? data?.data?.size_price?.reduce((sum, sizePriceInfo) => {
                      if (sizePriceInfo?.size === selectedSize) {
                        return sum + Number(sizePriceInfo?.price);
                      }
                      return sum;
                    }, 0)
                  : data?.data?.price}
              </p>
              <button
                className="font-thin mt-10 border border-slate-500 py-2 px-20 hover:bg-slate-950 hover:text-white"
                type="submit"
                onClick={handleSubmit}
              >
                ADD TO CART
              </button>

              <br />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default CustomerProductDetails;
