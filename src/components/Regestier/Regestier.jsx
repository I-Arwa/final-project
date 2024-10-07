/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { NameContext } from "../context/NameContext";

export default function Register() {
  let { setUserData } = useContext(NameContext);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let nav = useNavigate();

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length 3")
      .max(10, "Max length 10")
      .required("Name is required"),
    email: Yup.string()
      .email("Enter valid e-mail")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{3,15}$/, "must be * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Please re-enter password")
      .required("Re-enter password"),
    phone: Yup.string()
      .matches(/^(002|\+20)?01[0125][0-9]{8}$/, "Ex:(01111111111)")
      .required("Please enter your phone"),
  });

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      localStorage.setItem("userToken", data.token);
      setUserData(data.token);
      nav("/");
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <h3 className="text-3xl font-semibold mb-4">Register Now</h3>

          {apiError && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Input for name */}
            <div className="my-4">
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full py-3 px-4 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                placeholder="Enter your name"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{formik.errors.name}</div>
              )}
            </div>

            {/* Input for email */}
            <div className="my-4">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full py-3 px-4 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{formik.errors.email}</div>
              )}
            </div>

            {/* Input for password */}
            <div className="my-4">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full py-3 px-4 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{formik.errors.password}</div>
              )}
            </div>

            {/* Input for rePassword */}
            <div className="my-4">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full py-3 px-4 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                placeholder="Re-enter your password"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{formik.errors.rePassword}</div>
              )}
            </div>

            {/* Input for phone */}
            <div className="my-4">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full py-3 px-4 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                placeholder="Enter your phone"
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{formik.errors.phone}</div>
              )}
            </div>

            {/* Submit button */}
            <div className="text-right">
              {loading ? (
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl w-auto py-2 px-5 text-center"
                >
                  <i className="fas fa-spinner fa-spin-pulse"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:bg-green-800 font-normal rounded-lg text-xl w-auto py-2 px-5 text-center"
                >
                  Register Now
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
