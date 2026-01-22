import { FaRegTrashCan } from "react-icons/fa6";
import { useCart } from "../Context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  const { inventory, projectName, projectId } = item;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between">
      <div className="flex gap-4">
        <div>
          <p className="font-semibold">{projectName}</p>
          <p className="text-sm text-gray-600">
            Unit: {inventory.unit}
          </p>
          <p className="text-sm text-gray-500">
            {inventory.beds} Beds · {inventory.baths} Baths · {inventory.size}
          </p>
        </div>
      </div>

      <div className="text-right">
        {inventory.oldPrice && (
          <p className="line-through text-gray-500">
            ₹ {inventory.oldPrice.toLocaleString()}
          </p>
        )}
        <p className="text-xl font-bold">
          ₹ {inventory.price.toLocaleString()}
        </p>

        <button
          onClick={() =>
            removeFromCart(projectId, inventory.unit)
          }
          className="mt-2 flex items-center gap-2 text-red-600 hover:bg-gray-100 rounded-lg px-4 py-1"
        >
          <FaRegTrashCan /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
