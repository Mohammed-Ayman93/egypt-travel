import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Icon } from '../components/Icon';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <a href="#/store" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Go to Store
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-semibold text-blue-600">EGP {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  className="w-16 p-1 border rounded-md text-center"
                />
              </div>
              <div className="font-bold w-24 text-right">EGP {(item.price * item.quantity).toLocaleString()}</div>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 p-2">
                <Icon name="trash" className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-28 border">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>EGP {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>EGP {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-orange-500 text-white font-bold py-3 rounded-lg text-lg hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
