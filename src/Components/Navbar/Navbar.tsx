import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Cart from 'Components/Navbar/Cart';
import CurrentPageContext from 'Context/CurrentPageContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'utils/classNames';
import logo from '../../Assets/logoReact.png';
import Profile from './Profile';

const navigation = [
    { name: 'Store', href: '/store' },
    { name: 'Striking', href: '/striking' },
    { name: 'Grappling', href: '/grappling' },
]

export default function Navbar() {

    const { currentPage, changeCurrentPage } = useContext(CurrentPageContext)

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

                            {/* Cart */} {/* Profile dropdown */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Cart />
                                <Profile />
                            </div>
                        </div>
                    </div>

                    {/* Category Items Mobile size */}
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