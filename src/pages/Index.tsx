
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cartItems]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('cartItems');
      const items = savedCart ? JSON.parse(savedCart) : [];
      setCartItems(items);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <Navbar 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => {}} 
      />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ProductGrid onAddToCart={addToCart} />
      </motion.div>
      
      {/* View Cart Button */}
      {getTotalItems() > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link to="/cart">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Cart ({getTotalItems()})</span>
            </motion.button>
          </Link>
        </motion.div>
      )}

      <Footer />
      <Cart
        isOpen={false}
        onClose={() => {}}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </motion.div>
  );
};

export default Index;
