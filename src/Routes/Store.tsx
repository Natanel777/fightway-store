import FilterStore from "Components/FilterStore/FilterStore"
import StoreContext from "Context/StoreContext"
import { useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { storeRequest } from "services/store-service"



const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
]
const Store = () => {

      const {isLoading, data:res} = useQuery("get-products", storeRequest)
      const {setProducts} = useContext(StoreContext);

      useEffect(() => {
        //effect that runs once when the component is loaded
        //AND each time res changes
        if(res){
          setProducts(res.data);
        }
    
      },[res, setProducts])
      
  return (
    <div>
      <FilterStore additionalComponent=
        {
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:p-8 xl:p-0">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                {res?.data.map((product:any) => (
                  <div key={product.id} className="border border-gray-300 overflow-hidden rounded-lg shadow-md p-2">
                  <Link key={product.id} to={`/store/${product.id}`} className="group">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 relative w-full pt-p-100">
                      <img 
                        src={product.imageUrl}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="text-center">
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">&#8362;{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        } />

        
    </div>
  )
}

export default Store