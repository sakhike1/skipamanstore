import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white/70">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">THREAD<span className="text-white">AI</span></h3>
            <p className="mb-4">
              Elevating your style with AI-inspired designs and premium quality t-shirts.
              Sustainable fashion for the modern age.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} className="text-white/70 hover:text-white" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} className="text-white/70 hover:text-white" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} className="text-white/70 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Shop All</a></li>
              <li><a href="/new" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="/size-guide" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-white/70 flex-shrink-0 mt-1" />
                <span>123 Design District, Creative City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-white/70 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-white/70 flex-shrink-0" />
                <span>hello@threadai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Skipaman. All rights reserved.</p>
          <p className="mt-2">
            Made with care for both style and sustainability.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;