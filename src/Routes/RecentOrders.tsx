import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AxiosResponse } from "axios";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import orderService from "services/order-service";


export const EmptyOrdersMessage = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center my-5">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
      alt="No Orders"
      className="w-40 h-40 mb-4 object-cover"
    />
    <p className="text-2xl font-bold text-gray-800 mb-2 my-5">You Don't Have Any Orders</p>
    <NavLink
      to="/main"
      className="text-white bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-full focus:outline-none focus:shadow-outline-blue my-5"
    >
      Go to Main Page
    </NavLink>
  </div>
);



const RecentOrders = () => {
  const [openOrderId, setOpenOrderId] = useState(null);
  const { data }: { data?: AxiosResponse<any, any> } = useQuery("get-customer-orders", orderService.getCustomerOrders);

  const orders = data?.data || []; // Extract the data property or default to an empty array

  const openOrderDetails = (orderId: any) => {
    setOpenOrderId(orderId);
  };

  const closeOrderDetails = () => {
    setOpenOrderId(null);
  };


  return (
    <div className="max-h-full overflow-y-auto py-5 bg-gray-100">
      {/* Order Details Modal */}
      {orders.map((order: any) => (
        <Transition.Root key={order.id} show={openOrderId === order.id} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto z-50"
            onClose={closeOrderDetails}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              {/* Background overlay */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* Modal content */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={closeOrderDetails}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Order details */}
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Details</h2>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Order ID:</span> {order.id}
                    </p>

                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Order Date:</span> {order.date}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Payment Info:</span> {order.paymentInformation}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Status:</span> {order.status}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Address:</span> {order.address}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">City:</span> {order.city}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Postal Code:</span> {order.postalCode}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-bold">Phone Number:</span> {order.phoneNumber}
                    </p>

                    {/* Order items */}
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Items</h3>
                      <ul className="list-disc list-inside">
                        {order.items.map((item: any, index: any) => (
                          <li key={index} className="text-lg text-gray-700">
                            {item.quantity}x {item.product.name} - &#8362;{item.product.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                      <p className="text-lg text-gray-700 mt-2">
                        <span className="font-bold">Total Amount:</span>{" "}
                        &#8362;{order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Go Back Button */}
                  <button
                    onClick={closeOrderDetails}
                    className="bg-gray-700 text-white px-6 py-3 w-full rounded-b-lg focus:outline-none hover:bg-gray-800"
                  >
                    Go Back
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      ))}

      {/* Order Cards */}
      {orders.length === 0 ? (
        <EmptyOrdersMessage />
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 mx-auto max-w-7xl cursor-pointer">
          {orders.map((order: any) => (
            <div
              key={order.id}
              onClick={() => openOrderDetails(order.id)}
              className={`bg-white p-6 rounded-md shadow-md flex flex-col justify-between border border-gray-300 transition duration-300 ease-in-out ${order.status === "Approved"
                  ? "hover:shadow-green-300 hover:bg-green-50"
                  : order.status === "Pending"
                    ? "hover:shadow-orange-300 hover:bg-orange-50"
                    : "hover:shadow-red-300 hover:bg-red-50"
                }`}
            >
              <div>
                <p className="text-xl font-bold text-gray-800 mb-2">Order ID #{order.id} </p>
                <p className="text-sm text-gray-500 mb-4">Order Date: {order.date}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {order.items.map((item: any, index: any) => (
                    <div key={index} className="col-span-2 flex items-center">
                      <img
                        src={item.product.imageUrl} // Update with your image URL
                        alt={item.product.name}
                        className="w-6 h-6 object-cover rounded-full mr-2"
                      />
                      <p className="text-sm text-gray-800">{item.product.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Total Amount: &#8362;{order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Payment: {order.paymentInformation}</p>
                </div>
                <div className="flex items-center">
                  {order.status === "Approved" ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                  ) : order.status === "Declined" ? (
                    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                  ) : (
                    <span className="text-orange-500 mr-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full" />
                    </span>
                  )}
                  <p className="text-lg font-semibold">{order.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;