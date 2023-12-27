import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from 'Context/AuthContext';
import CartContext from 'Context/CartContext';

const Order = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardExpiry, setCreditCardExpiry] = useState('');
  const [creditCardCVC, setCreditCardCVC] = useState('');
  const [isCreditCardValid, setIsCreditCardValid] = useState(true);

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);
  };

  // Handle credit card validation
  const handleCreditCardValidation = () => {
    // Your credit card validation logic here
    // For simplicity, I'm using a placeholder method
    setIsCreditCardValid(creditCardNumber.length === 16 && creditCardExpiry.length === 4 && creditCardCVC.length === 3);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    // Validate credit card before submitting the order
    if (paymentMethod === 'creditCard') {
      handleCreditCardValidation();
      if (!isCreditCardValid) {
        // Credit card is not valid, handle accordingly (show error message, etc.)
        return;
      }
    }

    // Your logic for handling the order submission, e.g., API call
    console.log('Order submitted:', {
      address,
      street,
      streetNumber,
      city,
      postalCode,
      paymentMethod,
      creditCardNumber,
      creditCardExpiry,
      creditCardCVC,
      cart,
    });
    // Redirect or show a success message as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Summary</h2>
            {cart.map((cartItem) => (
              <div key={cartItem.product.id} className="flex items-center border-b border-gray-200 py-2">
                <img src={cartItem.product.imageUrl} alt={cartItem.product.name} className="w-20 h-20 object-cover rounded" />
                <div className="ml-4">
                  <p className="text-gray-800 font-semibold">{cartItem.product.name}</p>
                  <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                  <p className="text-gray-700">&#8362;{(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Details</h2>
            <label htmlFor="address" className="block text-gray-700">Delivery Address:</label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="street" className="block text-gray-700">Street:</label>
            <input
              type="text"
              id="street"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="streetNumber" className="block text-gray-700">Street Number:</label>
            <input
              type="text"
              id="streetNumber"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
            />
            <label htmlFor="city" className="block text-gray-700">City:</label>
            <input
              type="text"
              id="city"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="postalCode" className="block text-gray-700">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
            <select
              id="paymentMethod"
              className="w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            {paymentMethod === 'creditCard' && (
              <div>
                <label htmlFor="creditCardNumber" className="block text-gray-700">Credit Card Number:</label>
                <input
                  type="text"
                  id="creditCardNumber"
                  className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none ${!isCreditCardValid && 'border-red-500'} bg-red-200`}
                  //value={creditCardNumber}
                  value={"Not Available Yet"}
                  onChange={(e) => setCreditCardNumber(e.target.value)}
                  disabled
                />

                <label htmlFor="creditCardExpiry" className="block text-gray-700">Expiration Date (MM/YY):</label>
                <input
                  type="text"
                  id="creditCardExpiry"
                  className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none ${!isCreditCardValid && 'border-red-500'} bg-red-200`}
                  //value={creditCardExpiry}
                  value={"Not Available Yet"}
                  onChange={(e) => setCreditCardExpiry(e.target.value)}
                  disabled
                />

                <label htmlFor="creditCardCVC" className="block text-gray-700">CVC:</label>
                <input
                  type="text"
                  id="creditCardCVC"
                  className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none ${!isCreditCardValid && 'border-red-500'} bg-red-200`}
                  //value={creditCardCVC}
                  value={"Not Available Yet"}
                  onChange={(e) => setCreditCardCVC(e.target.value)}
                  disabled
                />
              </div>
            )}
            <p className="text-gray-700 font-semibold mb-2">Total: &#8362;{calculateTotalPrice().toFixed(2)}</p>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleOrderSubmit}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
