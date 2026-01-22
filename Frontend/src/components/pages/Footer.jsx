import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Plot Point. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              to="/privacy-policy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact-us" className="hover:text-gray-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
