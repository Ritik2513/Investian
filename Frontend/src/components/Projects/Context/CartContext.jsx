import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.some(
      (c) =>
        c.projectId === item.projectId &&
        c.inventory.unit === item.inventory.unit,
    );

    if (!exists) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (projectId, unit) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.projectId === projectId && item.inventory.unit === unit),
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
