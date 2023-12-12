import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../Assets/blackLogoReact.png';

const Support = () => {
    return (
        <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <img className="mx-auto h-16 w-auto mb-6" src={logo} alt="Fight Way Logo" />
            <div className="text-3xl font-bold mb-6">Contact Us</div>
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md text">
                <p className="text-xl mb-4 text-center">
                    Feel free to reach out to us using the following contact details
                </p>
                <div className="flex items-center mb-2">
                    <FiMapPin className="text-gray-500 mr-2" />
                    <p>123 Fightway Street, Cityville, Israel</p>
                </div>
                <div className="flex items-center mb-2">
                    <FiPhone className="text-gray-500 mr-2" />
                    <p>+1 234 567 8901</p>
                </div>
                <div className="flex items-center mb-2">
                    <FiMail className="text-gray-500 mr-2" />
                    <p>support@fightway.com</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Support;