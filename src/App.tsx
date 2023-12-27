import { Navigate, Route, Routes } from "react-router-dom";

import Main from "Routes/Main";
import Store from "Routes/Store";
import Login from "Routes/Login";
import Striking from "Routes/Striking";
import Grappling from "Routes/Grappling";

import About from "Routes/About";
import Navbar from "Components/Navbar/Navbar";
// import About from "Routes/About";
import Page404 from './Routes/Page404';
import Footer from "Components/Footer/Footer";
import SignUp from "Routes/SignUp";
import { useContext } from "react";
import AuthContext from "Context/AuthContext";
import Support from "Routes/Support";
import ProductDetails from "Routes/ProductDetail";
import CartItemDetails from "Routes/CartDetails ";
import React from "react";
import Order from "Routes/Order";


const App = () => {
  const { isLoggedIn } = useContext(AuthContext)

  //prevent manual access on element
  const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { isLoggedIn } = React.useContext(AuthContext);
    return isLoggedIn ? (element as React.ReactElement) : <Navigate to="/" />;
  };

  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<ProductDetails />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        <Route path="/striking" element={<Striking />} />
        <Route path="/grappling" element={<Grappling />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cartdetails" element={<CartItemDetails/>} />
        <Route path="/order" element={<PrivateRoute element={<Order />} />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
};


export default App;