
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4 flex items-center">
              <div className="w-8 h-8 bg-lanka-green rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              Lanka Agri
            </h3>
            <p className="mb-4">Connecting Sri Lankan farmers directly to consumers, bringing fresh, quality agricultural products to your doorstep while supporting local communities.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-lanka-green">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-lanka-green">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-lanka-green">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-lanka-green transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-lanka-green transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-lanka-green transition-colors">Categories</Link></li>
              <li><Link to="/farmers" className="hover:text-lanka-green transition-colors">Our Farmers</Link></li>
              <li><Link to="/about" className="hover:text-lanka-green transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/vegetables" className="hover:text-lanka-green transition-colors">Vegetables</Link></li>
              <li><Link to="/category/fruits" className="hover:text-lanka-green transition-colors">Fruits</Link></li>
              <li><Link to="/category/grains" className="hover:text-lanka-green transition-colors">Grains & Rice</Link></li>
              <li><Link to="/category/spices" className="hover:text-lanka-green transition-colors">Spices</Link></li>
              <li><Link to="/category/coconut" className="hover:text-lanka-green transition-colors">Coconut Products</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-lanka-green" />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-lanka-green" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-lanka-green" />
                <span>info@lankaagri.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 Lanka Agri Market. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm">
            <Link to="/terms" className="hover:text-lanka-green">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-lanka-green">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
