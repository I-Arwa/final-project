/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductDetails() {
  let { addProductToCart, loading } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  let { id } = useParams();

  var settings = {
    autoplay: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);

  async function getDetails(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    setProductDetails(data.data);
  }

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <>
      {productDetails ? (
        <div className="container mx-auto my-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="slider w-full md:w-2/3 lg:w-1/2 justify-self-center md:col-span-1">
              <Slider {...settings}>
                {productDetails.images?.map((image, index) => (
                  <img
                    key={index}
                    className="w-full mb-6 rounded-lg"
                    src={image}
                    alt={productDetails.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="info relative w-full text-center md:text-start md:col-span-2">
              <i
                onClick={() => {
                  wishlistCheck.some((i) => i === productDetails.id)
                    ? removeFromWishlist(productDetails.id)
                    : addToWishlist(productDetails.id);
                }}
                className={`fa-solid fa-heart ${
                  wishlistCheck.some((i) => i == productDetails.id)
                    ? "text-red-500 "
                    : "hover:text-red-500"
                } absolute top-2 right-2 md:top-2 md:right-2 duration-300 text-2xl cursor-pointer`}
              ></i>
              <h2 className="text-2xl font-bold">{productDetails.title}</h2>
              <p className="my-3 text-gray-500">{productDetails.description}</p>
              <h3 className="text-green-600 text-lg font-semibold">
                {productDetails.category?.name}
              </h3>
              <div className="flex justify-center md:justify-start items-center my-3 space-x-4">
                <h3 className="text-xl font-semibold">
                  {productDetails.price} EGP
                </h3>
                <span className="text-lg">
                  <i className="fa-solid fa-star rating-color"></i>
                  {productDetails.ratingsAverage}
                </span>
              </div>
              <div className="mt-4">
                {loading ? (
                  <button
                    type="button"
                    className="bg-green-500 w-full p-2 rounded text-white btn"
                  >
                    <i className="fas fa-spinner fa-spin-pulse"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => addProductToCart(productDetails.id)}
                    className="bg-green-500 w-full p-2 rounded text-white btn"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
