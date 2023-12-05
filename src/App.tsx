import { Route, Routes } from "react-router-dom";

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

const App = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <Routes>
       { <Route path="/main" element={<Main />} /> }
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/striking" element={<Striking />} />
        <Route path="/grappling" element={<Grappling />} />
        <Route path="/support" element={<Support />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
};


export default App;