
import { useState } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              FlioKart
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-1 text-white hover:text-blue-400 transition-colors">
              <User className="h-5 w-5" />
              <span>Login</span>
            </button>

            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-white hover:text-blue-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartItemsCount})</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
