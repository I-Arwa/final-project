/* eslint-disable no-unused-vars */
import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return <div className="flex justify-center items-center py-10">
  <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
/>
</div>
}
