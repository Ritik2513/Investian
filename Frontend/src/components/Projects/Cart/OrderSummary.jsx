import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const OrderSummary = ({ discount }) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.inventory.price, 0);

  const total = Math.max(subtotal - discount, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
      <h3 className="text-xl font-medium">Order Summary</h3>

      <div className="flex justify-between mt-4">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-emerald-700 mt-2">
          <span>Discount</span>
          <span>- ₹{discount.toLocaleString()}</span>
        </div>
      )}

      <hr className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      <button
      onClick={()=>navigate("/checkout")}
      className="w-full border px-3 py-2 custom-bg text-white font-semibold rounded-lg cursor-pointer">
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
