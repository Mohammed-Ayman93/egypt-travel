
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Icon } from './Icon';

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-600">Egypt <span className="text-orange-500">Travel</span></a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</a>
          <a href="#/trips" className="text-gray-600 hover:text-blue-600 transition duration-300">Trips</a>
          <a href="#/destinations" className="text-gray-600 hover:text-blue-600 transition duration-300">Destinations</a>
          <a href="#/vendors" className="text-gray-600 hover:text-blue-600 transition duration-300">Companies</a>
          <a href="#/store" className="text-gray-600 hover:text-blue-600 transition duration-300">Store</a>
        </div>
        <div className="flex items-center gap-4">
            <a href="#/cart" className="relative text-gray-600 hover:text-blue-600 transition duration-300">
                <Icon name="cart" className="w-7 h-7" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </a>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-sm">
              Sign In
            </a>
        </div>
      </nav>
    </header>
  );
};