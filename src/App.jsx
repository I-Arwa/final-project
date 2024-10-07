/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'

import './App.css'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ProtectedComponent from './components/ProtectedComponent/ProtectedComponent';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import Wishlist from './components/Wishlist/Wishlist';
import Productes from './components/Productes/Productes';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import ProtectedUser from './components/ProtectedUser/ProtectedUser';
import Login from './components/Login/Login';
import Regestier from './components/Regestier/Regestier';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import EnterNewPassword from './components/EnterNewPassword/EnterNewPassword';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Notfound from './components/Notfound/Notfound';


import CartContextProvider from './components/context/CartContext';
import NameContextProvider from './components/context/NameContext';
import WishlistContextProvider from './components/context/WishlistContext'
import { Toaster } from 'react-hot-toast';




let routers = createBrowserRouter ([

  {
    path:"" , element: <Layout/> , children:[
      {index:true , element:(<ProtectedComponent> <Home/> </ProtectedComponent>)},
      {path:"cart" , element:(<ProtectedComponent> <Cart/> </ProtectedComponent>)},
      {path:"checkout/:id" , element:(<ProtectedComponent> <CheckOut/> </ProtectedComponent>)},
      {path:"allorders" , element:(<ProtectedComponent> <AllOrders/> </ProtectedComponent>)},
      {path:"wishlist" , element:(<ProtectedComponent> <Wishlist/> </ProtectedComponent>)},
      {path:"products" , element:(<ProtectedComponent> <Productes/> </ProtectedComponent>)},
      {path:"categories" , element:(<ProtectedComponent> <Categories/> </ProtectedComponent>)},
      {path:"brands" , element:(<ProtectedComponent> <Brands/> </ProtectedComponent>)},
      {path:"login" , element:(<ProtectedUser> <Login/> </ProtectedUser>)},
      {path:"register" , element:(<ProtectedUser> <Regestier/> </ProtectedUser>)},
      {path:"forgetpassword" , element:(<ProtectedUser> <ForgetPassword/> </ProtectedUser>)},
      {path:"resetpassword" , element:(<ProtectedUser> <ResetPassword/> </ProtectedUser>)},
      {path:"enternewpassword" , element:(<ProtectedUser> <EnterNewPassword/> </ProtectedUser>)},
      {path: "details/:id", element:(<ProductDetails> <ProductDetails/> </ProductDetails>)},
      {path: "products/details/:id" , element:(<ProductDetails> <ProductDetails/> </ProductDetails>)},
      {path: "*" , element: <Notfound/>},
      
    ]
  }
  
]);


function App() {
  

  return <>

   <CartContextProvider>
    <WishlistContextProvider>
      <NameContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster/>
      </NameContextProvider>
    </WishlistContextProvider>
   </CartContextProvider>

  </>
}

export default App
