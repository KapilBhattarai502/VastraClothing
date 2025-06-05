import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { FormValues } from "../types/types";
import { useProductPost } from "../hooks/Post/useProductPost";
import { Breadcrumb } from "antd";
import { useGetUnit } from "../hooks/Get/useGetUnit";
import { useGetPujaName } from "../hooks/Get/useGetPujaName";
import { useGetPujaType } from "../hooks/Get/useGetPujaType";
import { useGetPujaSubType } from "../hooks/Get/useGetPujaSubType";

const animatedComponents = makeAnimated();

const CreateProduct = () => {
  const { mutate } = useProductPost();
 const {data:unitOptions} =useGetUnit()
 const {data:pujaNameOptions}=useGetPujaName()
 const {data:pujaTypeOptions}=useGetPujaType()
 const {data:pujaSubTypeOptions}=useGetPujaSubType()
 
  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "16px" }}
        items={[{ title: "Vaidik" }, { title: "Create Product" }]}
      />
      <Formik<FormValues>
        initialValues={{
          brand: "",
          title: "",
          imageUrl: "",
          color: "",
          unit: "",
          price: 0,
          discountedPercent: 0,
          discountedPrice: 0,
          description: "",
          quantity: 0,
          pujaName: [],
          puja_quantity: 0,
          sizes: [
            { name: "S", quantity: 0 },
            { name: "M", quantity: 0 },
            { name: "L", quantity: 0 },
          ],
        }}
        validationSchema={Yup.object({
          brand: Yup.string(),
          title: Yup.string().required("Title is required"),
          puja_quantity: Yup.number(),
          imageUrl: Yup.string().url().required("Image URL is required"),
          color: Yup.string(),

          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
          unit: Yup.string().required("Unit is required"),
          discountedPercent: Yup.number()
            .min(0, "Discount percentage cannot be less than 0")
            .max(100, "Discount percentage cannot exceed 100"),

          quantity: Yup.number()
            .required("Quantity is required")
            .min(0, "Quantity cannot be negative"),
          description: Yup.string().required("Description is required"),
          sizes: Yup.array().of(
            Yup.object({
              name: Yup.string().required("Size name is required"),
              quantity: Yup.number()
                .required("Quantity is required")
                .min(0, "Quantity cannot be negative"),
            })
          ),
          pujaName: Yup.array()
            .of(
              Yup.object().shape({
                label: Yup.string().required("Label is required"),
                value: Yup.string().required("Value is required"),
              })
            )
            .min(1, "At least one puja must be selected")
            .required("Puja Name is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // mutate(values);
          // setSubmitting(false);
        }}
      >
        {({ touched, errors, values, getFieldProps,setFieldValue }) => (
          <Form className="w-full mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block mb-2 font-semibold text-gray-700"
              >
                Brand
              </label>
              <Field
                name="brand"
                type="text"
                className={`w-full p-2 border rounded-md ${
                  touched.brand && errors.brand
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2 font-semibold text-gray-700"
              >
                Title
              </label>
              <Field
                name="title"
                type="text"
                className={`w-full p-2 border rounded-md ${
                  touched.title && errors.title
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-700"
              >
                ImageUrl
              </label>
              <Field
                name="imageUrl"
                type="text"
                className={`w-full p-2 border rounded-md ${
                  touched.imageUrl && errors.imageUrl
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block mb-2 font-semibold text-gray-700"
              >
              Type
              </label>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={pujaTypeOptions}
                onChange={(value)=>{setFieldValue("unit",value)}}
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block mb-2 font-semibold text-gray-700"
              >
              Sub Type
              </label>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={pujaSubTypeOptions}
                onChange={(value)=>{setFieldValue("unit",value)}}
              />
              <ErrorMessage
                name="sub-type"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="color"
                className="block mb-2 font-semibold text-gray-700"
              >
                Used For
              </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={pujaNameOptions}
                onChange={(value)=>{setFieldValue("pujaName",value)}}
              />
              <ErrorMessage
                name="pujaName"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="color"
                className="block mb-2 font-semibold text-gray-700"
              >
                Unit
              </label>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={unitOptions}
                onChange={(value)=>{setFieldValue("unit",value)}}
              />
              <ErrorMessage
                name="unit"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="color"
                className="block mb-2 font-semibold text-gray-700"
              >
                Color
              </label>
              <Field
                name="color"
                type="text"
                className={`w-full p-2 border rounded-md ${
                  touched.color && errors.color
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="color"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block mb-2 font-semibold text-gray-700"
              >
                Price
              </label>
              <Field
                name="price"
                type="number"
                className={`w-full p-2 border rounded-md ${
                  touched.price && errors.price
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="discountedPercent"
                className="block mb-2 font-semibold text-gray-700"
              >
                Discount Percentage
              </label>
              <Field
                name="discountedPercent"
                type="number"
                className={`w-full p-2 border rounded-md ${
                  touched.discountedPercent && errors.discountedPercent
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="discountedPrice"
                className="block mb-2 font-semibold text-gray-700"
              >
                Discounted Price
              </label>
              <Field
                name="discountedPrice"
                type="number"
                className={`w-full p-2 border rounded-md ${
                  touched.discountedPrice && errors.discountedPrice
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {values.sizes.map((size, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`sizes[${index}].name`}
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Size {size.name}
                </label>
                <div className="flex gap-4">
                  <input
                    id={`sizes[${index}].name`}
                    type="text"
                    value={size.name}
                    readOnly
                    className="w-full p-2 mb-3 border rounded-md bg-gray-100"
                  />
                  <input
                    id={`sizes[${index}].quantity`}
                    type="number"
                    {...getFieldProps(`sizes[${index}].quantity`)}
                    className={`w-full p-2 mb-3 border rounded-md`}
                  />
                </div>
                <ErrorMessage
                  name={`sizes[${index}].quantity`}
                  component="div"
                  className="text-red-500 text-sm mb-3"
                />
              </div>
            ))}

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block mb-2 font-semibold text-gray-700"
              >
                Quantity
              </label>
              <Field
                name="quantity"
                type="number"
                className={`w-full p-2 border rounded-md ${
                  touched.quantity && errors.quantity
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="puja_quantity"
                className="block mb-2 font-semibold text-gray-700"
              >
                Default Product Quantity used For the puja
              </label>
              <Field
                name="puja_quantity"
                type="number"
                className={`w-full p-2 border rounded-md ${
                  touched.puja_quantity && errors.puja_quantity
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 font-semibold text-gray-700"
              >
                Description
              </label>
              <Field
                name="description"
                type="text"
                className={`w-full p-2 border rounded-md ${
                  touched.description && errors.description
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProduct;
