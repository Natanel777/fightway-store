import AuthContext from 'Context/AuthContext';
import CartContext from 'Context/CartContext';
import CurrentPageContext from 'Context/CurrentPageContext';
import { useContext, useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deliveryFee } from 'utils/types';
import logo from '../Assets/blackLogoReact.png';

const CartDetails = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext)
  const { changeCurrentPage } = useContext(CurrentPageContext)
  const [removedItemId, setRemovedItemId] = useState(null);
  const navigate = useNavigate();

  const orderButton = () => {
    if (isLoggedIn) {
      navigate("/order")
    }
    else {
      Swal.fire({
        title: "You Need To Sign Up",
        text: "in order to continue with the order details you need to sign up!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup")
        }
      });
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);
  };

  const handleRemove = (productId: any) => {
    setRemovedItemId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovedItemId(null);
    }, 300); // Set a timeout to match the duration of the transition
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 ${cart.length <= 3 ? 'h-screen' : ''}`}>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
            alt="Empty Cart"
            className="w-16 h-16 mb-4"
          />
          <div className="text-3xl font-semibold mb-4 text-gray-500">Your cart is empty</div>
          <button
            type="button"
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 focus:outline-none m-2"
            onClick={() => navigate('/main')}
          >
            Go Back To The Main Page
          </button>
        </div>
      ) : (
        <div className="flex justify-between flex-1">
          {/* Cart Items */}
          <div className="w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

            <div>
              {cart.map((cartItem) => (
                <div
                  key={cartItem.product.id}
                  className={`flex flex-col md:flex-row items-center border-b border-gray-200 py-2 bg-white shadow-lg rounded-md mb-4 transition-opacity ${removedItemId === cartItem.product.id ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                  <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4 overflow-hidden">
                    <NavLink to={`/store/${cartItem.product.id}`} onClick={() => changeCurrentPage("/store")}>
                      <img
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.name}
                        className="w-full h-full object-cover object-center rounded-md"
                      />
                    </NavLink>
                  </div>
                  <div className="flex-1">
                    <NavLink
                      to={`/store/${cartItem.product.id}`}
                      onClick={() => changeCurrentPage("/store")}
                      className="text-blue-600 hover:underline font-semibold text-lg"
                    >
                      {cartItem.product.name}
                    </NavLink>
                    <p className="text-gray-500 mb-2 text-sm">{cartItem.product.category?.name}</p>
                    <div className="flex items-center">
                      <div className="flex items-center mb-2 md:mb-0 mr-4">
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.product.id, Math.max(cartItem.quantity - 1, 1))}
                          className="text-gray-600 hover:text-gray-800 focus:outline-none p-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity + 1)}
                          className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-700 text-lg">&#8362;{(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => handleRemove(cartItem.product.id)}
                        className="ml-2 text-red-600 hover:underline focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-1/3 bg-gray-100 p-4 rounded-md shadow-md">
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="fightway logo" className="object-contain w-26 h-24 p-4" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-2">
              <div className="flex justify-between">
                <div className="text-gray-600">Price:</div>
                <div className="text-gray-700">&#8362;{calculateTotalPrice().toFixed(2)}</div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-gray-600">Delivery:</div>
                <div className="text-gray-700">&#8362;{deliveryFee.toFixed(2)}</div>
              </div>
              <div className="border-t border-gray-300 mt-2"></div>
              <div className="flex justify-between mt-2">
                <div className="text-gray-700 font-semibold">Subtotal:</div>
                <div className="text-gray-700 font-semibold">
                  &#8362;{(calculateTotalPrice() + deliveryFee).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Continue with Order button */}
            <div className="mt-6">
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none w-full transition duration-300"
                onClick={orderButton}
              >
                Continue with Order
              </button>
              <div className="mt-2 flex items-center justify-center text-gray-500">
                <IoIosLock className="text-2xl mr-2" />
                Secure payment
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default CartDetails;
