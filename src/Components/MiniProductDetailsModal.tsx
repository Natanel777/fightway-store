import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product } from 'utils/types';

interface ProductDetailsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    product: Product;
  }

const MiniProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
    isOpen,
    onRequestClose,
    product,
  }) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onRequestClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative z-10 w-full max-w-md">
                <div className="bg-white p-6 shadow-xl">
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {product.name}
                    </Dialog.Title>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={onRequestClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  {/* Add more product details here */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="mt-4 rounded-lg"
                  />
                  <p className="mt-4 text-gray-500">{product.description}</p>
                  <p className="mt-2 text-lg font-medium text-gray-900">
                    Price: {product.price}
                  </p>
                  {/* Add more product details as needed */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MiniProductDetailsModal;