
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { NameContext } from "../context/NameContext";

export default function Login() {
  let { setUserData } = useContext(NameContext);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let nav = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{3,15}$/, "must be * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)")
      .required("Password is required"),
  });

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("userToken", data.token);
      setUserData(data.token);
      nav("/");
    } catch (error) {
      console.log(error.response.data.message);
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <h3 className="text-3xl font-semibold mb-4">Login Now</h3>

          {apiError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* email input */}
            <div className="relative my-6">
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
                <div
                  className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* password input */}
            <div className="relative my-6">
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
                <div
                  className="py-3 px-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* button and link section */}
            <div className="flex justify-between items-center gap-0">
              <Link
                className="text-sm text-green-600 hover:text-green-800 duration-200"
                to={"/forgetpassword"}
              >
                Forget Password?
              </Link>

              {loading ? (
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl w-auto py-2 px-5"
                >
                  <i className="fas fa-spinner fa-spin-pulse"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:bg-green-600 font-normal rounded-lg text-xl w-auto py-2 px-5 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                  Login Now
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
