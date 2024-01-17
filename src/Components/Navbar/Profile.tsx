import { Menu, Transition } from '@headlessui/react'
import AuthContext from 'Context/AuthContext'
import CurrentPageContext from 'Context/CurrentPageContext'
import { Fragment, useContext } from 'react'
import { FaUserCircle } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import authService from 'services/auth-service'
import classNames from '../../utils/classNames'



const Profile = () => {
    const { isLoggedIn, logout } = useContext(AuthContext)
    const { changeCurrentPage } = useContext(CurrentPageContext)
    const userIsAdmin = authService.isAdmin();

    return (
        <div>{isLoggedIn ? (<Menu as="div" className="relative ml-4">
            <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <FaUserCircle className="h-8 w-8 rounded-full bg-gray-800 text-gray-400" />
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
                    {userIsAdmin && <Menu.Item>
                        {({ active }) => (
                            <NavLink
                                to="/ordermanager"
                                onClick={() => changeCurrentPage("/ordermanager")}
                                className={classNames(
                                    active ? 'bg-yellow-200' : '',
                                    'block px-4 py-2 text-sm text-gray-700 bg-yellow-50 font-bold' // Add font-bold for unique font
                                )}
                            >
                                Order Manager
                            </NavLink>
                        )}
                    </Menu.Item>}

                    <Menu.Item>
                        {({ active }) => (
                            <NavLink
                                to="/recentorders"
                                onClick={() => changeCurrentPage("/recentorders")}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Recent Orders
                            </NavLink>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <NavLink
                                to="/about"
                                onClick={() => changeCurrentPage("/about")}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}
                            >
                                About
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
                            <NavLink
                                to="/main"
                                onClick={() => { logout(); changeCurrentPage("/main") }}
                                className={classNames(active ? 'bg-red-200' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                Sign out
                            </NavLink>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>) : (
            <NavLink
                to="/login"
                className="text-sm font-semibold text-gray-300 hover:bg-gray-700 hover:text-white rounded-full border px-8 py-2 ml-4"
                onClick={() => isLoggedIn}
            >

                Login
            </NavLink>
        )}</div>
    )
}

export default Profile