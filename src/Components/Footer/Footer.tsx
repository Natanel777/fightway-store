import CurrentPageContext from "Context/CurrentPageContext";
import { useContext } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

  const { changeCurrentPage } = useContext(CurrentPageContext)

  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-center space-x-4 mb-4 md:mb-0">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-teal-400" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-teal-400" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-teal-400" />
          </a>
        </div>

        <div className="mt-8 md:mt-0 flex flex-col md:flex-row">
          <div className="flex flex-col items-center justify-center text-white md:mr-20 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-teal-300">Explore</h3>
            <Link to="/main" onClick={() => changeCurrentPage("/main")} className="hover:text-teal-400">Home</Link>
            <Link to="/about" onClick={() => changeCurrentPage("/about")} className="hover:text-teal-400 mt-2">About</Link>
          </div>
          <div className="flex flex-col items-center justify-center text-white md:mr-20 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Shop</h3>
            <Link to="/store" onClick={() => changeCurrentPage("/store")} className="hover:text-purple-400 mt-2">Store</Link>
            <Link to="/striking" onClick={() => changeCurrentPage("/striking")} className="hover:text-purple-400 mt-2">Striking</Link>
            <Link to="/grappling" onClick={() => changeCurrentPage("/grappling")} className="hover:text-purple-400 mt-2">Grappling</Link>
          </div>
          <div className="flex flex-col items-center justify-center text-white mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-orange-400">Help</h3>
            <Link to="/support" onClick={() => changeCurrentPage("/support")} className="hover:text-orange-400 mt-2">Support</Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <span className="mb-4">© 2024 Appy. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
