import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Projects/Context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md font-poppins px-4 md:px-10 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/Logo/logo.png"
            alt="Logo"
            className="w-16 h-16 md:w-12 md:h-12"
          />
          <span className="font-semibold text-xl md:text-xl font-serif">
            Plot Point
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-600 text-sm">
          <li
            onClick={() => scrollToSection("projects")}
            className="hover:text-black cursor-pointer transition"
          >
            Projects
          </li>
          <li
            onClick={() => scrollToSection("about")}
            className="hover:text-black cursor-pointer transition"
          >
            About
          </li>
          <Link
            to="/contact-us"
            className="hover:text-black cursor-pointer transition"
          >
            Contact
          </Link>
        </ul>

        {/* Icons & Sign In */}
        <div className="hidden md:flex gap-4 items-center">
          <div className="relative" onClick={()=>navigate("/cart")}>
            <FaCartShopping className="text-gray-600 text-sm cursor-pointer" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-semibold h-4 w-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate("/signin")}
            className="flex gap-2 items-center bg-[#1F242E] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-xs cursor-pointer"
          >
            <FaRegUser /> Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 rounded-md w-full absolute left-0 px-4 py-4">
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="hover:text-sky-500 cursor-pointer transition">
              Projects
            </li>
            <li className="hover:text-sky-500 cursor-pointer transition">
              About
            </li>
            <Link
              to="/contact-us"
              className="hover:text-sky-500 cursor-pointer transition"
            >
              Contact
            </Link>
          </ul>
          <div className="flex gap-4 mt-4 items-center">
            <FaCartShopping className="text-gray-600 text-xl hover:text-sky-500 transition cursor-pointer" />
            <button className="flex gap-2 items-center bg-[#1F242E] text-sky-500 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              <FaRegUser /> Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
