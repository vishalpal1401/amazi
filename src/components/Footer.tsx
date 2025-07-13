
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About FlioKart</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Payments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Policy</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Social</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 FlioKart. All rights reserved. | Made with ❤️ for amazing shopping experience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
