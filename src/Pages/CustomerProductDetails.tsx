import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetProductById } from "../hooks/useGetProductById";
import { useAddCart } from "../hooks/useAddCart";
import { Formik } from "formik";
import { InitialproductDetailsSize } from "../components/constants/initialValues";
import { productDetailsvalidationSchema } from "../components/constants/validationSchema";
import Select from "../components/select/select";

const CustomerProductDetails = () => {
 const sizeOptions=[
  {label:'Small',value:'S'},
  {label:'Medium',value:'M'},
  {label:'Large',value:'L'}
 ]
  const { mutate, data } = useGetProductById();
  const { id } = useParams();
  const { mutate: addToCart } = useAddCart();
  useEffect(() => {
    window.scrollTo(0, 0);
    mutate(id);
  }, [id]);



  // const handleAddToCart = () => {
  
  // };

  return (
    <Formik initialValues={InitialproductDetailsSize} validationSchema={productDetailsvalidationSchema} 
     onSubmit={(values, { setSubmitting }) => {
      addToCart({ productId: id, ...values });
        setSubmitting(false);
   
    }}
    >
      {({handleSubmit,setFieldValue,errors})=>
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
 
         <button
           className="font-thin mt-10 border border-slate-500 py-2 px-20 hover:bg-slate-950 hover:text-white"
           type="submit"
           onClick={handleSubmit}
         >
           ADD TO CART
         </button>
 
         <br />
         <div className="mt-2">
           <div>
            <Select name='size' label="Select Size" setFieldValue={setFieldValue} errorValue={errors.size} options={sizeOptions} className=" max-w-[200px]" />
 
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
     </div>}
   
    </Formik>
  );
};

export default CustomerProductDetails;
