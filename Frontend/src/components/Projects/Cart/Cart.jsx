import Navbar from "../../pages/Navbar";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import CartList from "./CartList";
import VoucherBox from "./VoucherBox";
import OrderSummary from "./OrderSummary";
import { useScrollToSection } from "../utils/useScrollToSection";
import { useState } from "react";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const scrollToSection = useScrollToSection();

  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);

  const handleApplyVoucher = (amount) => {
    setDiscount(amount);
    setVoucherApplied(amount > 0);
  };

  if (!cart.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            Browse Projects
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen pb-10 font-poppins">
        <div className="max-w-7xl mx-auto px-16 py-10">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 cursor-pointer mb-6 mt-20"
          >
            <IoIosArrowRoundBack />
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <sup className="ml-2 px-2 py-2 bg-gray-100 rounded border">
              {cart.length} items
            </sup>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* left */}
            <CartList />
            {/* right */}
            <div className="space-y-6 sticky top-24">
              <OrderSummary discount={discount} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
