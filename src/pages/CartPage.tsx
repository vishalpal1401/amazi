
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";
import { CartItem } from "./Index";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cartItems');
      const items = savedCart ? JSON.parse(savedCart) : [];
      setCartItems(items);
    };

    loadCartItems();
    
    // Listen for storage changes to update cart when modified from other components
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom cart update events
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const updateCartInStorage = (updatedItems: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      const updatedItems = cartItems.filter(item => item.id !== id);
      updateCartInStorage(updatedItems);
    } else {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      updateCartInStorage(updatedItems);
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCartInStorage(updatedItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePaymentComplete = () => {
    // Clear cart after successful payment
    updateCartInStorage([]);
    alert("🎉 Order Placed Successfully! Thank you for your purchase.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar cartItemsCount={getTotalItems()} onCartClick={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-white">Shopping Cart ({getTotalItems()} items)</h1>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some products to get started!</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <div className="flex items-center space-x-6">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-2xl font-bold text-blue-400">₹{item.price}</span>
                        <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="text-white text-xl font-semibold px-4">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg h-fit sticky top-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                Proceed to Checkout
              </motion.button>

              <div className="bg-gradient-to-r from-green-800 to-green-900 p-4 rounded-xl border border-green-600">
                <div className="text-green-300 text-sm space-y-1">
                  <p>✓ Free delivery on this order</p>
                  <p>✓ 7-day replacement guarantee</p>
                  <p>✓ Secure payments</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        totalAmount={getTotalPrice()}
      />
    </div>
  );
};

export default CartPage;
