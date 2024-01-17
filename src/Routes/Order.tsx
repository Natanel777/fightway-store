import AuthContext from 'Context/AuthContext';
import CartContext from 'Context/CartContext';
import CurrentPageContext from 'Context/CurrentPageContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { postOrder } from 'services/order-service';
import Swal from 'sweetalert2';
import { FormBasicValues, deliveryFee } from 'utils/types';
import * as Yup from 'yup';



const Order = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [error, setError] = useState<string>();
  const { changeCurrentPage } = useContext(CurrentPageContext)
  const navigate = useNavigate();

  useEffect(() => {
    // If the cart is empty, navigate to the main page
    if (cart.length === 0) {
      navigate('/main');
    }
  }, [cart, navigate]);

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    const subtotal = cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);
    return subtotal + deliveryFee;
  };

  // Handle order submission
  const handleOrderSubmit = (formValues: FormBasicValues) => {
    setError(undefined)

    if (paymentMethod === 'creditCard') {
      return Swal.fire({
        title: "Credit Card Payment",
        text: "We apologize, but the option to use a credit card is currently unavailable, our team is working on it!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go Back"
      })
    }

    const items = cart.map(cartItem => ({
      product: {
        ...cartItem.product
      },
      quantity: cartItem.quantity,
      subtotal: cartItem.product.price * cartItem.quantity
    }));

    postOrder(items, paymentMethod, formValues.address, formValues.city, formValues.phoneNumber, formValues.postalCode)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "We Got Your Order",
          showConfirmButton: false,
          timer: 2000
        });

        clearCart();
        navigate('/recentorders');
        changeCurrentPage("/recentorders")
      })
      .catch((e) => {
        console.error('Error submitting order:', e);
        setError(e.response.data.message)
      })
  };

  // Validation 
  const validationSchema = Yup.object({
    address: Yup.string().required('Address is required').min(3, 'Address must be between 3 and 50 characters').max(50, 'Address must be between 3 and 50 characters'),
    city: Yup.string().required('City is required').min(3, 'City must be between 3 and 58 characters').max(58, 'City must be between 3 and 58 characters'),
    postalCode: Yup.string().required('Postal Code is required').matches(/\d{7}/, 'Postal code must be 7 digits').max(7, 'Postal code cant be above 7 digits'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^(05\d{8})$/, 'Enter a ten digits phone number starting with 05')
      .max(10, 'Phone number can\'t be above 10 digits'),
  });

  // Initial values for the form
  const initialValues = {
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
  };



  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 text-lg focus:outline-none mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Order</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleOrderSubmit}
        >
          <Form>
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

                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700">Full Delivery Address:</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-2 mt-2  border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700">City:</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-4 py-2 mt-2  border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="postalCode" className="block text-gray-700">Postal Code:</label>
                  <Field
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
                  />
                  <ErrorMessage name="postalCode" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number:</label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-200"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
                  <select
                    id="paymentMethod"
                    className={`w-full px-4 py-2 mt-2  border rounded-md focus:outline-none ${paymentMethod === 'Cash' ? 'bg-green-200 focus:border-green-500' : 'bg-blue-200 focus:border-blue-500'
                      }`}
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="" disabled>Select Payment Method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                  <ErrorMessage name="paymentMethod" component="div" className="text-red-500" />
                </div>

                {paymentMethod === 'creditCard' && (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="creditCardNumber" className="block text-gray-700">Credit Card Number:</label>
                      <Field
                        type="text"
                        id="creditCardNumber"
                        name="creditCardNumber"
                        value={"Not Available Yet"}
                        className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none border-red-500 bg-red-200`}
                        disabled
                      />
                      <ErrorMessage name="creditCardNumber" component="div" className="text-red-500" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="creditCardExpiry" className="block text-gray-700">Expiration Date (MM/YY):</label>
                      <Field
                        type="text"
                        id="creditCardExpiry"
                        name="creditCardExpiry"
                        value={"Not Available Yet"}
                        className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none border-red-500 bg-red-200`}
                        disabled
                      />
                      <ErrorMessage name="creditCardExpiry" component="div" className="text-red-500" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="creditCardCVC" className="block text-gray-700">CVC:</label>
                      <Field
                        type="text"
                        id="creditCardCVC"
                        name="creditCardCVC"
                        value={"Not Available Yet"}
                        className={`w-full px-4 py-2 mt-2 mb-4 border rounded-md focus:outline-none border-red-500 bg-red-200`}
                        disabled
                      />
                      <ErrorMessage name="creditCardCVC" component="div" className="text-red-500" />
                    </div>
                  </div>
                )}

                <p className="text-gray-700 font-semibold mb-2">Total: &#8362;{calculateTotalPrice().toFixed(2)}</p>

                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Submit Order
                </button>
              </div>
              {error && (
                <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 mx-auto mt-4 rounded-md shadow-md italic font-medium'>
                  {error}
                </p>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Order;

