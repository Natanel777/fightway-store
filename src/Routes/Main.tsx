import { Fragment, useContext, useEffect, useState } from "react";
import mmaImage from "../Assets/MMAcolor.png"
import grapplingImage from "../Assets/grapplingImage.png"
import strikingImage from "../Assets/strikingImage.png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import CurrentPageContext from "Context/CurrentPageContext";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import logo from '../Assets/blackLogoReact.png'
import StoreContext from "Context/StoreContext";
import { useQuery } from "react-query";
import { storeCartRequest, storeRequest } from "services/store-service";
import AuthContext from "Context/AuthContext";
import { Transition, Dialog, RadioGroup } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import classNames from "utils/classNames";


//ATTENITON: I Did The Image Styiling Inside The Div So When I Reload The Page The Images Would Not Reload As Well
const Main = () => {
  //const { data: cartRes } = useQuery("get-cart-products", storeCartRequest)
  const { changeCurrentPage } = useContext(CurrentPageContext);
  const { isLoggedIn } = useContext(AuthContext)

  const { setProducts, products } = useContext(StoreContext)
  const { data: res } = useQuery("get-products", storeRequest)
  const [openProduct, setOpenProduct] = useState<number | null>(null);

  //console.log(cartRes)

  useEffect(() => {
    if (res && products.length === 0 && products.length !== res.data.length) {
      console.log(`all products: ${res}`)
      setProducts(res.data);
    }
  }, [products.length, res, setProducts])

  const typeProdcuts = products
    .filter(p => ["Protective Equipment", "BJJ - GI", "Punching Bags"].includes(p.type.toString()))
    .sort(() => Math.random() - 1);

  return (
    <div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 p-8">
        {/* Left Box (Striking) */}
        <NavLink to={"/striking"} onClick={() => changeCurrentPage("/striking")}>
          <div className="bg-orange-700 rounded-lg shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden" style={{
            height: '42rem', backgroundImage: `url(${strikingImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>


            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-orange-200 border border-orange-400 p-2 rounded-md backdrop-blur-lg">Striking</h2>
            </div>
          </div>
        </NavLink>

        {/* Middle Box (MMA) */}
        <NavLink to={"/store"} onClick={() => changeCurrentPage("/store")}>
          <div className="bg-red-900 rounded-lg shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden" style={{
            height: '42rem', backgroundImage: `url(${mmaImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>


            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-red-200 border border-red-400 p-2 rounded-md backdrop-blur-lg">MMA</h2>
            </div>
          </div>
        </NavLink>

        {/* Right Box (Grappling) */}
        <NavLink to={"/grappling"} onClick={() => changeCurrentPage("/grappling")}>
          <div className="bg-gray-700 rounded-lg shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden" style={{
            height: '42rem', backgroundImage: `url(${grapplingImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>


            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-gray-200 border border-gray-400 p-2 rounded-md backdrop-blur-lg">Grappling</h2>
            </div>
          </div>
        </NavLink>
      </div>


      {/* Swiper Slider */}

      <div className="flex items-center pt-10">
        <div className="my-8 items-center">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-orange-700 text-transparent bg-clip-text">Best Sellers</span>
          </h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, Navigation, FreeMode]}
            className="mySwiper w-screen-90 "
          >
            <div className="swiper-wrapper">
              {typeProdcuts.map((product) => (


                <SwiperSlide key={product.id}>
                  <button onClick={() => setOpenProduct(product.id)}>








                    <Transition.Root show={openProduct === product.id} as={Fragment}>
                      <Dialog as="div" className="relative z-10" onClose={() => setOpenProduct(null)}>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                              enterTo="opacity-100 translate-y-0 md:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 md:scale-100"
                              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                  <button
                                    type="button"
                                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                    onClick={() => setOpenProduct(null)}
                                  >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                  </button>

                                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                      <img src={product.imageUrl} alt={product.name} className="object-cover object-center" />
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                      <span className="sr-only">Product name</span>
                                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>


                                      <span id="information-heading" className="sr-only">Product price</span>
                                      <p className="text-2xl text-gray-900 mt-2">&#8362;{product.price.toFixed(2)}</p>

                                      <span id="information-heading" className="sr-only">Product description</span>
                                      <p className="text-2xl text-gray-900 mt-2">{product.description}</p>


  
                                          <NavLink to={`/store/${product.id}`}
                                          onClick={() => changeCurrentPage("/store")}
                                            type="submit"
                                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          >
                                            See More Details
                                          </NavLink>

                                    
                                    </div>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                    <div className="border border-gray-300 overflow-hidden rounded-lg shadow-md p-4 mx-auto text-center cursor-pointer">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">&#8362;{product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>

              ))}
            </div>
            <div className="swiper-scrollbar"></div>
          </Swiper>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="pt-10">
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <img className="mx-auto h-12" src={logo} alt="" />
            <figure className="mt-10">
              <div className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>
                  Explore premium gear for your training needs. Elevate your martial arts journey with our curated selection. Join us for an amazing experience!
                </p>
                <NavLink onClick={() => {isLoggedIn ? changeCurrentPage("/store") : changeCurrentPage("/signup")}} to={isLoggedIn ? "/store" : "/signup"} >
                  <button className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl transition duration-300 ease-in-out mt-14">
                    {isLoggedIn ? "Explore!" : "Join Us!"}
                  </button>
                </NavLink>
              </div>

            </figure>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main