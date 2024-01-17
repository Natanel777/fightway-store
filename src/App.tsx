import Footer from "Components/Footer/Footer";
import Navbar from "Components/Navbar/Navbar";
import AuthContext from "Context/AuthContext";
import About from "Routes/About";
import CartItemDetails from "Routes/CartDetails ";
import Grappling from "Routes/Grappling";
import Login from "Routes/Login";
import Main from "Routes/Main";
import Order from "Routes/Order";
import OrderManager from "Routes/OrderManager";
import ProductDetails from "Routes/ProductDetail";
import RecentOrders from "Routes/RecentOrders";
import SignUp from "Routes/SignUp";
import Store from "Routes/Store";
import Striking from "Routes/Striking";
import Support from "Routes/Support";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import authService from "services/auth-service";
import Page404 from './Routes/Page404';


const App = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const isAdmin = authService.isAdmin();

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
        <Route path="/cartdetails" element={<CartItemDetails />} />
        <Route path="/order" element={<PrivateRoute element={<Order />} />} />
        {isLoggedIn && <Route path="/recentorders" element={<RecentOrders />} />}
        {isAdmin && <Route path="/ordermanager" element={<OrderManager />} />}
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
};


export default App;