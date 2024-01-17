import axios from "axios";
import { request } from "utils/axios-interceptor";
import { OrderPayload } from "utils/types";

const baseUrl = 'http://localhost:8080/api/v1/order';

export const postOrder = (
  items: OrderPayload['items'],
  paymentInformation: OrderPayload['paymentInformation'],
  address: OrderPayload['address'],
  city: OrderPayload['city'],
  phoneNumber: OrderPayload['phoneNumber'],
  postalCode: OrderPayload['postalCode']
) => {
  // Define the payload based on the required parameters
  const payload: OrderPayload = {
    items,
    paymentInformation,
    address,
    city,
    phoneNumber,
    postalCode
  };

  // Check if there is a JWT token in the local storage
  const token = localStorage.getItem("user");

  if (token) {
    // If token exists, set it in the Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token).token}`;
  }

  return axios.post(baseUrl, payload)
    .then((res) => {
      // If the response contains a JWT token, store it in the local storage
      const responseToken = res.data.jwt;

      if (responseToken) {
        localStorage.setItem("user", JSON.stringify({ token: responseToken }));
      }

      return res.data;
    });
};

export const updateOrder = (orderId: number, status: string) => {
  const token = localStorage.getItem("user");

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token).token}`;
  }

  const updatePayload = {
    status
  };

  return axios.put(`http://localhost:8080/api/v1/ordermanager/${orderId}`, updatePayload)
    .then((res) => res.data);
};

export const getCustomerOrders = () => request({ url: "/recentorders" })

export const getAllOrders = () => request({ url: "/ordermanager" })

const orderService = { postOrder, updateOrder, getCustomerOrders, getAllOrders };

export default orderService;