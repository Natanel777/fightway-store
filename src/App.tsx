import { Route, Routes } from "react-router-dom";


import Example from './Components/Example';
import Navbar from "Components/Navbar/Navbar";
import Main from "Routes/Main";
import Store from "Routes/Store";
import Login from "Routes/Login";
import Striking from "Routes/Striking";
import Grappling from "Routes/Grappling";
import NewNavbar from "Components/Navbar/NewNavbar";
import About from "Routes/About";
// import About from "Routes/About";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <NewNavbar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/striking" element={<Striking />} />
        <Route path="/grappling" element={<Grappling />} />
      </Routes>
    </>
  );
};


export default App;