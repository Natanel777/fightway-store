import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import StoreContext from 'Context/StoreContext';
import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useQuery } from 'react-query';
import { storeRequest } from 'services/store-service';

interface ProductDetailsProps {
    product: {
        id: number;
        description: string;
        image_url?: string;
        name: string;
        price: number;
        type: string;
    };
}

const ProductDetails = () => {

    const { id } = useParams();

    const {setProducts, products } = useContext(StoreContext)

    const {data:res} = useQuery("get-products", storeRequest)

    const navigate = useNavigate();

    // Added it so it will not open the product from bottom
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (products.length === 0 && res) {
        setProducts(res.data);
    }
    console.log(products)
    const product = products.find(p => p.id.toString() === id)
    const typeProdcuts = products.filter(p => p.type.toString() === product?.type)

    return (
        <div>
            <div className='bg-gray-100'>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                {product && <div className="bg-white p-8 max-w-2xl mx-auto rounded-md shadow-lg">
                    <button
                        onClick={() => navigate("/store")}
                        className="flex items-center text-gray-600 hover:text-gray-800 text-lg focus:outline-none mb-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="md:col-span-1">
                            {product.imageUrl && (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full rounded-md shadow-md"
                                />
                            )}
                        </div>

                        <div className="md:col-span-1">
                            <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                            <p className="text-2xl text-gray-800 mb-4">&#8362;{product.price.toFixed(2)}</p>
                            <p className="text-lg text-gray-700 mb-6">{product.description}</p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-medium text-gray-600">Type: {product.type}</p>
                                </div>
                            </div>

                            <button
                                className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-800 text-lg mt-8"
                                onClick={() => { }}
                            >
                                <ShoppingCartIcon className="h-5 w-6 mr-2" />
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="bg-gray-800 text-white py-4 text-center font-bold text-xl mb-4">
                You May Also Like:
            </div>
            </div>
            
            <Swiper className="mb-10 rounded-md shadow-lg items-center"
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation

            >
     {typeProdcuts.map((p) => (
                    <SwiperSlide key={p.id} className="bg-gray-200 flex items-center justify-center">
                        <Link  key={p.id} to={`/store/${p.id}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded-md shadow-md" />
                            <div className="mt-2">
                                <h3 className="text-m font-medium">{p.name}</h3>
                                <p className="text-s text-gray-600">&#8362;{p.price.toFixed(2)}</p>
                                </div>
                        </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductDetails;