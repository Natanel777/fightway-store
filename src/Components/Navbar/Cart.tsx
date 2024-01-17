import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import CartContext from 'Context/CartContext';
import { NavLink } from 'react-router-dom';
import CurrentPageContext from 'Context/CurrentPageContext';



const Cart = () => {

  const [open, setOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0);
  const {changeCurrentPage} = useContext(CurrentPageContext)

  useEffect(() => {
    const calculatedTotalPrice = cart.reduce((sum, cartItem) => sum + cartItem.totalAmount, 0);
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  return (
    <div>
      {/* Icon Cart */}
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View Cart</span>
        <PiShoppingCartSimpleFill className="h-6 w-6" aria-hidden="true" />
        <div className='bg-red-700 rounded-md text-xs absolute -top-1 -right-1 px-1 -mx-1 text-gray-200'>{cart.length}</div>

      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          {cart.length === 0 ? (
                            <div className="flex center items-center justify-center">
                              <p className="text-lg text-gray-500">Your cart is empty</p>
                              <img 
                              src={"https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"} 
                              onClick={() => setOpen(false)}
                              alt="Empty Cart" 
                              className="ml-4 w-16 h-16 cursor-pointer" />
                            </div>
                          ) : (
                            <div className="flow-root">
                              <ul className="-my-6 divide-y divide-gray-200">
                                {cart.map((cart) => (
                                  <li key={cart.product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <NavLink to={`/store/${cart.product.id}`} onClick={() => setOpen(!open)}>
                                        <img
                                          src={cart.product.imageUrl}
                                          alt={cart.product.name}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      </NavLink>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <NavLink 
                                            to={`/store/${cart.product.id}`} 
                                            onClick={() => {setOpen(!open); changeCurrentPage("/store")}}>{cart.product.name}</NavLink>
                                          </h3>
                                          <p className="ml-4">&#8362;{cart.product.price.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{cart.product.category?.name}</p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">




                                        <div className="flex items-center">
                                          <label htmlFor={`quantity-${cart.product.id}`} className="mr-2">
                                            Quantity
                                          </label>
                                          <div className="border border-gray-300 rounded-md p-1 flex items-center">
                                            <button
                                              type="button"
                                              onClick={() => updateQuantity(cart.product.id, Math.max(1, cart.quantity - 1))}
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
                                            <input
                                              id={`quantity-${cart.product.id}`}
                                              type="number"
                                              value={cart.quantity}
                                              onChange={(e) => updateQuantity(cart.product.id, parseInt(e.target.value))}
                                              readOnly
                                              className="w-10 appearance-none rounded-md border-none p-1 text-sm text-gray-700 text-center focus:outline-none"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => updateQuantity(cart.product.id, cart.quantity + 1)}
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
                                        </div>


                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-red-600 hover:text-red-500"
                                            onClick={() => { removeFromCart(cart.product.id) }}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>&#8362;{totalPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <NavLink
                            to="/cartdetails"
                            onClick={() => {setOpen(false); changeCurrentPage("/cartdetails")}}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </NavLink>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
export default Cart