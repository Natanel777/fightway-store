import { Fragment, useContext, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../Assets/logoReact.png';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import AuthContext from 'Context/AuthContext';
import CurrentPageContext from 'Context/CurrentPageContext';

const navigation = [
    { name: 'Store', href: '/store' },
    { name: 'Grappling', href: '/grappling' },
    { name: 'Striking', href: '/striking' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const { isLoggedIn, logout } = useContext(AuthContext)
    // const [currentItem, setCurrentItem] = useState<string | null>('/store');

    const {currentPage, changeCurrentPage} = useContext(CurrentPageContext)
    

    // const handleItemClick = (item: { name: string | null }) => {
    //     setCurrentItem(item.name);
    //     console.log(currentItem)
    // };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                              {/* Store Logo */}              
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <NavLink to={"/main"} onClick={() => changeCurrentPage("/main")}>
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Fight Way Logo"
                                        />
                                    </NavLink>
                                </div>
                                
                                {/* Category Items */}   
                                <div className="hidden sm:ml-6 sm:flex sm:flex-grow sm:items-center sm:justify-center">
                                    <div className="flex space-x-6">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                onClick={() => changeCurrentPage(item.href)}

                                                className={classNames(
                                                    item.href === currentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.href === currentPage ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View Cart</span>
                                    <PiShoppingCartSimpleFill className="h-6 w-6" aria-hidden="true" />
                                    <div className='bg-red-700 rounded-md text-xs absolute -top-1 -right-1 px-1 -mx-1 text-gray-200'>0</div>

                                </button>

                                {/* Profile dropdown */}

                                {isLoggedIn ? (<Menu as="div" className="relative ml-4">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt="Profile"
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/about"
                                                        onClick={() => changeCurrentPage("/about")}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Recent Orders
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/support"
                                                        onClick={() => changeCurrentPage("/support")}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}
                                                    >
                                                        Support
                                                    </NavLink>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        Sign out
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>) : (
                                    <NavLink
                                        to="/login"
                                        className="text-sm font-semibold text-gray-300 hover:bg-gray-700 hover:text-white rounded-full border px-8 py-2 ml-4"
                                        onClick={ () => isLoggedIn}
                                    >
                                        
                                        Login
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button key={item.name}>
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => changeCurrentPage(item.href)}
                                        className={classNames(
                                            item.href === currentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.href === currentPage ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </NavLink>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}