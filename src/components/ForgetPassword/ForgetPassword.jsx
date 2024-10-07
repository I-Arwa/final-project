/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  
  let validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  async function forgetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email,
        }
      );
      toast.success(data.message);
      navigate("/resetpassword");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  return (
    <div className=" mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">Please enter your Email</h3>
      <form className="mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative my-6 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:border-green-600 focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            User e-mail
          </label>
        </div>
        
        {formik.errors.email && formik.touched.email && (
          <div
            className="py-3 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        <button
          type={loading ? "button" : "submit"}
          className={`text-green-500 border border-green-500 rounded-lg  sm:w-auto text-xl w-auto py-2 px-5 text-center transition duration-300 ${loading ? "bg-transparent" : "bg-white hover:bg-green-500 hover:text-white"} focus:outline-none`}
          disabled={loading}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin-pulse"></i>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}
