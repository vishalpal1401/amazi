
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "../pages/Index";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 2999,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1284,
      description:
        "Experience premium sound quality with noise cancellation technology.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charging",
        "Bluetooth 5.0",
      ],
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 1999,
      originalPrice: 3499,
      image:
        "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 892,
      description: "Track your fitness goals with this advanced smartwatch.",
      features: [
        "Heart rate monitor",
        "GPS tracking",
        "Water resistant",
        "7-day battery",
      ],
      category: "Electronics",
    },
    {
      id: 3,
      name: "Stylish Backpack",
      price: 899,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 567,
      description: "Durable and stylish backpack perfect for daily use.",
      features: [
        "Water resistant",
        "Multiple compartments",
        "Ergonomic design",
        "15.6 laptop compartment",
      ],
      category: "Fashion",
    },
    {
      id: 4,
      name: "Gaming Mechanical Keyboard",
      price: 3499,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 2341,
      description: "Professional gaming keyboard with RGB lighting.",
      features: [
        "Mechanical switches",
        "RGB backlighting",
        "Programmable keys",
        "Durable construction",
      ],
      category: "Electronics",
    },
    {
      id: 5,
      name: "Comfort Living Chair",
      price: 12999,
      originalPrice: 18999,
      image:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 445,
      description: "Ergonomic chair designed for maximum comfort.",
      features: [
        "Ergonomic design",
        "Adjustable height",
        "Premium materials",
        "360° swivel",
      ],
      category: "Home",
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 799,
      originalPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
      rating: 4.1,
      reviews: 234,
      description: "Precision wireless mouse for productivity and gaming.",
      features: [
        "Wireless connectivity",
        "Precision tracking",
        "Long battery life",
        "Ergonomic grip",
      ],
      category: "Electronics",
    },
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 2999,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1284,
      description:
        "Experience premium sound quality with noise cancellation technology.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charging",
        "Bluetooth 5.0",
      ],
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 1999,
      originalPrice: 3499,
      image:
        "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 892,
      description: "Track your fitness goals with this advanced smartwatch.",
      features: [
        "Heart rate monitor",
        "GPS tracking",
        "Water resistant",
        "7-day battery",
      ],
      category: "Electronics",
    },
    {
      id: 3,
      name: "Stylish Backpack",
      price: 899,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 567,
      description: "Durable and stylish backpack perfect for daily use.",
      features: [
        "Water resistant",
        "Multiple compartments",
        "Ergonomic design",
        "15.6 laptop compartment",
      ],
      category: "Fashion",
    },
    {
      id: 4,
      name: "Gaming Mechanical Keyboard",
      price: 3499,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 2341,
      description: "Professional gaming keyboard with RGB lighting.",
      features: [
        "Mechanical switches",
        "RGB backlighting",
        "Programmable keys",
        "Durable construction",
      ],
      category: "Electronics",
    },
    {
      id: 5,
      name: "Comfort Living Chair",
      price: 12999,
      originalPrice: 18999,
      image:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 445,
      description: "Ergonomic chair designed for maximum comfort.",
      features: [
        "Ergonomic design",
        "Adjustable height",
        "Premium materials",
        "360° swivel",
      ],
      category: "Home",
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 799,
      originalPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
      rating: 4.1,
      reviews: 234,
      description: "Precision wireless mouse for productivity and gaming.",
      features: [
        "Wireless connectivity",
        "Precision tracking",
        "Long battery life",
        "Ergonomic grip",
      ],
      category: "Electronics",
    }
  ];

  const categories = ["All", "Electronics", "Fashion", "Home"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured Products
        </h2>
        <p className="text-gray-300 text-lg">
          Discover our best deals and trending items
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-white font-bold text-xl">₹{product.price}</span>
                    <span className="text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
