
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Wallet, Building, Smartphone, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  totalAmount: number;
}

const PaymentModal = ({ isOpen, onClose, onPaymentComplete, totalAmount }: PaymentModalProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, MasterCard, RuPay" },
    { id: "upi", name: "UPI", icon: Smartphone, description: "PhonePe, GooglePay, Paytm" },
    { id: "netbanking", name: "Net Banking", icon: Building, description: "All major banks" },
    { id: "wallet", name: "Wallets", icon: Wallet, description: "Paytm, MobiKwik, Amazon Pay" },
  ];

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Show success for 3 seconds then close
      setTimeout(() => {
        setShowSuccess(false);
        onPaymentComplete();
        onClose();
        // Clear cart after successful payment
        localStorage.setItem('cartItems', JSON.stringify([]));
        // Reload to update cart state
        window.location.reload();
      }, 3000);
    }, 2000);
  };

  const resetModal = () => {
    setSelectedPayment("");
    setIsProcessing(false);
    setShowSuccess(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700"
          >
            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-4"
                >
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Order Placed Successfully!
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-4"
                >
                  Thank you for your purchase. Your order will be delivered soon!
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-xl"
                >
                  <p className="text-white font-semibold">Amount Paid: ₹{totalAmount}</p>
                </motion.div>
              </motion.div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Choose Payment Method</h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl mb-4">
                    <div className="text-white text-center">
                      <p className="text-sm opacity-90">Total Amount</p>
                      <p className="text-2xl font-bold">₹{totalAmount}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-blue-500 bg-blue-600/10'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-6 w-6 text-blue-400" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{method.name}</h3>
                          <p className="text-gray-400 text-sm">{method.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {selectedPayment === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full rounded-full bg-white"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={!selectedPayment || isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    selectedPayment && !isProcessing
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    'Proceed to Pay'
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
