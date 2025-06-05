import React, { useEffect, useState } from "react";

import * as Yup from "yup";

import { usePostLogin } from "../hooks/Post/usePostLogin";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Loginpage = () => {
  const { mutate } = usePostLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {


  if(localStorage.getItem('token')){
    localStorage.getItem('role')==='admin'? navigate("/admin/dashboard"):navigate("/");
  
  }},[])

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        mutate(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ touched, errors }) => (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Form className="w-full max-w-[900px] p-8 bg-white rounded-lg shadow-lg">
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)} // Toggle state
                >
                  {showPassword ? (
                    <VisibilityOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Visibility className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              LogIn
            </button>
            <div className="flex gap-2 mt-4">
              <div className="border border-slate-700 basis-2/4 text-center py-1 rounded-sm flex justify-center gap-1 items-center font-extralight">
                <FacebookIcon sx={{ color: "blue" }} />
                <button> Facebook</button>
              </div>
              <div className=" border border-slate-700 basis-2/4 text-center py-1 rounded-sm flex justify-center gap-1 items-center font-extralight">
                <GoogleIcon sx={{ color: "black" }} />
                <button> Google</button>
              </div>
            </div>
            <p className="text-center mt-3">
              Don't have an account? 
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                 Register here
              </span>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Loginpage;
