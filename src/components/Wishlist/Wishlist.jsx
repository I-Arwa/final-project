/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  let { wishlist, loading, removeFromWishlist, getWishlist, wishlistCount } =
    useContext(WishlistContext);

  let { addProductToCart } = useContext(CartContext);
  useEffect(() => {
    getWishlist();
  }, [wishlistCount]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : wishlist?.length > 0 ? (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">My Wish List</h2>
          <div className="space-y-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4"
              >
               
                <img
                  src={product.imageCover}
                  className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-lg mb-4 md:mb-0"
                  alt={product.title}
                />

               
                <div className="flex-1 text-center md:text-left ml-0 md:ml-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {product.title}
                  </h3>
                  <p className="text-green-600 font-bold mt-1 md:mt-2">
                    {product.price} EGP
                  </p>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-red-600 hover:text-red-800 mt-2 md:mt-4"
                  >
                    <i className="fa-solid fa-trash me-2"></i> Remove
                  </button>
                </div>

              
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="w-full md:w-auto px-4 py-2 bg-green-50 border border-green-500 text-green-600 hover:bg-green-100 transition rounded-lg"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="text-3xl font-semibold text-center my-36">
          Your Wishlist Is Empty
        </h3>
      )}
    </>
  );
}
