import { Formik, Field, Form, ErrorMessage, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FormValues } from "../types/types";
import { Breadcrumb, message } from "antd";
import { useGetUnit } from "../hooks/Get/useGetUnit";
import { useGetPujaName } from "../hooks/Get/useGetPujaName";
import { useGetPujaType } from "../hooks/Get/useGetPujaType";
import { useGetPujaSubType } from "../hooks/Get/useGetPujaSubType";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useGetProductSizes } from "../hooks/Get/useGetProductSize";
import { useGetProductColors } from "../hooks/Get/useGetProductColor";
import { useUpdateProductDetails } from "../hooks/Put/useUpdateProductDetails";
import { useGetProductById } from "../hooks/Get/useGetProductById";
import { Spin } from 'antd';

const animatedComponents = makeAnimated();

const close = () => {
};

const EditProduct = () => {
  const [submitting,setSubmitting]=useState(false)
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const { data: unitOptions } = useGetUnit();
  const { data: pujaNameOptions } = useGetPujaName();
  const { data: pujaTypeOptions } = useGetPujaType();
  const { data: pujaSubTypeOptions } = useGetPujaSubType();
  const { data: sizeOptions } = useGetProductSizes();
  const { data: colorOptions } = useGetProductColors();
  const { data: product,isLoading } = useGetProductById(id);
  const {mutate:updateProductDetails}=useUpdateProductDetails()
  
  const SetColorValue = ({ name, value }: any) => {
    const { setFieldValue } = useFormikContext();
    useEffect(() => {
      setFieldValue(name, value);
    }, [name, value, setFieldValue]);

    return null;
  };
  const openNotification = (description: string) => {
    api.open({
      message: "Warning",
      description: description,
      showProgress: true,
      style: {
        backgroundColor: "#fff", // Example blue color
        color: "white",
      },
      icon: <WarningOutlined style={{ color: "#d19b13" }} />,
      onClose: close,
    });
  };
  if(isLoading){
  <Spin/>
  }

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "16px" }}
        items={[{ title: "Vaidik" }, { title: "Update Product" }]}
      />
      <Formik<FormValues>
        enableReinitialize={true}
        initialValues={{
          brand: product?.data?.brand || "",
          title: product?.data?.title||"",
          imageUrl: product?.data?.imageUrl || "",
          unit: product?.data?.unit||null,
          price: product?.data?.price || "",
          type: product?.data?.type||null,
          sub_type: product?.data?.sub_type||null,
          description: product?.data?.description || "",
          quantity: product?.data?.quantity||null,
          pujaName:product?.data?.pujaName||  [],
          availableSizes: product?.data?.availableSizes||[],
          pujaQuantities:product?.data?.pujaQuantities||{},
          availableColors: product?.data?.availableColors||[],
          include_color:product?.data?.include_color || false,
          quantitySizeAndColors: product?.data?.quantitySizeAndColors||[],
          size_based_pricing: product?.data?.size_based_pricing || false,
          size_price: product?.data?.size_price||[],
          quantitySizes: product?.data?.quantitySizes||[],
          include_size: product?.data?.include_size || false,
          quantityColors: product?.data?.quantityColors||[],
          imageUrlColors: product?.data?.imageUrlColors||[],
        }}
        validationSchema={Yup.object({
          brand: Yup.string(),
          title: Yup.string().required("Title is required"),
          puja_quantity: Yup.number(),
          imageUrl: Yup.string().url(),
          size_based_pricing: Yup.boolean(),
          color: Yup.string(),
          type: Yup.object().required("Type is required"),
          unit: Yup.object().required("Unit is required"),
          quantity: Yup.number()
            .required("Quantity is required")
            .min(1, "Quantity must be greater than zero"),
          description: Yup.string().required("Description is required"),
          sizes: Yup.array().of(
            Yup.object({
              name: Yup.string().required("Size name is required"),
              quantity: Yup.number()
                .required("Quantity is required")
                .min(0, "Quantity cannot be negative"),
            })
          ),
          pujaName: Yup.array().of(
            Yup.object().shape({
              label: Yup.string().required("Label is required"),
              value: Yup.string().required("Value is required"),
            })
          ),
          price: Yup.number().when("size_based_pricing", {
            is: false,
            then: (schema) =>
              schema
                .required(
                  "Price is required when size-based pricing is disabled"
                )
                .moreThan(0, "Price must be greater than zero"),
            otherwise: (schema) =>
              schema
                .notRequired()
                .nullable()
                .transform((value, originalValue) =>
                  originalValue === "" ? null : value
                ),
          }),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log("values", values);
          setSubmitting(true);
          if (
            values?.include_size &&
            values?.include_color &&
            values?.availableColors?.length < 1 &&
            values?.availableSizes?.length < 1
          ) {
            const description = "Please Select the sizes and colors";
            openNotification(description);
            setSubmitting(false);
            return;
          }

          if (values?.include_size && values?.availableSizes?.length < 1) {
            const description = "Please Select the Sizes";
            openNotification(description);
            setSubmitting(false);
            return;
          }
          if (values?.include_color && values?.availableColors?.length < 1) {
            const description = "Please Select the Colors";
            openNotification(description);
            setSubmitting(false);
            return;
          }

          try {

            updateProductDetails({productId:id,obj:values});
            resetForm();
            setSubmitting(false);
          } catch (error) {
            message.error("Product Creation Failed");
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, values, setFieldValue }) => {
          console.log("errors", errors);
          const totalQuantity = useMemo(() => {
            if (values.include_size && values.include_color) {
              return values.quantitySizeAndColors.reduce((acc, sizeObj) => {
                const sizeKey = Object.keys(sizeObj)[0];
                if (!values.availableSizes.includes(sizeKey)) return acc;
                return (
                  acc +
                  sizeObj[sizeKey].reduce(
                    (sum: any, item: any) => sum + Number(item.quantity),
                    0
                  )
                );
              }, 0);
            } else if (values.include_size) {
              return values.quantitySizes.reduce(
                (sum, sizeInfo) => sum + Number(sizeInfo?.quantity || 0),
                0
              );
            } else if (values.include_color) {
              return values.quantityColors.reduce(
                (sum, colorInfo) => sum + Number(colorInfo?.quantity || 0),
                0
              );
            }
            return Number(values.quantity || 0);
          }, [
            values.include_size,
            values.include_color,
            values.quantitySizeAndColors,
            values.quantitySizes,
            values.quantityColors,
            values.availableSizes,
            values.quantity,
          ]);

          // Set total quantity only when it changes
          useEffect(() => {
            setFieldValue("quantity", totalQuantity);
          }, [totalQuantity, setFieldValue]);

          // Clear sizes/colors when inclusion is disabled
          useEffect(() => {
            if (values?.include_size && !values?.include_color) {
              setFieldValue("quantityColors", []);
              setFieldValue("quantitySizeAndColors", []);
              setFieldValue("availableColors", []);
              setFieldValue("imageUrlColors", []);
            }
            if (!values?.include_size && values?.include_color) {
              setFieldValue("quantitySizes", []);
              setFieldValue("quantitySizeAndColors", []);
              setFieldValue("availableSizes", []);
              setFieldValue("imageUrl", "");
            }
            if (values?.include_size && values?.include_color) {
              setFieldValue("quantityColors", []);
              setFieldValue("quantitySizes", []);
              setFieldValue("imageUrl", "");
            }
          }, [
            values.include_size,
            values.include_color,
            values.availableSizes.length, // Use length instead of array
            values.availableColors.length, // Use length instead of array
            setFieldValue,
          ]);

          return (
            <Form className="w-full mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
              <>{contextHolder}</>
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
              <div className="mb-4  flex items-center gap-2 ">
                <Field
                  name="include_size"
                  type="checkbox"
                  className={`${
                    touched.include_size && errors.include_size
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                />
                <label
                  htmlFor="include_size"
                  className="block  font-semibold text-gray-700"
                >
                  Include the full selection of sizes.
                </label>

                <ErrorMessage
                  name="include_size"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <hr />

              {/* Email */}

              {values?.include_size && (
                <div className="mb-4 mt-4">
                  <p className="block font-semibold text-gray-700">
                    Available Sizes
                  </p>
                  {sizeOptions?.map((size: any,sizeIndex:any) => (
                    <div key={sizeIndex} className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="availableSizes"
                        value={size}
                        className={`${
                          touched.title && errors.title
                            ? "border-red-500"
                            : "border-green-500"
                        }`}
                      />
                      <label key={size}>{size}</label>
                    </div>
                  ))}
                  <ErrorMessage name="availableSizes" component="div" />
                </div>
              )}
              <hr />
              <div className="mb-4  flex items-center gap-2 ">
                <Field
                  name="size_based_pricing"
                  type="checkbox"
                  className={`${
                    touched.size_based_pricing && errors.size_based_pricing
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                  disabled={values?.availableSizes?.length < 1}
                  checked={
                    values.size_based_pricing &&
                    values?.availableSizes?.length >= 1
                  }
                />
                <label
                  htmlFor="title"
                  className="block  font-semibold text-gray-700"
                >
                  Enable Size-Based pricing
                </label>

                <ErrorMessage
                  name="size_based-pricing"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              {values?.size_based_pricing &&
                values?.availableSizes.length > 0 &&
                values.availableSizes.map((size, sizeIndex) => (
                  <div key={sizeIndex} className="mb-3">
                    <label
                      htmlFor={`size_price.${sizeIndex}.price`}
                      className="block mb-1 text-gray-700"
                    >
                      Price For Size {size}
                    </label>
                    <Field
                      name={`size_price.${sizeIndex}.price`}
                      type="number"
                      min={1}
                      className="w-full p-2 border rounded-md"
                    />
                    <SetColorValue
                      name={`size_price.${sizeIndex}.size`}
                      value={size}
                    />
                    <ErrorMessage
                      name={`size_price`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
              <div className="mb-4  flex items-center gap-2 ">
                <Field
                  name="include_color"
                  type="checkbox"
                  className={`${
                    touched.include_color && errors.include_color
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                />
                <label
                  htmlFor="include_color"
                  className="block  font-semibold text-gray-700"
                >
                  Include the full selection of Colors.
                </label>

                <ErrorMessage
                  name="include_color"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <hr />
              {values?.include_color && (
                <div className="mb-4">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Available Colors
                  </label>
                  {colorOptions?.map((color: any, colorIndex: any) => (
                    <div key={colorIndex} className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="availableColors"
                        value={color}
                        className={`rounded-md ${
                          touched.availableColors && errors.availableColors
                            ? "border-red-500"
                            : "border-green-500"
                        }`}
                      />
                      <label className="capitalize" key={color}>
                        {color}
                      </label>
                    </div>
                  ))}
                  <ErrorMessage name="availableColors" component="div" />
                </div>
              )}

              {values?.include_color && values.availableColors.length > 0 && (
                <div className="mb-4">
                  <h3 className="block mb-2 font-semibold text-gray-700">
                    Image URLs by Color
                  </h3>
                  <FieldArray name="imageUrlColors">
                    {() =>
                      values?.availableColors.map((color, index) => (
                        <div key={color}>
                          <label className="capitalize">
                            {color} Image URL:
                            <Field
                              name={`imageUrlColors.${index}.imageUrl`}
                              type="text"
                              className={`w-full p-2 border rounded-md ${
                                touched.imageUrl && errors.imageUrl
                                  ? "border-red-500"
                                  : "border-green-500"
                              }`}
                            />
                            <SetColorValue
                              name={`imageUrlColors.${index}.color`}
                              value={color}
                            />
                          </label>

                          <ErrorMessage
                            name={`imageUrlColors.${index}.imageUrl`}
                            component="div"
                          />
                        </div>
                      ))
                    }
                  </FieldArray>
                </div>
              )}
              {values?.include_color &&
                !values?.include_size &&
                values?.availableSizes?.length < 1 &&
                values.availableColors.length > 0 && (
                  <div className="mb-4">
                    <h3 className="block mb-2 font-semibold text-gray-700">
                      Quantity by Color
                    </h3>
                    <FieldArray name="quantityColors">
                      {() => (
                        <div>
                          {values.availableColors.map((color, colorIndex) => {
                            const quantityPath = `quantityColors.${colorIndex}`;

                            return (
                              <div key={`${color}`}>
                                <label className="capitalize">
                                  {color} Quantity:
                                  <Field
                                    name={`${quantityPath}.quantity`}
                                    type="number"
                                    min="1"
                                    className={`w-full p-2 border rounded-md mb-2 ${
                                      touched.quantityColors &&
                                      errors.quantityColors
                                        ? "border-red-500"
                                        : "border-green-500"
                                    }`}
                                  />
                                  <SetColorValue
                                    name={`${quantityPath}.color`}
                                    value={color}
                                  />
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                )}
              {values.include_size &&
                !values?.include_color &&
                values?.availableColors?.length < 1 &&
                values.availableSizes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="block mb-2 font-semibold text-gray-700">
                      Quantity by Size
                    </h3>
                    <FieldArray name="quantitySizes">
                      {() => (
                        <div>
                          {values.availableSizes.map((size, sizeIndex) => {
                            const quantityPath = `quantitySizes.${sizeIndex}`;

                            return (
                              <div key={`${size}`}>
                                <label className="capitalize">
                                  {size} Quantity:
                                  <Field
                                    name={`${quantityPath}.quantity`}
                                    type="number"
                                    min="1"
                                    className={`w-full p-2 border rounded-md mb-2 ${
                                      touched.quantitySizes && errors.quantitySizes
                                        ? "border-red-500"
                                        : "border-green-500"
                                    }`}
                                  />
                                  <SetColorValue
                                    name={`${quantityPath}.size`}
                                    value={size}
                                  />
                                </label>
                                <ErrorMessage
                                  name="quantitySizes"
                                  component="div"
                                  className="text-red-500 text-sm mt-2"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                )}
              {values.include_color &&
                values.include_size &&
                values?.availableColors?.length > 0 &&
                values?.availableSizes?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="block mb-2 font-semibold text-gray-700">
                      Quantity by Size and Color
                    </h3>
                    <FieldArray name="quantitySizeAndColors">
                      {() =>
                        values.availableSizes.map((size, sizeIndex) => (
                          <div key={size}>
                            <h4>Size: {size}</h4>
                            {values.availableColors.map((color, colorIndex) => {
                              const quantityPath = `quantitySizeAndColors.${sizeIndex}.${size}.${colorIndex}`;

                              return (
                                <div key={`${size}-${color}`}>
                                  <label className="capitalize">
                                    {color} Quantity:
                                    <Field
                                      name={`${quantityPath}.quantity`}
                                      type="number"
                                      min="1"
                                      className={`w-full p-2 border rounded-md ${
                                        touched.quantitySizeAndColors &&
                                        errors.quantitySizeAndColors
                                          ? "border-red-500"
                                          : "border-green-500"
                                      }`}
                                    />
                                    <SetColorValue
                                      name={`${quantityPath}.color`}
                                      value={color}
                                    />
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        ))
                      }
                    </FieldArray>
                  </div>
                )}
              {values?.availableColors.length < 1 && (
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
              )}

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Type
                </label>
                <Select
                  value={values.type}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={pujaTypeOptions}
                  onChange={(value) => {
                    setFieldValue("type", value);
                  }}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sub_type"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Sub Type
                </label>
                <Select
                  value={values?.sub_type}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={pujaSubTypeOptions}
                  onChange={(value) => {
                    setFieldValue("sub_type", value);
                  }}
                />
                <ErrorMessage
                  name="sub_type"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pujaName"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Used For
                </label>
                <Select
                  value={values?.pujaName}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={pujaNameOptions}
                  onChange={(selectedOptions) => {
                    // Preserve existing quantities
                    const newQuantities = { ...values.pujaQuantities };

                    // Remove quantities for deselected pujas
                    Object.keys(newQuantities).forEach((key) => {
                      if (!selectedOptions.some((opt) => opt.value === key)) {
                        delete newQuantities[key];
                      }
                    });

                    // Initialize new selections to 0
                    selectedOptions.forEach((opt) => {
                      if (!newQuantities[opt.value]) {
                        newQuantities[opt.value] = 0;
                      }
                    });

                    setFieldValue("pujaName", selectedOptions);
                    setFieldValue("pujaQuantities", newQuantities);
                  }}
                />
                <ErrorMessage
                  name="pujaName"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="unit"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Unit
                </label>
                <Select
                  value={values?.unit}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={unitOptions}
                  onChange={(value) => {
                    console.log("object")
                    setFieldValue("unit", value);
                  }}
                />
                <ErrorMessage
                  name="unit"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              {!values?.size_based_pricing && (
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
              )}

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
                  name="quantity"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              {values.pujaName.length > 0 && (
                <div className="mb-4">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Default Product Quantity used For the puja
                  </label>
                  {values.pujaName.map((puja) => (
                    <div key={puja.value} className="mb-3">
                      <label
                        htmlFor={`pujaQuantities.${puja.value}`}
                        className="block mb-1 text-gray-700"
                      >
                        For {puja.label}
                      </label>
                      <Field
                        name={`pujaQuantities.${puja.value}`}
                        type="number"
                        min={values?.pujaName.length > 0 ? "1" : "0"}
                        className="w-full p-2 border rounded-md"
                      />
                      <ErrorMessage
                        name={`pujaQuantities.${puja.value}`}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}
                </div>
              )}

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
                disabled={submitting}
              >
                {submitting ? "Submitting" : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditProduct;
