import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";
import { Product } from "./Index";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Mock product data - in real app, this would come from API
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 2999,
      originalPrice: 4999,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=600&fit=crop",
      rating: 4.5,
      reviews: 1284,
      description: "Experience premium sound quality with advanced noise cancellation technology. These headphones deliver exceptional audio clarity and comfort for extended listening sessions.",
      features: ["Active Noise Cancellation", "30-hour battery life", "Quick charging (15 min = 3 hours)", "Bluetooth 5.0", "Premium leather padding", "Foldable design"],
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 1999,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=600&fit=crop",
      rating: 4.3,
      reviews: 892,
      description: "Track your fitness goals with this advanced smartwatch featuring comprehensive health monitoring and GPS tracking capabilities.",
      features: ["Heart rate monitor", "GPS tracking", "Water resistant IP68", "7-day battery life", "Sleep tracking", "Multiple sport modes"],
      category: "Electronics"
    },
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id || ""));
    setProduct(foundProduct || null);
  }, [id]);

  const handlePaymentComplete = () => {
    alert("🎉 Order Placed Successfully! Thank you for your purchase.");
  };

  const handleAddToCart = () => {
    // This would be handled by parent component in real app
    alert("Product added to cart!");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // In real app, multiple images

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar cartItemsCount={0} onCartClick={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500 shadow-lg shadow-blue-500/50'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {product.name}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4 mb-4"
              >
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-gray-400 ml-2">({product.reviews} reviews)</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-white">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-green-400 font-semibold">You save ₹{product.originalPrice - product.price}!</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-white font-semibold mb-3">Product Description</h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-white font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="bg-gradient-to-r from-green-800 to-green-900 p-4 rounded-xl border border-green-600"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-300 font-semibold">Special Offers</span>
              </div>
              <ul className="text-green-200 text-sm space-y-1">
                <li>• Free delivery on orders above ₹499</li>
                <li>• 7-day replacement guarantee</li>
                <li>• No cost EMI available</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        totalAmount={product.price}
      />
    </div>
  );
};

export default ProductDetail;
