import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CurrentPageContext from 'Context/CurrentPageContext'
import StoreContext from 'Context/StoreContext'
import { Fragment, ReactNode, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { storeRequest } from 'services/store-service'
import classNames from 'utils/classNames'

interface FilterStoreProps {
    additionalComponent: ReactNode;
    filtersSection: {
        onNewestClick: () => void;
        onPriceAscClick: () => void;
        onPriceDescClick: () => void;
        onSubcategoryClick: (subcategory: string | null) => void;
    };
}


const FilterStore: React.FC<FilterStoreProps> = ({ additionalComponent, filtersSection }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [currentSort, setCurrentSort] = useState("Newest")
    const { currentPage } = useContext(CurrentPageContext)
    const { setProducts, products } = useContext(StoreContext)
    const { data: res } = useQuery("get-category-products", storeRequest)
    var types: string[] = [];

    var page = currentPage.substring(currentPage.lastIndexOf('/') + 1);

    //if products doesnt exsist
    useEffect(() => {
        if (res && products.length === 0 && products.length !== res.data.length) {
            setProducts(res.data);
        }
    }, [products.length, res, setProducts])

    if (page === 'store') {
        types = Array.from(new Set(products.map(product => product.type))).sort();


    } else {
        types = Array.from(
            new Set(products
                .filter(product => page.toLowerCase() === product.category?.name.toLowerCase())
                .map(product => product.type)
            )
        );
    }

    const sortOptions = [
        { name: 'Newest', onClick: () => { filtersSection.onNewestClick() }, current: currentSort === 'Newest' },
        { name: 'Price: Low to High', onClick: () => { filtersSection.onPriceAscClick() }, current: currentSort === 'Price: Low to High' },
        { name: 'Price: High to Low', onClick: () => { filtersSection.onPriceDescClick() }, current: currentSort === 'Price: High to Low' },
    ]

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters Small Screen*/}
                                    <div className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categorie Filter</h3>
                                        <ul className="px-2 py-3 font-medium text-gray-900">
                                            {types.map((type) => (
                                                <li key={type} className="py-2">
                                                    <button
                                                        className="block transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none focus:text-blue-500 px-2 py-1"
                                                        onClick={() => filtersSection.onSubcategoryClick(type)}
                                                    >
                                                        {type}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* start of the filter */}
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 onClick={() => window.location.reload()} className={`cursor-pointer text-4xl font-extrabold tracking-tight transition-colors duration-300 ease-in-out transform hover:scale-105`}>
                            {page === "store" ? "MMA" : page.toUpperCase()}
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    {/* Sort items */}
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <div
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                            onClick={() => {
                                                                option.onClick();
                                                                setCurrentSort(option.name);
                                                            }}
                                                        >
                                                            {option.name}
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* Filters */}
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                            {/* Filters */}
                            <div className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="border-b border-gray-200 pb-4 text-sm font-medium text-gray-900">
                                    {types.map((type) => (
                                        <li key={type} className="py-2">
                                            <button
                                                className="block transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none focus:text-blue-500"
                                                onClick={() => filtersSection.onSubcategoryClick(type)}
                                            >
                                                {type}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {additionalComponent ? additionalComponent : <NavLink to={"/404"}></NavLink>}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default FilterStore

