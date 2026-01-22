import { IoIosArrowRoundBack } from "react-icons/io";
import { FiCheckCircle, FiTag } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import Navbar from "../../pages/Navbar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import VoucherBox from "../Cart/VoucherBox";
import { useEffect, useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);

  /* SAFE REDIRECT */
  useEffect(() => {
    if (!cart.length) navigate("/cart");
  }, [cart, navigate]);

  if (!cart.length) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.inventory.price, 0);

  const total = Math.max(subtotal - discount, 0);

  const handleApplyVoucher = (amount) => {
    if (voucherApplied) return;
    setDiscount(amount);
    setVoucherApplied(amount > 0);
  };

  return (
    <>
      <Navbar />

      <section className="font-poppins bg-gray-50 min-h-screen pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-18">
          {/* Back Button */}
          <div
            onClick={() => navigate(-1)}
            className="flex gap-2 cursor-pointer py-4 items-center"
          >
            <IoIosArrowRoundBack className="text-gray-500" size={22} />
            <p className="font-semibold text-2xl">Back to Cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            {/* LEFT SECTION */}
            <div className="lg:col-span-2 flex flex-col space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl px-6 py-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>

                <form className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="fullname"
                      className="text-sm font-medium mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      placeholder="John Doe"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:border-black focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:border-black focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="mobile"
                      className="text-sm font-medium mb-1"
                    >
                      Mobile *
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      placeholder="9876543210"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:border-black focus:ring-0 outline-none"
                    />
                  </div>
                </form>
              </div>

              <VoucherBox
                onApply={handleApplyVoucher}
                disabled={voucherApplied}
              />

              {/* Complete Booking Button */}
              <button className="custom-bg text-center text-white py-4 rounded-lg font-semibold text-xl flex items-center justify-center gap-3 transition hover:bg-gray-800">
                Complete Booking
                <FiCheckCircle size={20} />
              </button>
            </div>

            {/* RIGHT SECTION - ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                    Order Summary
                  </h3>

                  {/* CART ITEMS */}
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div
                        key={`${item.projectId}-${item.inventory.unit}`}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="custom-bg p-3 rounded-xl shrink-0">
                            <LuBuilding2 size={20} className="text-white" />
                          </div>

                          <div>
                            <p className="font-medium text-gray-800 leading-tight">
                              {item.projectName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Unit: {item.inventory.unit}
                            </p>
                          </div>
                        </div>

                        <p className="font-semibold text-gray-800 text-right sm:text-left flex gap-2">
                          <span>₹ </span>{" "}
                          {item.inventory.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* DIVIDER */}
                  <hr className="border-gray-200 my-4" />

                  {/* SUBTOTAL */}
                  <div className="flex justify-between text-gray-700 mb-3">
                    <p className="text-sm sm:text-base">Subtotal</p>
                    <p className="font-medium">₹ {subtotal.toLocaleString()}</p>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 mt-2">
                      <span>Discount</span>
                      <span>- ₹ {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <hr className="border-gray-200 my-4" />

                  {/* TOTAL */}
                  <div className="flex justify-between items-center">
                    <p className="text-base sm:text-lg font-semibold">Total</p>
                    <p className="text-lg sm:text-xl font-bold custom-text">
                      ₹ {total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
