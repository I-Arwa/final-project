/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { NameContext } from "../context/NameContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Navbar() {
  let { cartCount, setTokenStatus, tokenStatus } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext);
  let { userData, setUserData } = useContext(NameContext);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <nav className="py-4 px-3 z-50 bg-gray-200 capitalize text-gray-500 md:fixed md:top-0 md:end-0 md:start-0">
        <div className="container flex flex-wrap md:flex-nowrap justify-between items-center md:space-x-2">
          <div className="logo">
            <img src={logo} className="w-48" alt="logo" />
          </div>

          <div onClick={() => setOpen(!open)} className="icon md:hidden cursor-pointer">
            <i className="fa-solid fa-bars text-3xl"></i>
          </div>

          <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center basis-full`}>
            {/* Links section */}
            <div className={`flex flex-col md:flex-row justify-center md:space-x-8 md:mx-auto w-full`}> 
              {userData && (
                <ul className="flex flex-col md:flex-row justify-center md:space-x-8 text-2xl mt-4 md:mt-0">
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="" className="text-gray-500">
                      home
                    </NavLink>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="products" className="text-gray-500">
                      products
                    </NavLink>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="categories" className="text-gray-500">
                      categories
                    </NavLink>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="brands" className="text-gray-500">
                      brands
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            {/* User actions */}
            <ul className="flex flex-col md:flex-row justify-center items-center md:space-x-8 text-2xl mt-4 md:mt-0"> 
              {userData && (
                <>
                  <li className="text-2xl">
                    <NavLink onClick={() => setOpen(false)} to="cart">
                      <i className="fa-solid fa-xl fa-cart-shopping relative text-mainColor mb-2 md:mb-0">
                        <span className="absolute -top-[15px] left-1/2 -translate-x-1/2 text-xs text-white">
                          {tokenStatus && cartCount ? cartCount : 0}
                        </span>
                      </i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={() => setOpen(false)} to="wishlist">
                      <i className="fa-solid fa-heart text-red-500 text-3xl relative mb-2 md:mb-0">
                        <span className="absolute top-[9px] left-1/2 -translate-x-1/2 text-xs text-white">
                          {tokenStatus && wishlistCount ? wishlistCount : 0}
                        </span>
                      </i>
                    </NavLink>
                  </li>
                </>
              )}
              {userData ? (
                <li>
                  <span
                    className="cursor-pointer text-2xl"
                    onClick={() => {
                      setOpen(false);
                      localStorage.removeItem("userToken");
                      setUserData(null);
                      navigate("login");
                      setTokenStatus(false);
                    }}
                  >
                    logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="login" className="text-gray-500">
                      login
                    </NavLink>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <NavLink onClick={() => setOpen(false)} to="register" className="text-gray-500">
                      register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
