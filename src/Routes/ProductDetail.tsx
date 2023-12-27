import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import StoreContext from 'Context/StoreContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useQuery } from 'react-query';
import { storeCartPostRequest, storeCartRequest, storeRequest } from 'services/store-service';
import CartContext from 'Context/CartContext';
import AuthContext from 'Context/AuthContext';

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
    const [isButtonAnimating, setIsButtonAnimating] = useState(false);
    const { setProducts, products } = useContext(StoreContext);
    const { cart, addToCart } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { data: res } = useQuery("get-products", storeRequest);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (res && products.length === 0 && products.length !== res.data.length) {
            setProducts(res.data);
        }
    }, [products.length, res, setProducts]);

    const product = products.find((p) => p.id.toString() === id);
    const typeProdcuts = products.filter((p) => p.type.toString() === product?.type);

    useEffect(() => {
        if (isButtonAnimating && product) {
            const animationTimeout = setTimeout(() => {
                setIsButtonAnimating(false);
            }, 1000);

            return () => clearTimeout(animationTimeout);
        }
    }, [addToCart, cart, isButtonAnimating, product, quantity]);

    const handleAddToCart = async () => {
        setIsButtonAnimating(true);

        try {
            if (product) {
                await addToCart({
                    quantity: quantity,
                    totalAmount: quantity * product.price,
                    product: product,
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            const animationTimeout = setTimeout(() => {
                setIsButtonAnimating(false);
                setQuantity(1);
            }, 1000);

            return () => clearTimeout(animationTimeout);
        }
    };

    return (
        <div>
            {/* Back Button */}
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                {product && (
                    <div className="bg-white p-8 max-w-2xl mx-auto rounded-md shadow-lg">
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Store
                        </button>

                        {/* Product */}
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

                                <div className="mt-4 flex items-center">
                                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                        Quantity:
                                    </label>
                                    <div className="ml-2 flex items-center">
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-12 appearance-none rounded-md border border-gray-300 p-2 text-sm text-gray-700 text-center"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-800 px-2 py-1 ml-2 rounded-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className={`bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-800 text-lg mt-8`}
                                    onClick={handleAddToCart}
                                    disabled={isButtonAnimating}
                                >
                                    {isButtonAnimating ? (
                                        <svg className="h-5 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) :
                                        (
                                            <>
                                                <ShoppingCartIcon className="h-5 w-6 mr-2" />
                                                Add To Cart
                                            </>
                                        )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestion */}
            <div className="bg-gray-800 text-white py-4 text-center font-bold text-xl mb-4">
                You May Also Like:
            </div>

            <Swiper
                className="mb-10 rounded-md shadow-lg items-center"
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
            >
                {typeProdcuts.map((p) => (
                    <SwiperSlide key={p.id} className="bg-gray-200 flex items-center justify-center">
                        <Link key={p.id} to={`/store/${p.id}`}>
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
