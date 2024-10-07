/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function CheckOut() {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002|\+20)?01[0125][0-9]{8}$/, "Ex:(01111111111)"),
    city: Yup.string().required("Ex:(cairo)"),
  });

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function PayNow(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://fresh-cart-test-five.vercel.app/`,
        {
          shippingAddress,
        },
        { headers }
      );

      console.log(data);

      location.href = data.session.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: PayNow,
  });

  return (
    <div className="w-full max-w-full mx-auto my-9 py-7 px-6 sm:px-8 ">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Input for Details */}
        <div className="relative group">
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-3 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-focus:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 bg-white px-1"
          >
            Details
          </label>
        </div>
        {formik.errors.details && formik.touched.details && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.details}
          </div>
        )}

        {/* Input for Phone */}
        <div className="relative group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-3 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-focus:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 bg-white px-1"
          >
            Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        )}

        {/* Input for City */}
        <div className="relative group">
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-3 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-300 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-focus:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 bg-white px-1"
          >
            City
          </label>
        </div>
        {formik.errors.city && formik.touched.city && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.city}
          </div>
        )}

        {/* Button */}
        {loading ? (
          <button className="block w-full py-3 px-4 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="block w-full py-3 px-4 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm transition duration-300"
          >
            Pay Now
          </button>
        )}
      </form>
    </div>
  );
}
