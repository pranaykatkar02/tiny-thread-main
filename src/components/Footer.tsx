import { Link } from "react-router-dom";
import SocialMediaFooter from "./SocialMediaFooter";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* optional social strip (keep if you have the component) */}
      <SocialMediaFooter />

      <div className="w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / Description */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="font-heading text-2xl text-pink-500">
                Tiny Threads
              </h3>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Dress up your little ones in magical themed outfits that spark
              imagination and joy.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/store" className="hover:text-pink-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-pink-500">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/login" className="hover:text-pink-500">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-pink-500">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">
              Contact
            </h4>
            <p className="text-sm text-gray-600">
              Email: hello@tinythreads.com
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Tiny Threads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
