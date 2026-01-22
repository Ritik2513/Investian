import { useCart } from "../Context/CartContext";
import CartItem from "./CartItem";

const CartList = () => {
  const { cart } = useCart();

  return (
    <div className="lg:col-span-2 flex flex-col space-y-6">
      {cart.map((item) => (
        <CartItem
          key={`${item.projectId}-${item.inventory.unit}`}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartList;
