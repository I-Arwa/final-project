/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { NameContext } from "../context/NameContext";

export default function EnterNewPassword() {
  const [loading, setLoading] = useState(false);
  let { setUserData } = useContext(NameContext);
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(/^[A-z][a-z0-9]{3,15}$/, "must be * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)")
      .required("Password is required"),
  });

  async function changePassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserData(localStorage.getItem("userToken"));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });

  return (
    <div className="mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">
        Reset your account password
      </h3>
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
            User E-mail
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

        
        <div className="relative my-6 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:border-green-600 focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            New Password
          </label>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            className="py-3 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.newPassword}
          </div>
        )}

        
        <button
          type={loading ? "button" : "submit"}
          className={`text-green-500 border border-green-500 rounded-lg sm:w-auto text-xl w-auto py-2 px-5 text-center transition duration-300 ${loading ? "bg-transparent" : "bg-white hover:bg-green-500 hover:text-white"} focus:outline-none`}
          disabled={loading}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin-pulse"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
