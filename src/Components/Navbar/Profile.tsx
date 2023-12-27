import { Menu, Transition } from '@headlessui/react'
import AuthContext from 'Context/AuthContext'
import CurrentPageContext from 'Context/CurrentPageContext'
import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from '../../utils/classNames'
import { logout } from 'services/auth-service'


const Profile = () => {
    var a = classNames(" ")
    const { isLoggedIn, logout } = useContext(AuthContext)
    const { changeCurrentPage } = useContext(CurrentPageContext)

    return (
        <div>{isLoggedIn ? (<Menu as="div" className="relative ml-4">
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
                                to="/404"
                                onClick={() => changeCurrentPage("/404")}
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
                            <div
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                onClick={() => logout()}>
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
                onClick={() => isLoggedIn}
            >

                Login
            </NavLink>
        )}</div>
    )
}

export default Profile