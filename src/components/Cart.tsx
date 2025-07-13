
import { X } from "lucide-react";
import { CartItem } from "../pages/Index";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Shopping Cart ({getTotalItems()})</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                      <p className="text-blue-400 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white px-3">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-xl font-bold text-blue-400">₹{getTotalPrice()}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
