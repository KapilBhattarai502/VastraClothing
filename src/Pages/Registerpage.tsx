import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NEWUSER } from "../types/types";
import { useRegisterUser } from "../hooks/Post/useRegisterUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import MUI Icons for password visibility toggle

const RegisterPage = () => {
  const { mutate } = useRegisterUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <Formik<NEWUSER>
      initialValues={{
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        role: Yup.string().required("Role is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        mutate(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ touched, errors }) => (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Form className="w-full max-w-[900px] p-8 bg-white rounded-lg shadow-lg">
            {/* First Name */}
            <div className="mb-6">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  touched.firstName && errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Last Name */}
            <div className="mb-6">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  touched.lastName && errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Role (Dropdown for Admin or Customer) */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Role
              </label>
              <Field
                as="select"
                name="role"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  touched.role && errors.role
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

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
              Register
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login here
              </span>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
