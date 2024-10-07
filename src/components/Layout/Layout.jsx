/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container md:pt-12 px-9">
        <Outlet></Outlet>
      </div>
      
    </>
  );
}