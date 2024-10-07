/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let {
    cart,
    getCartItems,
    loading,
    updateProductCount,
    removeProduct,
    totalPrise,
    cartId,
  } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : cart ? (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
           
            <div className="w-full md:w-3/4">
              <h2 className="text-3xl font-bold mb-4">Cart Shop</h2>
              {cart.length > 0 ? (
                <>
                  {cart.map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-6"
                    >
                     
                      <img
                        src={product.product.imageCover}
                        className="w-16 h-16 md:w-24 md:h-24 object-cover"
                        alt={product.product.title}
                      />

                      
                      <div className="flex-1 md:ml-4 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-700">
                          {product.product.title}
                        </h3>
                        <p className="text-gray-500">{product.price} EGP</p>
                        <button
                          onClick={() => removeProduct(product.product.id)}
                          className="text-red-600 hover:text-red-800 mt-2"
                        >
                          <i className="fa-solid fa-trash me-2"></i> Remove
                        </button>
                      </div>

                     
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="p-2 border rounded-full text-green-500 hover:bg-gray-100"
                          disabled={product.count === 1}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="mx-3">{product.count}</span>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="p-2 border rounded-full text-green-500 hover:bg-gray-100"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h3 className="text-2xl font-semibold text-center mt-8">
                  Your Cart Is Empty
                </h3>
              )}
            </div>

           
            <div className="w-full md:w-1/4 bg-gray-50 shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
              <p className="text-xl mb-2">
                Total price:{" "}
                <span className="text-green-600 font-semibold">{totalPrise} EGP</span>
              </p>
              <p className="text-lg mb-6">
                Total number of items:{" "}
                <span className="font-semibold">{cart.length}</span>
              </p>
              <button
                onClick={() => navigate(`/checkout/${cartId}`)}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md transition duration-300"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-2xl font-semibold text-center my-36">
          Your Cart Is Empty
        </h3>
      )}
    </>
  );
}
