import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { type Product } from '../types';
import { useCart } from '../contexts/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, cartItems } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const isInCart = useMemo(() => cartItems.some(item => item.id === product.id), [cartItems, product.id]);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
            <div className="h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-gray-700 mt-2 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">EGP {product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isInCart || isAdded}
                        className={`px-4 py-2 rounded-full transition-colors font-semibold ${
                        isInCart
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : isAdded 
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                    >
                        {isInCart ? 'In Cart' : isAdded ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const productsData = await api.getProducts();
      setProducts(productsData);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Travel & Safari Store</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Gear up for your next adventure.</p>

      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
